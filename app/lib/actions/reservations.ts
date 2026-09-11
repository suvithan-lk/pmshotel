"use server";

import { revalidatePath } from "next/cache";
import type { Prisma, ReservationStatus } from "@prisma/client";
import { prisma } from "../prisma";
import { colorOf, formatShortDate, initialsOf, nightsBetween } from "../format";
import type { ConflictInfo, Reservation } from "../types";
import { writeAudit } from "./audit";

const reservationInclude = {
  guest: true,
  room: { include: { roomType: true } },
  payments: true,
} satisfies Prisma.ReservationInclude;

type DbReservation = Prisma.ReservationGetPayload<{ include: typeof reservationInclude }>;

const STATUS_TO_UI: Record<ReservationStatus, Reservation["status"]> = {
  CONFIRMED: "confirmed",
  PENDING: "pending",
  CHECKED_IN: "checkedin",
  CHECKED_OUT: "checkedout",
  CANCELLED: "cancelled",
  NO_SHOW: "noshow",
};

const ACTIVE_STATUSES: ReservationStatus[] = ["CONFIRMED", "PENDING", "CHECKED_IN"];

function paymentStatus(r: DbReservation): "paid" | "pending" | "refunded" {
  if (r.payments.some((p) => p.status === "REFUNDED")) return "refunded";
  if (r.payments.some((p) => p.status === "PAID")) return "paid";
  return "pending";
}

function toUi(r: DbReservation): Reservation {
  const nights = nightsBetween(r.arrival, r.departure);
  return {
    id: r.bookingCode,
    guest: r.guest.name,
    initials: initialsOf(r.guest.name),
    color: colorOf(r.guest.name),
    room: r.room.number,
    roomType: r.room.roomType.name,
    arrival: formatShortDate(r.arrival),
    departure: formatShortDate(r.departure),
    arrivalISO: r.arrival.toISOString().slice(0, 10),
    departureISO: r.departure.toISOString().slice(0, 10),
    nights,
    guests: r.guestsCount,
    source: r.source,
    rate: r.rate,
    total: Math.round(r.rate * nights * 1.15),
    payment: paymentStatus(r),
    status: STATUS_TO_UI[r.status],
    vip: r.vip,
    phone: r.guest.phone,
    request: r.request || "—",
    country: r.guest.country,
  };
}

export async function getReservations(): Promise<Reservation[]> {
  const rows = await prisma.reservation.findMany({ include: reservationInclude, orderBy: { arrival: "asc" } });
  return rows.map(toUi);
}

async function nextBookingCode(): Promise<string> {
  const suffix = String(10000 + Math.floor(Math.random() * 89999));
  return `BK-2026-${suffix}`;
}

export interface CreateReservationInput {
  guestName: string;
  phone: string;
  country?: string;
  arrival: string; // "YYYY-MM-DD"
  departure: string; // "YYYY-MM-DD"
  source: string;
  request?: string;
  /** Book a specific room (used by the conflict demo — bypasses auto-assign). */
  roomNumber?: string;
  /** Auto-assign the first free room of this type (used by the "New Reservation" form). */
  roomTypeName?: string;
}

export type CreateReservationResult =
  | { ok: true; reservation: Reservation }
  | { ok: false; conflict: ConflictInfo };

export async function createReservation(input: CreateReservationInput): Promise<CreateReservationResult> {
  const arrival = new Date(`${input.arrival}T12:00:00.000Z`);
  const departure = new Date(`${input.departure}T12:00:00.000Z`);

  const candidateRooms = input.roomNumber
    ? await prisma.room.findMany({ where: { number: input.roomNumber }, include: { roomType: true } })
    : await prisma.room.findMany({ where: { roomType: { name: input.roomTypeName } }, include: { roomType: true } });

  if (candidateRooms.length === 0) throw new Error("No matching room found.");

  let chosenRoom: (typeof candidateRooms)[number] | null = null;
  let blocking: { room: (typeof candidateRooms)[number]; overlap: Prisma.ReservationGetPayload<{ include: { guest: true } }> } | null = null;

  for (const room of candidateRooms) {
    const overlap = await prisma.reservation.findFirst({
      where: {
        roomId: room.id,
        status: { in: ACTIVE_STATUSES },
        arrival: { lt: departure },
        departure: { gt: arrival },
      },
      include: { guest: true },
    });
    if (!overlap) {
      chosenRoom = room;
      break;
    }
    if (!blocking) blocking = { room, overlap };
  }

  if (!chosenRoom) {
    const { room, overlap } = blocking!;
    return {
      ok: false,
      conflict: {
        roomNumber: room.number,
        roomType: room.roomType.name,
        existingGuest: overlap.guest.name,
        existingBookingCode: overlap.bookingCode,
        existingRange: `${formatShortDate(overlap.arrival)} – ${formatShortDate(overlap.departure)}`,
        attemptedGuest: input.guestName,
        attemptedRange: `${formatShortDate(arrival)} – ${formatShortDate(departure)}`,
      },
    };
  }

  let guest = await prisma.guest.findFirst({ where: { name: input.guestName } });
  if (!guest) {
    guest = await prisma.guest.create({
      data: {
        name: input.guestName,
        phone: input.phone,
        country: input.country || "🌐",
        email: `${input.guestName.toLowerCase().replace(/\s/g, ".")}.${Date.now()}@example.com`,
      },
    });
  }

  const created = await prisma.reservation.create({
    data: {
      bookingCode: await nextBookingCode(),
      guestId: guest.id,
      roomId: chosenRoom.id,
      arrival,
      departure,
      guestsCount: 1,
      source: input.source,
      rate: chosenRoom.rate,
      status: "CONFIRMED",
      request: input.request || null,
    },
    include: reservationInclude,
  });

  await writeAudit({
    action: "Reservation Created",
    module: "Reservations",
    entity: created.bookingCode,
    oldValue: "—",
    newValue: `Confirmed · Room ${chosenRoom.number}`,
  });

  revalidatePath("/");
  return { ok: true, reservation: toUi(created) };
}

async function transitionReservation(bookingCode: string, status: ReservationStatus, action: string, oldValue: string, newValue: string) {
  const r = await prisma.reservation.update({ where: { bookingCode }, data: { status }, include: reservationInclude });
  await writeAudit({ action, module: "Front Office", entity: r.guest.name, oldValue, newValue });
  revalidatePath("/");
  return toUi(r);
}

export async function checkIn(bookingCode: string): Promise<Reservation> {
  const r = await transitionReservation(bookingCode, "CHECKED_IN", "Check-in", "Confirmed", "Checked-in");
  await prisma.room.update({ where: { number: r.room }, data: { status: "OCCUPIED" } });
  revalidatePath("/");
  return r;
}

export async function checkOut(bookingCode: string): Promise<Reservation> {
  const r = await transitionReservation(bookingCode, "CHECKED_OUT", "Check-out", "Checked-in", "Checked-out");
  await prisma.room.update({ where: { number: r.room }, data: { status: "DIRTY" } });
  revalidatePath("/");
  return r;
}

export async function cancelReservation(bookingCode: string): Promise<Reservation> {
  return transitionReservation(bookingCode, "CANCELLED", "Booking Cancelled", "Active", "Cancelled");
}

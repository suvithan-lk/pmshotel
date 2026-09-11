"use server";

import { revalidatePath } from "next/cache";
import type { RoomStatus as DbRoomStatus } from "@prisma/client";
import { prisma } from "../prisma";
import { formatShortDate } from "../format";
import type { Room } from "../types";
import { writeAudit } from "./audit";

const ROOM_STATUS_TO_UI: Record<DbRoomStatus, Room["status"]> = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  DIRTY: "dirty",
  CLEANING: "cleaning",
  MAINTENANCE: "maintenance",
};

const ROOM_STATUS_TO_DB: Record<Room["status"], DbRoomStatus> = {
  available: "AVAILABLE",
  occupied: "OCCUPIED",
  dirty: "DIRTY",
  cleaning: "CLEANING",
  maintenance: "MAINTENANCE",
};

export async function getRooms(): Promise<Room[]> {
  const rows = await prisma.room.findMany({
    include: {
      roomType: true,
      reservations: { where: { status: "CHECKED_IN" }, include: { guest: true }, take: 1 },
    },
    orderBy: { number: "asc" },
  });

  return rows.map((r) => {
    const occupant = r.reservations[0];
    return {
      no: r.number,
      type: r.roomType.name,
      floor: r.floor,
      bed: r.roomType.bed,
      occ: r.roomType.maxOccupancy,
      rate: r.rate,
      status: ROOM_STATUS_TO_UI[r.status],
      guest: occupant?.guest.name,
      hk: r.housekeeping ?? undefined,
      out: occupant ? formatShortDate(occupant.departure) : undefined,
      vip: occupant?.vip,
      issue: r.issue ?? undefined,
    };
  });
}

export async function updateRoomStatus(number: string, status: Room["status"]): Promise<void> {
  const before = await prisma.room.findUnique({ where: { number } });
  await prisma.room.update({ where: { number }, data: { status: ROOM_STATUS_TO_DB[status] } });
  await writeAudit({
    action: "Room Status Updated",
    module: "Housekeeping",
    entity: `Room ${number}`,
    oldValue: before ? ROOM_STATUS_TO_UI[before.status] : undefined,
    newValue: status,
  });
  revalidatePath("/");
}

"use server";

import { prisma } from "../prisma";
import { colorOf, formatShortDate, initialsOf, nightsBetween } from "../format";
import type { Guest } from "../types";

export async function getGuests(): Promise<Guest[]> {
  const guests = await prisma.guest.findMany({
    include: {
      reservations: {
        include: { room: { include: { roomType: true } } },
        orderBy: { arrival: "desc" },
      },
    },
  });

  return guests.map((g) => {
    const stays = g.reservations.length;
    const ltv = g.reservations.reduce((sum, r) => sum + Math.round(r.rate * nightsBetween(r.arrival, r.departure) * 1.15), 0);
    const latest = g.reservations[0];
    const status: Guest["status"] = g.vip
      ? "vip"
      : g.reservations.some((r) => r.source === "Corporate")
        ? "corporate"
        : stays > 1
          ? "returning"
          : "new";

    return {
      name: g.name,
      initials: initialsOf(g.name),
      color: colorOf(g.name),
      country: g.country,
      stays,
      ltv,
      last: latest ? `${formatShortDate(latest.arrival)} 2026` : "—",
      room: latest?.room.roomType.name || "—",
      status,
    };
  });
}

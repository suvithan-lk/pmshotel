import type { CalendarRoomEntry, Reservation, Room } from "./types";

/** ISO dates matching the 7-day window shown in DAY_HEADS ("26 WED" … "01 TUE"). */
export const CALENDAR_WINDOW_ISO = [
  "2026-08-26",
  "2026-08-27",
  "2026-08-28",
  "2026-08-29",
  "2026-08-30",
  "2026-08-31",
  "2026-09-01",
];

const WINDOW_START = CALENDAR_WINDOW_ISO[0];
const WINDOW_END_EXCLUSIVE = "2026-09-02";

/**
 * Real double-booking prevention means overlapping reservations for the same
 * room never actually persist — so unlike the old hardcoded demo, this never
 * needs to render a permanent "conflict" row. Conflicts only ever surface
 * transiently via ConflictModal when a create attempt is rejected.
 */
export function buildCalendarRows(rooms: Room[], reservations: Reservation[]): CalendarRoomEntry[] {
  return rooms.map((room) => {
    if (room.status === "maintenance") {
      return { room: room.no, maintenance: true, note: room.issue || "Maintenance" };
    }
    if (room.status === "dirty") {
      return { room: room.no, dirty: true };
    }
    if (room.status === "cleaning") {
      return { room: room.no, cleaning: true };
    }

    const roomReservations = reservations.filter(
      (r) =>
        r.room === room.no &&
        r.status !== "cancelled" &&
        r.status !== "noshow" &&
        r.arrivalISO < WINDOW_END_EXCLUSIVE &&
        r.departureISO > WINDOW_START
    );

    const bookings = roomReservations.map((r) => {
      let startIdx = CALENDAR_WINDOW_ISO.indexOf(r.arrivalISO);
      let endIdx = CALENDAR_WINDOW_ISO.indexOf(r.departureISO);
      if (startIdx === -1) startIdx = 0;
      if (endIdx === -1) endIdx = CALENDAR_WINDOW_ISO.length;
      return {
        id: r.id,
        guest: r.guest,
        source: r.source,
        start: startIdx + 1,
        end: endIdx + 1,
        status: r.vip ? "vip" : r.status,
      };
    });

    return { room: room.no, bookings };
  });
}

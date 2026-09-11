"use client";

import { DAY_HEADS } from "../lib/data";
import { bookingClass } from "../lib/format";
import type { CalendarRoomEntry, Room } from "../lib/types";
import { useApp } from "../lib/AppContext";

export default function CalendarGrid({ rows, rooms }: { rows: CalendarRoomEntry[]; rooms: Room[] }) {
  const { openBookingDrawer } = useApp();
  const typeByRoom = new Map(rooms.map((r) => [r.no, r.type]));

  return (
    <div className="calendar">
      <div className="calendar-head">
        <div className="room-col">ROOM</div>
        {DAY_HEADS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      {rows.map((entry) => (
        <div className="calendar-row" key={entry.room}>
          <div className="room-cell">
            <b>{entry.room}</b>
            <span>{typeByRoom.get(entry.room) || "—"}</span>
          </div>
          {entry.maintenance && (
            <div className="maintenance" style={{ gridColumn: "2 / 9" }}>
              Maintenance
              <small>{entry.note}</small>
            </div>
          )}
          {entry.dirty && (
            <div className="available-cell" style={{ gridColumn: "2 / 9", color: "#d14343" }}>
              Dirty — awaiting housekeeping
            </div>
          )}
          {entry.cleaning && (
            <div className="available-cell" style={{ gridColumn: "2 / 9", color: "#c58100" }}>
              Cleaning in progress
            </div>
          )}
          {!entry.maintenance && !entry.dirty && !entry.cleaning && (entry.bookings?.length ?? 0) === 0 && (
            <div className="available-cell" style={{ gridColumn: "2 / 9" }}>
              Available
            </div>
          )}
          {entry.bookings?.map((b) => {
            const s = Math.max(1, b.start);
            const e = Math.min(8, b.end);
            return (
              <div
                key={b.id}
                className={`booking ${bookingClass(b)}`}
                style={{ gridColumn: `${s + 1} / ${e + 1}` }}
                onClick={() => openBookingDrawer(b.id)}
              >
                {b.guest} <small>{b.id} · {b.source}</small>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

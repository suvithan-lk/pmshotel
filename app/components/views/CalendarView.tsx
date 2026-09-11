"use client";

import { useApp } from "../../lib/AppContext";
import { useData } from "../../lib/DataContext";
import { buildCalendarRows } from "../../lib/calendarRows";
import CalendarGrid from "../CalendarGrid";

export default function CalendarView({ active }: { active: boolean }) {
  const { openConflict, openNewBooking, toast } = useApp();
  const { rooms, reservations, triggerConflictDemo } = useData();

  async function simulateConflict() {
    const info = await triggerConflictDemo();
    if (info) openConflict(info);
    else toast("No conflict found — Room 205's demo booking may already be cancelled.");
  }

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">OPERATIONS</div>
          <h1>Reservation Calendar</h1>
          <p>Click a booking to open it. Room 205 rejects overlapping stays — try the conflict demo.</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={simulateConflict}>⚠ Simulate Conflict</button>
          <button className="btn btn-primary" onClick={openNewBooking}>＋ New Reservation</button>
        </div>
      </div>
      <article className="panel calendar-panel full-calendar">
        <div className="panel-head">
          <div><h2>26 August — 01 September 2026</h2><p>{rooms.length} rooms shown · scroll for more</p></div>
          <div className="calendar-actions"><button className="icon-btn">‹</button><button className="icon-btn">›</button><button className="btn btn-secondary">Today</button></div>
        </div>
        <div className="calendar-legend">
          <span><i className="dot blue"></i> Confirmed</span>
          <span><i className="dot amber"></i> Pending</span>
          <span><i className="dot green"></i> Checked-in</span>
          <span><i className="dot gray"></i> Checked-out</span>
          <span><i className="dot red"></i> Cancelled / No-show</span>
          <span><i className="dot purple"></i> VIP</span>
        </div>
        <CalendarGrid rows={buildCalendarRows(rooms, reservations)} rooms={rooms} />
      </article>
    </div>
  );
}

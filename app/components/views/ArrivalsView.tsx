"use client";

import { useApp } from "../../lib/AppContext";
import { useData } from "../../lib/DataContext";
import { STATUS_META } from "../../lib/format";

export default function ArrivalsView({ active }: { active: boolean }) {
  const { openBookingDrawer, toast } = useApp();
  const { reservations, checkIn } = useData();
  const arrivals = reservations.filter((r) => r.arrival === "26 Aug");

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">OPERATIONS</div>
          <h1>Today&apos;s Arrivals</h1>
          <p>26 August 2026 · {arrivals.length} arriving today</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Arrivals exported to Excel.")}>⇩ Export</button>
          <button className="btn btn-primary" onClick={() => toast("Walk-in guest workflow opened.")}>＋ Walk-in Guest</button>
        </div>
      </div>
      <article className="panel table-panel full-table">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Guest</th><th>Booking ID</th><th>Room</th><th>Room Type</th><th>Arrival Time</th><th>Departure</th><th>Guests</th><th>Source</th><th>Payment</th><th>Special Request</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {arrivals.map((r) => {
                const meta = STATUS_META[r.status];
                const flags: string[] = [];
                if (r.vip) flags.push("VIP");
                if (r.payment === "pending") flags.push("Payment Due");
                return (
                  <tr key={r.id}>
                    <td>
                      <div className="guest" onClick={() => openBookingDrawer(r.id)}>
                        <div className={`avatar avatar-${r.color}`}>{r.initials}</div>
                        <div>
                          <strong>{r.guest}</strong>
                          <small>
                            {flags.map((f) => (
                              <span key={f} className={`pill ${f === "VIP" ? "vip" : "pending"}`} style={{ marginRight: 4 }}>{f}</span>
                            ))}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>{r.id}</td>
                    <td>{r.room}</td>
                    <td>{r.roomType}</td>
                    <td>2:00 PM</td>
                    <td>{r.departure}</td>
                    <td>{r.guests}</td>
                    <td><span className="source">{r.source}</span></td>
                    <td><span className={`pill ${r.payment === "paid" ? "paid" : "pending"}`}>{r.payment}</span></td>
                    <td style={{ maxWidth: 160 }}>{r.request}</td>
                    <td><span className={`pill ${meta.pill}`}>{r.vip ? "VIP" : meta.label}</span></td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        style={{ height: 28, fontSize: "8.5px" }}
                        onClick={async () => {
                          await checkIn(r.id);
                          toast(`${r.guest} checked in — room ${r.room} marked occupied.`);
                        }}
                      >
                        Check-in
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}

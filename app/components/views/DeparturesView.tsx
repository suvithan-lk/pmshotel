"use client";

import { useMemo } from "react";
import { useApp } from "../../lib/AppContext";
import { useData } from "../../lib/DataContext";
import { fmtLKR } from "../../lib/format";

export default function DeparturesView({ active }: { active: boolean }) {
  const { openBookingDrawer, toast } = useApp();
  const { reservations, checkOut } = useData();

  const departing = useMemo(() => {
    const seen = new Set<string>();
    return reservations.filter(
      (r) => r.departure === "26 Aug" || (["27 Aug", "28 Aug"].includes(r.departure) && r.status === "checkedin")
    ).filter((r) => (seen.has(r.id) ? false : (seen.add(r.id), true)));
  }, [reservations]);

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">OPERATIONS</div>
          <h1>Today&apos;s Departures</h1>
          <p>26 August 2026 · {departing.length} guests scheduled to leave</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Departures exported to Excel.")}>⇩ Export</button>
        </div>
      </div>
      <article className="panel table-panel full-table">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Guest</th><th>Room</th><th>Checkout Time</th><th>Outstanding Balance</th><th>Payment</th><th>Housekeeping</th><th>Late Checkout</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {departing.map((r) => {
                const balance = r.payment === "pending" ? Math.round(r.rate * 0.3) : 0;
                const notInspected = r.room === "206" || r.room === "305" || r.room === "107";
                const lateCheckout = r.request.toLowerCase().includes("late checkout");
                return (
                  <tr key={r.id}>
                    <td>
                      <div className="guest" onClick={() => openBookingDrawer(r.id)}>
                        <div className={`avatar avatar-${r.color}`}>{r.initials}</div>
                        <div><strong>{r.guest}</strong><small>Room {r.room}</small></div>
                      </div>
                    </td>
                    <td>{r.room}</td>
                    <td>{lateCheckout ? "1:00 PM" : "11:00 AM"}</td>
                    <td style={{ color: balance ? "#d14343" : "#58667a" }}>{fmtLKR(balance)}</td>
                    <td><span className={`pill ${balance ? "pending" : "paid"}`}>{balance ? "Pending" : "Cleared"}</span></td>
                    <td><span className={`pill ${notInspected ? "pending" : "confirmed"}`}>{notInspected ? "Not Inspected" : "Ready"}</span></td>
                    <td>{lateCheckout ? "1:00 PM" : "—"}</td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        style={{ height: 28, fontSize: "8.5px" }}
                        onClick={async () => {
                          await checkOut(r.id);
                          toast(`${r.guest} checked out — room ${r.room} marked dirty.`);
                        }}
                      >
                        Check-out
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

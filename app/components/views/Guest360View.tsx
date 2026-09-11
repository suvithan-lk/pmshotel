"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppContext";
import { useData } from "../../lib/DataContext";
import { fmtLKR } from "../../lib/format";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "reservations", label: "Reservations" },
  { key: "history", label: "Stay History" },
  { key: "payments", label: "Payments" },
  { key: "preferences", label: "Preferences" },
  { key: "notes", label: "Notes" },
];

export default function Guest360View({ active }: { active: boolean }) {
  const { view, navParams, selectedGuest, openNewBooking, toast } = useApp();
  const { guests } = useData();
  const [tab, setTab] = useState("overview");

  const [prevNavParams, setPrevNavParams] = useState(navParams);
  if (view === "guest360" && navParams !== prevNavParams) {
    setPrevNavParams(navParams);
    if (navParams.tab) setTab(navParams.tab);
  }

  const guest = guests.find((g) => g.name === selectedGuest) || guests[0];

  if (!guest) {
    return (
      <div className={`content view${active ? " active" : ""}`}>
        <div className="search-empty">No guests found yet.</div>
      </div>
    );
  }

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">GUESTS</div>
          <h1>Guest 360</h1>
          <p>Complete relationship profile</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast(`Message sent to ${guest.name}.`)}>Send Message</button>
          <button className="btn btn-primary" onClick={openNewBooking}>＋ New Reservation</button>
        </div>
      </div>
      <article className="panel guest-header">
        <div className={`avatar avatar-${guest.color} g360-avatar`}>{guest.initials}</div>
        <div className="g360-id">
          <h2>
            {guest.name}{" "}
            {guest.status === "vip" && <span className="pill vip">VIP</span>}
            {guest.status === "returning" && <span className="pill confirmed">Returning</span>}
          </h2>
          <span>{guest.country} · {guest.name.toLowerCase().replace(/\s/g, ".")}@gmail.com</span>
        </div>
        <div className="g360-stats">
          <div><strong>{fmtLKR(guest.ltv)}</strong><span>Lifetime value</span></div>
          <div><strong>{guest.stays}</strong><span>Total stays</span></div>
          <div><strong>{guest.last}</strong><span>Last visit</span></div>
        </div>
      </article>

      <div className="tabs">
        {TABS.map((t) => (
          <button key={t.key} className={tab === t.key ? "active" : ""} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="g360-panel active">
          <div className="section-grid two-col">
            <article className="panel">
              <div className="panel-head"><div><h2>Current Reservation</h2></div></div>
              <div className="detail-grid" style={{ padding: "0 17px 17px" }}>
                <div><span>Room</span><strong>103 · Suite</strong></div>
                <div><span>Check-in</span><strong>26 Aug · 2:00 PM</strong></div>
                <div><span>Check-out</span><strong>28 Aug · 11:00 AM</strong></div>
                <div><span>Booking ID</span><strong>BK-2026-00430</strong></div>
              </div>
            </article>
            <article className="panel">
              <div className="panel-head"><div><h2>Preferences Snapshot</h2></div></div>
              <div className="insight-row"><span>Room preference</span><b>High floor, sea view</b></div>
              <div className="insight-row"><span>Bed preference</span><b>King bed</b></div>
              <div className="insight-row"><span>Floor preference</span><b>3rd floor +</b></div>
              <div className="insight-row"><span>Communication</span><b>WhatsApp</b></div>
            </article>
          </div>
        </div>
      )}

      {tab === "reservations" && (
        <div className="g360-panel active">
          <article className="panel table-panel full-table">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Booking ID</th><th>Room</th><th>Dates</th><th>Source</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td>BK-2026-00430</td><td>103 · Suite</td><td>26–28 Aug 2026</td><td>Agoda</td><td>LKR 84,000</td><td><span className="pill vip">VIP</span></td></tr>
                  <tr><td>BK-2026-00218</td><td>205 · Suite</td><td>12–14 Jun 2026</td><td>Direct</td><td>LKR 79,500</td><td><span className="pill confirmed">Checked-out</span></td></tr>
                  <tr><td>BK-2025-00982</td><td>301 · Premium Suite</td><td>24–27 Dec 2025</td><td>Booking.com</td><td>LKR 172,000</td><td><span className="pill confirmed">Checked-out</span></td></tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}

      {tab === "history" && (
        <div className="g360-panel active">
          <article className="panel">
            <div className="panel-head"><div><h2>Stay Timeline</h2></div></div>
            <div className="timeline g360-timeline">
              <div><i></i><p><strong>2026 · Stayed 2 nights</strong><small>Room 103 · Suite · LKR 84,000</small></p></div>
              <div><i></i><p><strong>2026 · Stayed 2 nights</strong><small>Room 205 · Suite · LKR 79,500</small></p></div>
              <div><i></i><p><strong>2025 · Stayed 3 nights</strong><small>Room 301 · Premium Suite · LKR 172,000</small></p></div>
              <div><i></i><p><strong>2024 · Stayed 4 nights</strong><small>Room 205 · Suite · LKR 148,000</small></p></div>
            </div>
          </article>
        </div>
      )}

      {tab === "payments" && (
        <div className="g360-panel active">
          <article className="panel table-panel full-table">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Date</th><th>Booking</th><th>Method</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td>25 Aug 2026</td><td>BK-2026-00430</td><td>Visa •••• 4471</td><td>LKR 84,000</td><td><span className="pill paid">Paid</span></td></tr>
                  <tr><td>11 Jun 2026</td><td>BK-2026-00218</td><td>PayHere</td><td>LKR 79,500</td><td><span className="pill paid">Paid</span></td></tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}

      {tab === "preferences" && (
        <div className="g360-panel active">
          <article className="panel">
            <div className="panel-head"><div><h2>Guest Preferences</h2></div></div>
            <div className="detail-grid" style={{ padding: "0 17px 17px" }}>
              <div><span>Room preference</span><strong>High floor, sea view</strong></div>
              <div><span>Bed preference</span><strong>King bed</strong></div>
              <div><span>Floor preference</span><strong>3rd floor and above</strong></div>
              <div><span>Food preference</span><strong>Vegetarian, no shellfish</strong></div>
              <div><span>Special occasions</span><strong>Wedding anniversary — 14 Feb</strong></div>
              <div><span>Communication</span><strong>WhatsApp preferred</strong></div>
            </div>
          </article>
        </div>
      )}

      {tab === "notes" && (
        <div className="g360-panel active">
          <article className="panel">
            <div className="panel-head"><div><h2>Internal Notes</h2></div></div>
            <div className="request-box" style={{ margin: "0 17px 17px" }}>
              Prefers quiet rooms away from the elevator. Regularly requests late check-out — approve up to 2:00 PM without surcharge given VIP tier.
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

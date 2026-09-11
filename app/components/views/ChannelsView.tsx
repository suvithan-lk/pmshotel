"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppContext";
import { CHANNELS, SYNC_LOGS } from "../../lib/data";

export default function ChannelsView({ active }: { active: boolean }) {
  const { toast } = useApp();
  const [syncing, setSyncing] = useState<Set<string>>(new Set());
  const [allSyncing, setAllSyncing] = useState(false);

  function syncChannel(key: string) {
    setSyncing((s) => new Set(s).add(key));
    setTimeout(() => {
      setSyncing((s) => {
        const next = new Set(s);
        next.delete(key);
        return next;
      });
      toast("Channel synchronized successfully.");
    }, 1200);
  }
  function syncAll() {
    setAllSyncing(true);
    setTimeout(() => {
      setAllSyncing(false);
      toast("All 4 channels synchronized successfully.");
    }, 1500);
  }

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">CHANNELS</div>
          <h1>Channel Manager</h1>
          <p>Distribution &amp; inventory synchronization across all connected channels</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-primary" disabled={allSyncing} onClick={syncAll}>
            {allSyncing ? "⇄ Syncing All Channels…" : "⇄ Sync All Channels"}
          </button>
        </div>
      </div>
      <div className="channel-grid">
        {CHANNELS.map((c) => (
          <article className="channel-card-full" key={c.key}>
            <div className="ccf-head">
              <div className={`channel-logo ${c.cls}`}>{c.logo}</div>
              <div><strong>{c.name}</strong><span className={`ccf-state ${c.status === "warning" ? "warn" : ""}`}><i></i>{c.status === "warning" ? "Warning" : "Connected"}</span></div>
            </div>
            <div className="ccf-row"><span>Last sync</span><b>{c.lastSync}</b></div>
            <div className="ccf-row"><span>Inventory</span><b>{c.inventory} rooms</b></div>
            <div className="ccf-row"><span>Bookings today</span><b>{c.bookings}</b></div>
            <div className="ccf-row"><span>Rate sync</span><b style={{ color: c.rateSync === "Healthy" ? "#16a05d" : "#b57600" }}>{c.rateSync}</b></div>
            <div className="ccf-row"><span>Inventory sync</span><b style={{ color: c.invSync === "Healthy" ? "#16a05d" : "#b57600" }}>{c.invSync}</b></div>
            {c.status === "warning" && (
              <div className="ccf-error">⚠ Inventory sync failed — last successful sync 2 hours ago. Reason: rate plan mismatch on Suite category.</div>
            )}
            <button className={`btn ${c.status === "warning" ? "btn-primary" : "btn-secondary"}`} disabled={syncing.has(c.key)} onClick={() => syncChannel(c.key)}>
              {syncing.has(c.key) ? "Syncing…" : c.status === "warning" ? "Retry Sync" : "Sync Now"}
            </button>
          </article>
        ))}
      </div>
      <div className="section-grid two-col">
        <article className="panel">
          <div className="panel-head"><div><h2>Sync Logs</h2><p>Latest synchronization events</p></div></div>
          <div className="activity-list">
            {SYNC_LOGS.map((s, i) => (
              <div key={i}>
                <div className={`activity-dot ${s.color}`}></div>
                <p>{s.text}<small>{s.time}</small></p>
              </div>
            ))}
          </div>
        </article>
        <article className="panel">
          <div className="panel-head"><div><h2>Rate Sync Status</h2><p>Rate parity across channels</p></div></div>
          <div className="pricing-table">
            <div className="pricing-row header"><span>Room Type</span><span>PMS Rate</span><span>Booking.com</span><span>Agoda</span><span>Expedia</span></div>
            <div className="pricing-row"><strong>Deluxe King</strong><span>LKR 25K</span><span>LKR 25K</span><span>LKR 25K</span><span>LKR 25K</span></div>
            <div className="pricing-row"><strong>Suite</strong><span>LKR 42K</span><span>LKR 42K</span><span>LKR 42K</span><span className="suggested" style={{ color: "#d14343" }}>LKR 39K ⚠</span></div>
            <div className="pricing-row"><strong>Premium Suite</strong><span>LKR 58K</span><span>LKR 58K</span><span>LKR 58K</span><span>LKR 58K</span></div>
          </div>
        </article>
      </div>
    </div>
  );
}

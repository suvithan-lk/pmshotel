"use client";

import { useApp } from "../../lib/AppContext";
import { PROMOTIONS } from "../../lib/data";
import { fmtLKR } from "../../lib/format";

export default function PromotionsView({ active }: { active: boolean }) {
  const { toast } = useApp();

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">REVENUE</div>
          <h1>Promotions</h1>
          <p>Manage discount campaigns across channels</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-primary" onClick={() => toast("New promotion form opened.")}>＋ New Promotion</button>
        </div>
      </div>
      <div className="promo-grid">
        {PROMOTIONS.map((p) => (
          <article className={`promo-card status-${p.status}`} key={p.name}>
            <div className="pc-head">
              <h3>{p.name}</h3>
              <span className="pc-tag">{p.tag}</span>
            </div>
            <div className="pc-validity">Valid: {p.validity} · {p.rooms}</div>
            <div className="pc-stats">
              <div><span>Bookings</span><strong>{p.bookings}</strong></div>
              <div><span>Revenue Generated</span><strong>{fmtLKR(p.revenue)}</strong></div>
            </div>
            <div className="pc-actions">
              <button onClick={() => toast(`Promotion "Edit" action applied.`)}>Edit</button>
              <button onClick={() => toast(`Promotion "${p.status === "paused" ? "Resume" : "Pause"}" action applied.`)}>{p.status === "paused" ? "Resume" : "Pause"}</button>
              <button onClick={() => toast(`Promotion "Duplicate" action applied.`)}>Duplicate</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

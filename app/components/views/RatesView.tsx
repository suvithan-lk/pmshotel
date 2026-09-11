"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppContext";
import { DAY_HEADS, DYNAMIC_PRICING } from "../../lib/data";
import { fmtLKR } from "../../lib/format";

const TABS = [
  { key: "base", label: "Base Rate" },
  { key: "weekend", label: "Weekend Rate" },
  { key: "seasonal", label: "Seasonal Rate" },
  { key: "promo", label: "Promotional Rate" },
];

export default function RatesView({ active }: { active: boolean }) {
  const { toast } = useApp();
  const [tab, setTab] = useState("base");

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">REVENUE</div>
          <h1>Rate Management</h1>
          <p>Rate calendar by room type — base, weekend, seasonal &amp; promotional rates</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Bulk rate update workflow opened.")}>Bulk Update</button>
          <button className="btn btn-primary" onClick={() => toast("New rate plan form opened.")}>＋ New Rate Plan</button>
        </div>
      </div>
      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={tab === t.key ? "active" : ""}
            onClick={() => {
              setTab(t.key);
              toast(`Showing ${t.label.toLowerCase()} calendar.`);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <article className="panel full-calendar">
        <div className="calendar rate-calendar">
          <div className="calendar-head">
            <div className="room-col">ROOM</div>
            {DAY_HEADS.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          {DYNAMIC_PRICING.map((rt) => (
            <div className="calendar-row" key={rt.type}>
              <div className="room-cell"><b>{rt.type}</b><span>{rt.occ}% occ.</span></div>
              {DAY_HEADS.map((d, i) => {
                const isWeekend = i === 3 || i === 4;
                const rate = isWeekend ? rt.weekend : rt.base;
                return (
                  <div key={d} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#34445c" }}>
                    {fmtLKR(rate)}
                    {isWeekend && <small style={{ color: "#b57600" }}>Weekend</small>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

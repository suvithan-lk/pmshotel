"use client";

import { useMemo, useState } from "react";
import { useApp } from "../../lib/AppContext";
import { useData } from "../../lib/DataContext";
import { fmtLKR } from "../../lib/format";
import type { Room } from "../../lib/types";

const FILTER_KEYS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Available" },
  { key: "occupied", label: "Occupied" },
  { key: "dirty", label: "Dirty" },
  { key: "cleaning", label: "Cleaning" },
  { key: "maintenance", label: "Maintenance" },
];

export default function RoomsView({ active }: { active: boolean }) {
  const { view, navParams, openRoomDrawer, toast } = useApp();
  const { rooms } = useData();
  const [filter, setFilter] = useState("all");

  const [prevNavParams, setPrevNavParams] = useState(navParams);
  if (view === "rooms" && navParams !== prevNavParams) {
    setPrevNavParams(navParams);
    if (navParams.filter) setFilter(navParams.filter === "ooo" ? "maintenance" : navParams.filter);
  }

  const list = useMemo(
    () => (filter === "all" ? rooms : rooms.filter((r) => r.status === filter)),
    [rooms, filter]
  );

  function countFor(key: string) {
    return key === "all" ? rooms.length : rooms.filter((r) => r.status === (key as Room["status"])).length;
  }

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">ROOMS</div>
          <h1>Room Inventory</h1>
          <p>{rooms.length} rooms across 3 floors · real-time housekeeping &amp; maintenance status</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Room Types: Standard, Deluxe King, Deluxe Twin, Suite, Premium Suite, Executive Suite.")}>Room Types</button>
          <button className="btn btn-primary" onClick={() => toast("Room block workflow opened.")}>＋ Block Room</button>
        </div>
      </div>
      <div className="room-filter-bar">
        <div className="segmented room-filter-seg">
          {FILTER_KEYS.map((f) => (
            <button key={f.key} className={filter === f.key ? "active" : ""} onClick={() => setFilter(f.key)}>
              {f.label} {countFor(f.key)}
            </button>
          ))}
        </div>
      </div>
      <div className="room-grid-full">
        {list.length === 0 && <div className="search-empty">No rooms match this filter.</div>}
        {list.map((r) => (
          <div key={r.no} className={`room-card-full st-${r.status}`} onClick={() => openRoomDrawer(r.no)}>
            <div className="rcf-top">
              <div><b>{r.no}</b><span>{r.type} · Floor {r.floor}</span></div>
              <span className={`rcf-status ${r.status}`}>{r.status}</span>
            </div>
            <div className="rcf-guest">{r.guest ? `${r.vip ? "✦ " : ""}${r.guest}` : r.issue || r.hk || "Unoccupied"}</div>
            <div className="rcf-meta"><span>{fmtLKR(r.rate)}/night</span><span>{r.occ} guests max</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

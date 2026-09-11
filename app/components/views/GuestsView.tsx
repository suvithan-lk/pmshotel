"use client";

import { useMemo, useState } from "react";
import { useApp } from "../../lib/AppContext";
import { useData } from "../../lib/DataContext";
import { fmtLKR } from "../../lib/format";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "vip", label: "VIP" },
  { key: "returning", label: "Returning" },
  { key: "corporate", label: "Corporate" },
];

const STATUS_PILL: Record<string, string> = {
  vip: "vip",
  returning: "confirmed",
  corporate: "pending",
  new: "checkedout",
};

export default function GuestsView({ active }: { active: boolean }) {
  const { view, navParams, openGuest360, toast } = useApp();
  const { guests } = useData();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [prevNavParams, setPrevNavParams] = useState(navParams);
  if (view === "guests" && navParams !== prevNavParams) {
    setPrevNavParams(navParams);
    if (navParams.filter) setFilter(navParams.filter);
  }

  const list = useMemo(() => {
    let l = guests;
    if (filter !== "all") l = l.filter((g) => g.status === filter);
    if (search.trim()) l = l.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));
    return l;
  }, [guests, filter, search]);

  const vipCount = guests.filter((g) => g.status === "vip").length;

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">GUESTS</div>
          <h1>Guests</h1>
          <p>{guests.length} guests on file · {vipCount} VIP</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Guest list exported.")}>⇩ Export</button>
          <button className="btn btn-primary" onClick={() => toast("Add guest form opened.")}>＋ Add Guest</button>
        </div>
      </div>
      <div className="table-toolbar">
        <div className="tt-search">
          <span>⌕</span>
          <input placeholder="Search guest name, phone, email…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="segmented">
          {FILTERS.map((f) => (
            <button key={f.key} className={filter === f.key ? "active" : ""} onClick={() => setFilter(f.key)}>{f.label}</button>
          ))}
        </div>
      </div>
      <article className="panel table-panel full-table">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Guest</th><th>Country</th><th>Total Stays</th><th>Lifetime Value</th><th>Last Visit</th><th>Preferred Room</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {list.length === 0 && <tr><td colSpan={8} className="search-empty">No guests found.</td></tr>}
              {list.map((g) => (
                <tr key={g.name}>
                  <td>
                    <div className="guest" onClick={() => openGuest360(g.name)}>
                      <div className={`avatar avatar-${g.color}`}>{g.initials}</div>
                      <div><strong>{g.name}{g.status === "vip" ? " ✦" : ""}</strong><small>{g.country}</small></div>
                    </div>
                  </td>
                  <td>{g.country}</td>
                  <td>{g.stays}</td>
                  <td>{fmtLKR(g.ltv)}</td>
                  <td>{g.last}</td>
                  <td>{g.room}</td>
                  <td><span className={`pill ${STATUS_PILL[g.status]}`}>{g.status}</span></td>
                  <td><button className="row-menu" onClick={() => openGuest360(g.name)}>•••</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}

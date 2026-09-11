"use client";

import { useMemo, useState } from "react";
import { useApp } from "../../lib/AppContext";
import { useData } from "../../lib/DataContext";
import { fmtLKR, STATUS_META } from "../../lib/format";

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "confirmed", label: "Confirmed" },
  { key: "pending", label: "Pending" },
  { key: "checkedin", label: "Checked-in" },
  { key: "checkedout", label: "Checked-out" },
  { key: "cancelled", label: "Cancelled" },
  { key: "noshow", label: "No-show" },
];

export default function ReservationsView({ active }: { active: boolean }) {
  const { view, navParams, openBookingDrawer, openConfirm, openNewBooking, toast } = useApp();
  const { reservations, cancelReservation } = useData();
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [prevNavParams, setPrevNavParams] = useState(navParams);
  if (view === "reservations" && navParams !== prevNavParams) {
    setPrevNavParams(navParams);
    if (navParams.filter === "walkin") {
      setSourceFilter("Walk-in");
      setStatusFilter("all");
    } else if (navParams.filter) {
      setStatusFilter(navParams.filter);
      setSourceFilter(null);
    }
  }

  const list = useMemo(() => {
    let l = reservations;
    if (statusFilter !== "all") l = l.filter((r) => r.status === statusFilter);
    if (sourceFilter) l = l.filter((r) => r.source === sourceFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      l = l.filter((r) => (r.id + r.guest + r.room + r.roomType + r.source).toLowerCase().includes(q));
    }
    return l;
  }, [reservations, statusFilter, sourceFilter, search]);

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(list.map((r) => r.id)) : new Set());
  }
  function bulkAction(label: string) {
    if (label === "Cancel") {
      openConfirm(
        "Cancel Selected Bookings?",
        `This will cancel ${selected.size} reservation(s) and notify guests. This action cannot be undone.`,
        async () => {
          await Promise.all([...selected].map((id) => cancelReservation(id)));
          toast("Selected reservations cancelled.");
          setSelected(new Set());
        }
      );
    } else {
      toast(`${label} applied to ${selected.size} reservation(s).`);
    }
  }

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">OPERATIONS</div>
          <h1>Reservations</h1>
          <p>All bookings across every channel — search, filter, and manage in bulk.</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Reservations exported to Excel.")}>⇩ Export</button>
          <button className="btn btn-primary" onClick={openNewBooking}>＋ New Reservation</button>
        </div>
      </div>

      <div className="table-toolbar">
        <div className="tt-left">
          <div className="tt-search">
            <span>⌕</span>
            <input placeholder="Search booking ID, guest, room…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="segmented">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.key}
                className={statusFilter === f.key && !sourceFilter ? "active" : ""}
                onClick={() => {
                  setStatusFilter(f.key);
                  setSourceFilter(null);
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="tt-right">
          <button className="btn btn-secondary" onClick={() => toast("Column visibility settings opened.")}>Columns</button>
          <button className="date-btn small">26 Aug – 01 Sep</button>
        </div>
      </div>

      <div className={`bulk-bar${selected.size > 0 ? " show" : ""}`}>
        <span>{selected.size} selected</span>
        <button onClick={() => bulkAction("Assign Room")}>Assign Room</button>
        <button onClick={() => bulkAction("Change Status")}>Change Status</button>
        <button onClick={() => bulkAction("Send Confirmation")}>Send Confirmation</button>
        <button className="danger" onClick={() => bulkAction("Cancel")}>Cancel</button>
        <button onClick={() => bulkAction("Export")}>Export</button>
      </div>

      <article className="panel table-panel full-table">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" checked={list.length > 0 && selected.size === list.length} onChange={(e) => toggleAll(e.target.checked)} /></th>
                <th>Booking ID</th><th>Guest</th><th>Room</th><th>Room Type</th><th>Arrival</th><th>Departure</th>
                <th>Nights</th><th>Guests</th><th>Source</th><th>Rate</th><th>Payment</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr><td colSpan={13} className="search-empty">No reservations found. Try changing your filters.</td></tr>
              )}
              {list.map((r) => {
                const meta = STATUS_META[r.status] || STATUS_META.confirmed;
                return (
                  <tr key={r.id}>
                    <td><input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleSelect(r.id)} /></td>
                    <td><b>{r.id}</b></td>
                    <td>
                      <div className="guest" onClick={() => openBookingDrawer(r.id)}>
                        <div className={`avatar avatar-${r.color}`}>{r.initials}</div>
                        <div><strong>{r.guest}{r.vip ? " ✦" : ""}</strong><small>{r.country} · {r.phone}</small></div>
                      </div>
                    </td>
                    <td>{r.room}</td>
                    <td>{r.roomType}</td>
                    <td>{r.arrival}</td>
                    <td>{r.departure}</td>
                    <td>{r.nights}</td>
                    <td>{r.guests}</td>
                    <td><span className="source">{r.source}</span></td>
                    <td>{fmtLKR(r.rate)}</td>
                    <td><span className={`pill ${r.payment === "paid" ? "paid" : r.payment === "refunded" ? "cancelled" : "pending"}`}>{r.payment}</span></td>
                    <td><span className={`pill ${meta.pill}`}>{r.vip ? "VIP" : meta.label}</span></td>
                    <td><button className="row-menu" onClick={() => openBookingDrawer(r.id)}>•••</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>{list.length} reservation{list.length !== 1 ? "s" : ""}</span>
          <div className="pagination"><button className="icon-btn">‹</button><span>1</span><span className="muted">of 3</span><button className="icon-btn">›</button></div>
        </div>
      </article>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useApp } from "../../lib/AppContext";
import { MAINTENANCE } from "../../lib/data";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "assigned", label: "Assigned" },
  { key: "inprogress", label: "In Progress" },
  { key: "waiting", label: "Waiting" },
  { key: "resolved", label: "Resolved" },
];

const STATUS_PILL: Record<string, string> = {
  resolved: "confirmed",
  waiting: "pending",
  open: "cancelled",
  assigned: "pending",
  inprogress: "pending",
};

export default function MaintenanceView({ active }: { active: boolean }) {
  const { toast } = useApp();
  const [filter, setFilter] = useState("all");
  const list = useMemo(() => (filter === "all" ? MAINTENANCE : MAINTENANCE.filter((m) => m.status === filter)), [filter]);

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">ROOMS</div>
          <h1>Maintenance</h1>
          <p>Open service requests · SLA tracked per priority</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Maintenance tickets exported.")}>⇩ Export</button>
          <button className="btn btn-primary" onClick={() => toast("New maintenance request form opened.")}>＋ New Request</button>
        </div>
      </div>
      <div className="table-toolbar">
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
              <tr><th>Ticket</th><th>Room</th><th>Issue</th><th>Priority</th><th>Assigned Staff</th><th>Created</th><th>SLA</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {list.map((m) => (
                <tr key={m.id}>
                  <td><b>{m.id}</b></td>
                  <td>{m.room}</td>
                  <td>{m.issue}</td>
                  <td><em className={m.priority === "critical" ? "high" : m.priority}>{m.priority[0].toUpperCase() + m.priority.slice(1)}</em></td>
                  <td>{m.staff}</td>
                  <td>{m.created}</td>
                  <td style={{ color: m.sla.toLowerCase().includes("overdue") ? "#d14343" : "#8994a5" }}>{m.sla}</td>
                  <td><span className={`pill ${STATUS_PILL[m.status]}`}>{m.status}</span></td>
                  <td><button className="row-menu" onClick={() => toast(`Ticket ${m.id} opened.`)}>•••</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useApp } from "../../lib/AppContext";
import { AUDIT_LOG } from "../../lib/data";

export default function AuditView({ active }: { active: boolean }) {
  const { toast } = useApp();
  const [search, setSearch] = useState("");

  const list = useMemo(() => {
    if (!search.trim()) return AUDIT_LOG;
    const q = search.toLowerCase();
    return AUDIT_LOG.filter((a) => (a.user + a.action + a.module + a.entity).toLowerCase().includes(q));
  }, [search]);

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">ADMINISTRATION</div>
          <h1>Audit Log</h1>
          <p>Complete trail of every action taken in the system</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Audit log exported.")}>⇩ Export</button>
        </div>
      </div>
      <div className="table-toolbar">
        <div className="tt-search">
          <span>⌕</span>
          <input placeholder="Search user, action, entity…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <article className="panel table-panel full-table">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Timestamp</th><th>User</th><th>Role</th><th>Action</th><th>Module</th><th>Entity</th><th>Old Value</th><th>New Value</th><th>IP</th><th>Status</th></tr>
            </thead>
            <tbody>
              {list.length === 0 && <tr><td colSpan={10} className="search-empty">No audit entries found.</td></tr>}
              {list.map((a, i) => (
                <tr key={i}>
                  <td>{a.time}</td><td>{a.user}</td><td>{a.role}</td><td>{a.action}</td><td>{a.module}</td>
                  <td>{a.entity}</td><td>{a.old}</td><td>{a.new}</td><td>{a.ip}</td>
                  <td><span className={`pill ${a.status === "success" ? "confirmed" : "cancelled"}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}

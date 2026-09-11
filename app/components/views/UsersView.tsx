"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppContext";
import { ROLES_PERMISSIONS, USERS } from "../../lib/data";
import { colorOf, initialsOf } from "../../lib/format";

const TABS = [
  { key: "users", label: "Users" },
  { key: "roles", label: "Roles & Permissions" },
];

function Check({ ok }: { ok: boolean }) {
  return ok ? <span className="perm-check">✓</span> : <span className="perm-cross">—</span>;
}

export default function UsersView({ active }: { active: boolean }) {
  const { view, navParams, toast } = useApp();
  const [tab, setTab] = useState("users");

  const [prevNavParams, setPrevNavParams] = useState(navParams);
  if (view === "users" && navParams !== prevNavParams) {
    setPrevNavParams(navParams);
    if (navParams.tab) setTab(navParams.tab);
  }

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">ADMINISTRATION</div>
          <h1>Users &amp; Roles</h1>
          <p>8 active staff accounts across 6 roles</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-primary" onClick={() => toast("Invite user form opened.")}>＋ Invite User</button>
        </div>
      </div>
      <div className="tabs">
        {TABS.map((t) => (
          <button key={t.key} className={tab === t.key ? "active" : ""} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      {tab === "users" && (
        <div className="users-panel active">
          <article className="panel table-panel full-table">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Status</th><th>Last Login</th><th></th></tr></thead>
                <tbody>
                  {USERS.map((u) => (
                    <tr key={u.email}>
                      <td>
                        <div className="guest">
                          <div className={`avatar avatar-${colorOf(u.name)}`}>{initialsOf(u.name)}</div>
                          <div><strong>{u.name}</strong></div>
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>{u.dept}</td>
                      <td><span className={`pill ${u.status === "active" ? "confirmed" : "cancelled"}`}>{u.status}</span></td>
                      <td>{u.last}</td>
                      <td><button className="row-menu" onClick={() => toast(`${u.name} account menu opened.`)}>•••</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}

      {tab === "roles" && (
        <div className="users-panel active">
          <article className="panel">
            <div className="panel-head"><div><h2>Permission Matrix</h2><p>Access control by role</p></div></div>
            <div className="table-wrap">
              <table className="perm-matrix">
                <thead><tr><th>Role</th><th>View</th><th>Create</th><th>Edit</th><th>Delete</th><th>Export</th><th>Approve</th></tr></thead>
                <tbody>
                  {ROLES_PERMISSIONS.map((r) => (
                    <tr key={r.role}>
                      <td><strong>{r.role}</strong></td>
                      <td><Check ok={r.view} /></td>
                      <td><Check ok={r.create} /></td>
                      <td><Check ok={r.edit} /></td>
                      <td><Check ok={r.del} /></td>
                      <td><Check ok={r.exp} /></td>
                      <td><Check ok={r.approve} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

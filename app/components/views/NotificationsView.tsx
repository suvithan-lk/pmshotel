"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppContext";

const TABS = [
  { key: "all", label: "All" },
  { key: "bookings", label: "Bookings" },
  { key: "payments", label: "Payments" },
  { key: "rooms", label: "Rooms" },
  { key: "channels", label: "Channels" },
  { key: "maintenance", label: "Maintenance" },
  { key: "system", label: "System" },
];

export default function NotificationsView({ active }: { active: boolean }) {
  const { notifications, markAllRead, toast } = useApp();
  const [tab, setTab] = useState("all");
  const list = notifications.filter((n) => tab === "all" || n.cat === tab);

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">ADMINISTRATION</div>
          <h1>Notification Center</h1>
          <p>All system notifications across every module</p>
        </div>
        <div className="head-actions">
          <button
            className="btn btn-secondary"
            onClick={() => {
              markAllRead();
              toast("All notifications marked as read.");
            }}
          >
            Mark all as read
          </button>
        </div>
      </div>
      <div className="tabs">
        {TABS.map((t) => (
          <button key={t.key} className={tab === t.key ? "active" : ""} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>
      <article className="panel">
        <div className="notif-list full-notif-list">
          {list.length === 0 ? (
            <div className="search-empty">No notifications.</div>
          ) : (
            list.map((n, i) => (
              <div key={i} className={`notif-item ${n.unread ? "unread" : "read"}`}>
                <i className="notif-dot"></i>
                <div>
                  <strong>{n.title}</strong>
                  <p>{n.desc}</p>
                  <small>{n.time}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </article>
    </div>
  );
}

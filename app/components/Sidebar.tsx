"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useApp } from "../lib/AppContext";
import { initialsOf, roleLabel } from "../lib/format";

interface NavItem {
  icon: string;
  label: string;
  view: string;
  filter?: string;
  tab?: string;
  channel?: string;
  badge?: number;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

function buildSections(notifUnread: number): NavSection[] {
  return [
    {
      label: "Property",
      items: [
        { icon: "▦", label: "Hotel Overview", view: "overview" },
        { icon: "⚙", label: "Property Settings", view: "settings" },
      ],
    },
    {
      label: "Operations",
      items: [
        { icon: "▧", label: "Dashboard", view: "overview" },
        { icon: "▤", label: "Reservations", view: "reservations", badge: 24 },
        { icon: "▦", label: "Reservation Calendar", view: "calendar" },
        { icon: "↘", label: "Arrivals", view: "arrivals", badge: 8 },
        { icon: "↗", label: "Departures", view: "departures", badge: 6 },
        { icon: "⚿", label: "Walk-ins", view: "reservations", filter: "walkin" },
        { icon: "⊘", label: "Cancellations", view: "reservations", filter: "cancelled" },
        { icon: "◌", label: "No-shows", view: "reservations", filter: "noshow" },
      ],
    },
    {
      label: "Rooms",
      items: [
        { icon: "▥", label: "Room Overview", view: "rooms" },
        { icon: "▦", label: "Room Inventory", view: "rooms", filter: "all" },
        { icon: "◧", label: "Room Types", view: "rooms", tab: "types" },
        { icon: "✦", label: "Housekeeping", view: "housekeeping" },
        { icon: "⚒", label: "Maintenance", view: "maintenance", badge: 3 },
        { icon: "⛔", label: "Out of Order", view: "rooms", filter: "ooo" },
      ],
    },
    {
      label: "Guests",
      items: [
        { icon: "◎", label: "Guests", view: "guests" },
        { icon: "◈", label: "Guest 360", view: "guest360" },
        { icon: "◇", label: "VIP Guests", view: "guests", filter: "vip" },
        { icon: "◷", label: "Guest History", view: "guest360", tab: "history" },
        { icon: "❖", label: "Preferences", view: "guest360", tab: "preferences" },
      ],
    },
    {
      label: "Channels",
      items: [
        { icon: "⇄", label: "Channel Manager", view: "channels" },
        { icon: "B", label: "Booking.com", view: "channels", channel: "booking" },
        { icon: "a", label: "Agoda", view: "channels", channel: "agoda" },
        { icon: "E", label: "Expedia", view: "channels", channel: "expedia" },
        { icon: "W", label: "Direct Website", view: "channels", channel: "direct" },
        { icon: "⌁", label: "Sync Logs", view: "channels", tab: "synclogs" },
        { icon: "⇅", label: "Rate Sync", view: "channels", tab: "ratesync" },
      ],
    },
    {
      label: "Revenue",
      items: [
        { icon: "▤", label: "Rate Management", view: "rates" },
        { icon: "⌁", label: "Dynamic Pricing", view: "revenue" },
        { icon: "❀", label: "Seasonal Pricing", view: "rates", tab: "seasonal" },
        { icon: "◐", label: "Weekend Pricing", view: "rates", tab: "weekend" },
        { icon: "◆", label: "Promotions", view: "promotions" },
        { icon: "↗", label: "Revenue Analytics", view: "revenue", tab: "analytics" },
        { icon: "◔", label: "Forecast", view: "revenue", tab: "forecast" },
      ],
    },
    {
      label: "Finance",
      items: [
        { icon: "◉", label: "Payments", view: "finance", tab: "payments" },
        { icon: "▤", label: "Invoices", view: "finance", tab: "invoices" },
        { icon: "↺", label: "Refunds", view: "finance", tab: "refunds" },
        { icon: "⇌", label: "Transactions", view: "finance", tab: "transactions" },
        { icon: "!", label: "Outstanding Balances", view: "finance", tab: "outstanding", badge: 4 },
        { icon: "◈", label: "Daily Revenue", view: "finance", tab: "daily" },
      ],
    },
    {
      label: "Reports",
      items: [{ icon: "▥", label: "Reports Center", view: "reports" }],
    },
    {
      label: "Administration",
      items: [
        { icon: "◎", label: "Users", view: "users" },
        { icon: "⚿", label: "Roles & Permissions", view: "users", tab: "roles" },
        { icon: "♢", label: "Notifications", view: "notifications", badge: notifUnread },
        { icon: "◌", label: "Audit Logs", view: "audit" },
        { icon: "⚙", label: "System Settings", view: "settings" },
      ],
    },
  ];
}

export default function Sidebar() {
  const { view, setView, notifications, mobileNavOpen, toggleMobileNav } = useApp();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const notifUnread = notifications.filter((n) => n.unread).length;
  const sections = buildSections(notifUnread);
  const displayName = session?.user?.name || "Admin";
  const displayRole = session?.user?.role ? roleLabel(session.user.role) : "Staff";

  function handleClick(item: NavItem) {
    setView(item.view, { filter: item.filter, tab: item.tab, channel: item.channel });
    if (mobileNavOpen) toggleMobileNav();
  }

  return (
    <aside
      className={`sidebar${collapsed ? " collapsed" : ""}${mobileNavOpen ? " mobile-open" : ""}`}
      id="sidebar"
    >
      <div className="brand">
        <div className="brand-mark">JC</div>
        <div className="brand-text">
          <strong>JaffnaCityPMS</strong>
          <span>Hotel PMS</span>
        </div>
        <button
          className="icon-btn sidebar-toggle"
          onClick={() => setCollapsed((c) => !c)}
          title="Collapse sidebar"
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <nav className="nav">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="nav-label">{section.label}</div>
            {section.items.map((item) => {
              const isActive = item.view === view && !item.filter && !item.tab && !item.channel;
              return (
                <a
                  key={item.label}
                  className={`nav-item${isActive ? " active" : ""}`}
                  href="#"
                  data-tip={item.label}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item);
                  }}
                >
                  <span>{item.icon}</span>
                  <b>{item.label}</b>
                  {item.badge !== undefined && <em>{item.badge}</em>}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="support-card">
          <div className="support-icon">?</div>
          <div>
            <strong>Need help?</strong>
            <span>Contact hotel support</span>
          </div>
        </div>
        <div className="user-mini">
          <div className="avatar">{initialsOf(displayName)}</div>
          <div className="user-info">
            <strong>{displayName}</strong>
            <span>{displayRole}</span>
          </div>
          <span>•••</span>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useApp } from "../lib/AppContext";
import { useData } from "../lib/DataContext";
import { initialsOf, roleLabel } from "../lib/format";

const BREADCRUMB: Record<string, string> = {
  overview: "Hotel Overview",
  reservations: "Reservations",
  calendar: "Reservation Calendar",
  arrivals: "Arrivals",
  departures: "Departures",
  rooms: "Room Inventory",
  housekeeping: "Housekeeping",
  maintenance: "Maintenance",
  guests: "Guests",
  guest360: "Guest 360",
  channels: "Channel Manager",
  rates: "Rate Management",
  revenue: "Revenue Management",
  promotions: "Promotions",
  finance: "Finance",
  reports: "Reports Center",
  users: "Users & Roles",
  notifications: "Notification Center",
  alertcenter: "Attention Required",
  audit: "Audit Log",
  settings: "Property Settings",
};

const NOTIF_TABS = [
  { key: "all", label: "All" },
  { key: "bookings", label: "Bookings" },
  { key: "payments", label: "Payments" },
  { key: "rooms", label: "Rooms" },
  { key: "channels", label: "Channels" },
  { key: "system", label: "System" },
];

export default function Header() {
  const {
    view,
    toggleMobileNav,
    openBookingDrawer,
    openRoomDrawer,
    notifications,
    markAllRead,
    theme,
    toggleTheme,
    lang,
    toggleLang,
    toast,
  } = useApp();
  const { data: session } = useSession();
  const { reservations, rooms } = useData();
  const displayName = session?.user?.name || "Admin";
  const displayRole = session?.user?.role ? roleLabel(session.user.role) : "Staff";

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifTab, setNotifTab] = useState("all");
  const [profileOpen, setProfileOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const notifWrapRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (searchWrapRef.current && !searchWrapRef.current.contains(target)) setSearchOpen(false);
      if (notifWrapRef.current && !notifWrapRef.current.contains(target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(target)) setProfileOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const guests = reservations.filter((r) => r.guest.toLowerCase().includes(q)).slice(0, 4);
    const bookings = reservations.filter((r) => r.id.toLowerCase().includes(q)).slice(0, 4);
    const matchedRooms = rooms.filter((r) => r.no.includes(q)).slice(0, 4);
    const phones = reservations.filter((r) => r.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""))).slice(0, 4);
    return { guests, bookings, rooms: matchedRooms, phones };
  }, [query, reservations, rooms]);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const visibleNotifs = notifications.filter((n) => notifTab === "all" || n.cat === notifTab);

  function selectBooking(id: string) {
    openBookingDrawer(id);
    setSearchOpen(false);
    setQuery("");
  }
  function selectRoom(no: string) {
    openRoomDrawer(no);
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <header className="topbar">
      <div className="mobile-brand">
        <button className="icon-btn" id="mobileMenu" onClick={toggleMobileNav}>
          ☰
        </button>
        <div className="brand-mark">GA</div>
        <strong>Grand Azure</strong>
      </div>
      <div className="breadcrumb">
        <span>Grand Azure Colombo</span>
        <b>/</b>
        <strong>{BREADCRUMB[view] || view}</strong>
      </div>
      <div className="top-actions">
        <div className="search-wrap" ref={searchWrapRef}>
          <div className="search-box">
            <span>⌕</span>
            <input
              ref={searchInputRef}
              placeholder="Search guest, booking, room, phone…"
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(!!e.target.value.trim());
              }}
              onFocus={() => query.trim() && setSearchOpen(true)}
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className={`search-results${searchOpen && results ? " show" : ""}`}>
            {results && (
              <>
                {results.guests.length > 0 && (
                  <>
                    <div className="search-group-label">Guests</div>
                    {results.guests.map((g) => (
                      <div key={g.id} className="search-result-item" onClick={() => selectBooking(g.id)}>
                        <div className={`avatar avatar-${g.color}`}>{g.initials}</div>
                        <div>
                          <strong>{g.guest}</strong>
                          <small>{g.country} · {g.phone}</small>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {results.bookings.length > 0 && (
                  <>
                    <div className="search-group-label">Bookings</div>
                    {results.bookings.map((b) => (
                      <div key={b.id} className="search-result-item" onClick={() => selectBooking(b.id)}>
                        <div className={`avatar avatar-${b.color}`}>▤</div>
                        <div>
                          <strong>{b.id}</strong>
                          <small>{b.guest} · Room {b.room} · {b.source}</small>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {results.rooms.length > 0 && (
                  <>
                    <div className="search-group-label">Rooms</div>
                    {results.rooms.map((r) => (
                      <div key={r.no} className="search-result-item" onClick={() => selectRoom(r.no)}>
                        <div className="avatar">{r.no}</div>
                        <div>
                          <strong>Room {r.no}</strong>
                          <small>{r.type} · {r.status}</small>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {results.phones.length > 0 && results.guests.length === 0 && (
                  <>
                    <div className="search-group-label">Phone</div>
                    {results.phones.map((p) => (
                      <div key={"ph-" + p.id} className="search-result-item" onClick={() => selectBooking(p.id)}>
                        <div className={`avatar avatar-${p.color}`}>{p.initials}</div>
                        <div>
                          <strong>{p.phone}</strong>
                          <small>{p.guest}</small>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {!results.guests.length && !results.bookings.length && !results.rooms.length && !results.phones.length && (
                  <div className="search-empty">No results for &quot;{query}&quot;</div>
                )}
              </>
            )}
          </div>
        </div>

        <button className="top-icon property-btn" onClick={() => toast("Single-property mode — Grand Azure Colombo.")} title="Property">
          <span className="pbtn-label">Grand Azure</span> <i>⌄</i>
        </button>
        <button className="date-btn" onClick={() => toast("Business date: 26 August 2026.")}>
          26 Aug 2026 <span>⌄</span>
        </button>
        <button className="top-icon" onClick={toggleLang} title="Language">
          {lang}
        </button>
        <button className="top-icon" onClick={toggleTheme} title="Toggle theme">
          {theme === "dark" ? "☀" : "☾"}
        </button>

        <div className="notif-wrap" ref={notifWrapRef}>
          <button
            className="top-icon notification-btn"
            title="Notifications"
            onClick={(e) => {
              e.stopPropagation();
              setNotifOpen((o) => !o);
            }}
          >
            ♢{unreadCount > 0 && <i></i>}
          </button>
          <div className={`notif-panel${notifOpen ? " show" : ""}`}>
            <div className="notif-head">
              <strong>Notifications</strong>
              <button
                onClick={() => {
                  markAllRead();
                  toast("All notifications marked as read.");
                }}
              >
                Mark all read
              </button>
            </div>
            <div className="notif-tabs">
              {NOTIF_TABS.map((t) => (
                <button key={t.key} className={notifTab === t.key ? "active" : ""} onClick={() => setNotifTab(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="notif-list">
              {visibleNotifs.length === 0 ? (
                <div className="search-empty">No notifications.</div>
              ) : (
                visibleNotifs.map((n, i) => (
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
          </div>
        </div>

        <div className="profile dropdown-toggle" ref={profileRef}>
          <div
            className="avatar"
            onClick={(e) => {
              e.stopPropagation();
              setProfileOpen((o) => !o);
            }}
            style={{ cursor: "pointer" }}
          >
            {initialsOf(displayName)}
          </div>
          <div>
            <strong>{displayName}</strong>
            <small>{displayRole}</small>
          </div>
          <span>⌄</span>
          <div className={`dropdown-menu profile-menu${profileOpen ? " show" : ""}`}>
            <a href="#" onClick={(e) => e.preventDefault()}>My Profile</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Security</a>
            <a
              href="#"
              className="danger"
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: "/login" });
              }}
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

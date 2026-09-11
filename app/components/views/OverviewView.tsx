"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppContext";
import { useData } from "../../lib/DataContext";
import { ALERTS, AUDIT_LOG, CHANNELS } from "../../lib/data";
import { buildCalendarRows } from "../../lib/calendarRows";
import { fmtLKR, STATUS_META } from "../../lib/format";
import CalendarGrid from "../CalendarGrid";
import LiveClock from "../LiveClock";

const CHART_RANGES: Record<string, { labels: string[]; avg: string }> = {
  "7d": { labels: ["20 Aug", "21 Aug", "22 Aug", "23 Aug", "24 Aug", "25 Aug", "26 Aug"], avg: "82%" },
  "30d": { labels: ["28 Jul", "2 Aug", "7 Aug", "12 Aug", "17 Aug", "22 Aug", "26 Aug"], avg: "79%" },
  "3m": { labels: ["Jun", "Jun", "Jul", "Jul", "Aug", "Aug", "Aug"], avg: "76%" },
  "1y": { labels: ["Sep", "Nov", "Jan", "Mar", "May", "Jul", "Aug"], avg: "74%" },
};

export default function OverviewView({ active }: { active: boolean }) {
  const { setView, openBookingDrawer, openRoomDrawer, openConflict, openNewBooking, toast, notifications } = useApp();
  const { reservations, rooms, triggerConflictDemo } = useData();
  const [range, setRange] = useState("7d");

  const arrivalsToday = reservations.filter((r) => r.arrival === "26 Aug").slice(0, 4);
  const departing = reservations.filter((r) => r.status === "checkedin" || r.departure === "26 Aug").slice(0, 4);
  const recentActivity = AUDIT_LOG.slice(0, 4);
  const unread = notifications.filter((n) => n.unread).length;
  const calendarRows = buildCalendarRows(rooms, reservations).slice(0, 6);

  function goto(view: string, tab?: string) {
    setView(view, { tab });
  }

  async function triggerConflict() {
    const info = await triggerConflictDemo();
    if (info) openConflict(info);
    else toast("No conflict found — Room 205's demo booking may already be cancelled.");
  }

  async function handleAlertAction(a: (typeof ALERTS)[number]) {
    if (a.conflict) await triggerConflict();
    else toast(`${a.action} action opened.`);
  }

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">
            <span className="live-dot"></span> LIVE HOTEL OPERATIONS · <LiveClock />
          </div>
          <h1>Good morning, Suvithan <span>✦</span></h1>
          <p>Here&apos;s what&apos;s happening across JaffnaCityPMS today, 26 August 2026.</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Dashboard report exported successfully.")}>⇩ Export</button>
          <button className="btn btn-primary" onClick={openNewBooking}>＋ New Reservation</button>
        </div>
      </div>

      <div className="status-strip">
        <span className="status-ok"><i></i> PMS Operational</span>
        <span className="status-ok"><i></i> Channel Manager Synced</span>
        <span className="status-ok"><i></i> Payment Gateway Operational</span>
        <span className="status-ok"><i></i> 98/100 Rooms Synced</span>
        <span className="status-warn" onClick={triggerConflict}><i></i> 2 Inventory Conflicts</span>
      </div>

      <div className="kpi-grid">
        <article className="kpi-card" onClick={() => goto("arrivals")}>
          <div className="kpi-top"><span className="kpi-icon blue">↘</span><span className="trend up">+12.4%</span></div>
          <div className="kpi-label">Today&apos;s Arrivals</div><strong className="kpi-value">24</strong><span className="kpi-sub">vs 21 yesterday</span>
          <div className="spark"><i style={{ height: "35%" }}></i><i style={{ height: "45%" }}></i><i style={{ height: "38%" }}></i><i style={{ height: "65%" }}></i><i style={{ height: "55%" }}></i><i style={{ height: "72%" }}></i><i style={{ height: "85%" }}></i></div>
        </article>
        <article className="kpi-card" onClick={() => goto("departures")}>
          <div className="kpi-top"><span className="kpi-icon purple">↗</span><span className="trend neutral">5 pending</span></div>
          <div className="kpi-label">Today&apos;s Departures</div><strong className="kpi-value">18</strong><span className="kpi-sub">3 late checkout</span>
          <div className="spark purple-spark"><i style={{ height: "55%" }}></i><i style={{ height: "40%" }}></i><i style={{ height: "65%" }}></i><i style={{ height: "52%" }}></i><i style={{ height: "70%" }}></i><i style={{ height: "58%" }}></i><i style={{ height: "76%" }}></i></div>
        </article>
        <article className="kpi-card" onClick={() => goto("rooms")}>
          <div className="kpi-top"><span className="kpi-icon green">▥</span><span className="trend up">+4.8%</span></div>
          <div className="kpi-label">Occupancy</div><strong className="kpi-value">82% <small>82/100</small></strong><span className="kpi-sub">82 rooms occupied</span>
          <div className="progress"><i style={{ width: "82%" }}></i></div>
        </article>
        <article className="kpi-card" onClick={() => goto("rooms")}>
          <div className="kpi-top"><span className="kpi-icon cyan">□</span><span className="trend up">14 rooms</span></div>
          <div className="kpi-label">Available Rooms</div><strong className="kpi-value">14</strong><span className="kpi-sub">4 ready to sell</span>
          <div className="progress"><i style={{ width: "14%" }}></i></div>
        </article>
        <article className="kpi-card revenue-kpi" onClick={() => goto("finance")}>
          <div className="kpi-top"><span className="kpi-icon navy">◉</span><span className="trend up">+18.4%</span></div>
          <div className="kpi-label">Today&apos;s Revenue</div><strong className="kpi-value">LKR 485K</strong><span className="kpi-sub">vs LKR 409K yesterday</span>
          <div className="spark"><i style={{ height: "40%" }}></i><i style={{ height: "35%" }}></i><i style={{ height: "50%" }}></i><i style={{ height: "58%" }}></i><i style={{ height: "54%" }}></i><i style={{ height: "75%" }}></i><i style={{ height: "90%" }}></i></div>
        </article>
        <article className="kpi-card" onClick={() => goto("revenue")}>
          <div className="kpi-top"><span className="kpi-icon blue">◆</span><span className="trend up">+6.2%</span></div>
          <div className="kpi-label">ADR</div><strong className="kpi-value">LKR 24.5K</strong><span className="kpi-sub">Average daily rate</span>
        </article>
        <article className="kpi-card" onClick={() => goto("revenue")}>
          <div className="kpi-top"><span className="kpi-icon green">↗</span><span className="trend up">+8.7%</span></div>
          <div className="kpi-label">RevPAR</div><strong className="kpi-value">LKR 20.1K</strong><span className="kpi-sub">Revenue per available room</span>
        </article>
        <article className="kpi-card" onClick={() => goto("finance", "outstanding")}>
          <div className="kpi-top"><span className="kpi-icon amber">◷</span><span className="trend warning">Needs action</span></div>
          <div className="kpi-label">Pending Payments</div><strong className="kpi-value">LKR 185K</strong><span className="kpi-sub">4 reservations unpaid</span>
        </article>
      </div>

      <div className="section-grid analytics">
        <article className="panel chart-panel">
          <div className="panel-head">
            <div><h2>Occupancy &amp; Performance</h2><p>Room performance over the selected period</p></div>
            <div className="segmented">
              {Object.keys(CHART_RANGES).map((r) => (
                <button key={r} className={range === r ? "active" : ""} onClick={() => { setRange(r); toast(`Analytics range changed to ${r.toUpperCase()}.`); }}>
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-legend"><span><i className="dot blue"></i> Occupancy</span><span><i className="dot gray"></i> Available rooms</span><strong>{CHART_RANGES[range].avg} <small>avg.</small></strong></div>
          <div className="line-chart">
            <div className="y-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
            <div className="chart-area">
              <div className="gridline g1"></div><div className="gridline g2"></div><div className="gridline g3"></div><div className="gridline g4"></div><div className="gridline g5"></div>
              <svg viewBox="0 0 700 230" preserveAspectRatio="none" className="chart-svg">
                <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2563eb" stopOpacity=".20" /><stop offset="1" stopColor="#2563eb" stopOpacity="0" /></linearGradient></defs>
                <path d="M0,154 C45,145 65,130 105,137 S160,112 205,122 S265,98 305,112 S360,87 400,96 S455,67 500,82 S550,58 590,71 S650,42 700,54 L700,230 L0,230 Z" fill="url(#area)" />
                <path d="M0,154 C45,145 65,130 105,137 S160,112 205,122 S265,98 305,112 S360,87 400,96 S455,67 500,82 S550,58 590,71 S650,42 700,54" fill="none" stroke="#2563eb" strokeWidth="3" />
                <circle cx="700" cy="54" r="5" fill="#2563eb" />
              </svg>
              <div className="chart-tooltip">
                <b>26 Aug</b>
                <span>Occupancy: <strong>82%</strong></span>
                <span>Rooms sold: <strong>82</strong></span>
                <span>ADR: <strong>LKR 24,500</strong></span>
                <span>Revenue: <strong>LKR 2,009,000</strong></span>
              </div>
              <div className="x-labels">{CHART_RANGES[range].labels.map((l, i) => <span key={i}>{l}</span>)}</div>
            </div>
          </div>
        </article>

        <article className="panel revenue-panel">
          <div className="panel-head"><div><h2>Revenue Mix</h2><p>Today&apos;s revenue by department</p></div><button className="more">•••</button></div>
          <div className="donut-wrap"><div className="donut"><div><strong>LKR 485K</strong><span>Total today</span></div></div></div>
          <div className="revenue-list">
            <div><span><i className="dot blue"></i> Rooms</span><strong>LKR 356K <small>73.4%</small></strong></div>
            <div><span><i className="dot purple"></i> Restaurant</span><strong>LKR 82K <small>16.9%</small></strong></div>
            <div><span><i className="dot amber"></i> Events / Halls</span><strong>LKR 31K <small>6.4%</small></strong></div>
            <div><span><i className="dot gray"></i> Other</span><strong>LKR 16K <small>3.3%</small></strong></div>
          </div>
        </article>
      </div>

      <div className="section-grid main-grid">
        <article className="panel calendar-panel">
          <div className="panel-head">
            <div><h2>Reservation Calendar</h2><p>26 August — 01 September 2026</p></div>
            <div className="calendar-actions">
              <button className="icon-btn">‹</button><button className="icon-btn">›</button>
              <button className="btn btn-secondary">Today</button>
              <button className="btn btn-secondary" onClick={() => goto("calendar")}>Open full view →</button>
            </div>
          </div>
          <CalendarGrid rows={calendarRows} rooms={rooms} />
        </article>

        <article className="panel alerts-panel">
          <div className="panel-head"><div><h2>Attention Required</h2><p>Operational issues that need action</p></div><span className="alert-count">{ALERTS.length}</span></div>
          <div className="alerts">
            {ALERTS.map((a) => (
              <div key={a.title} className={`alert-item ${a.severity}`}>
                <div className="alert-icon">{a.icon}</div>
                <div><strong>{a.title}</strong><p>{a.desc}</p><small>{a.time}</small></div>
                <button onClick={() => handleAlertAction(a)}>{a.action}</button>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="section-grid two-col">
        <article className="panel">
          <div className="panel-head"><div><h2>Room Status</h2><p>Real-time inventory overview</p></div><button className="btn btn-secondary" onClick={() => goto("rooms")}>View All Rooms →</button></div>
          <div className="room-summary">
            <span><i className="status-dot available"></i> Available <b>14</b></span>
            <span><i className="status-dot occupied"></i> Occupied <b>82</b></span>
            <span><i className="status-dot cleaning"></i> Cleaning <b>3</b></span>
            <span><i className="status-dot maintenance"></i> Maintenance <b>1</b></span>
          </div>
          <div className="room-grid">
            {rooms.slice(0, 8).map((r) => (
              <div key={r.no} className={`room-card ${r.status}`} onClick={() => openRoomDrawer(r.no)}>
                <div><b>{r.no}</b><span>{r.type}</span></div>
                <i>{r.status[0].toUpperCase() + r.status.slice(1)}</i>
                <small>{r.guest ? `${r.guest}${r.status === "occupied" ? " · out " + r.out : ""}` : r.issue || r.hk || "Ready to sell"}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-head"><div><h2>Channel Manager</h2><p>Distribution &amp; inventory synchronization</p></div><span className="sync-live"><i></i> Live</span></div>
          <div className="channel-list">
            {CHANNELS.map((c) => (
              <div key={c.key} className="channel">
                <div className={`channel-logo ${c.cls}`}>{c.logo}</div>
                <div><strong>{c.name}</strong><span>{c.bookings} bookings · {c.inventory} rooms</span></div>
                <div className={`channel-state ${c.status === "warning" ? "warning-state" : "connected"}`}><i></i>{c.status === "warning" ? "Warning" : "Connected"}</div>
                <small>{c.lastSync}</small>
              </div>
            ))}
          </div>
          <div className="sync-warning">
            <div>!</div>
            <div><strong>Inventory mismatch detected</strong><span>Expedia shows 2 rooms more than PMS inventory.</span></div>
            <button className="btn btn-primary" onClick={() => toast("All channel inventories synchronized.")}>Sync Now</button>
          </div>
        </article>
      </div>

      <div className="section-grid two-col">
        <article className="panel table-panel">
          <div className="panel-head"><div><h2>Today&apos;s Arrivals</h2><p>24 guests expected today</p></div><button className="btn btn-secondary" onClick={() => goto("arrivals")}>View All →</button></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Guest</th><th>Room</th><th>Stay</th><th>Source</th><th>Payment</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {arrivalsToday.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="guest" onClick={() => openBookingDrawer(r.id)}>
                        <div className={`avatar avatar-${r.color}`}>{r.initials}</div>
                        <div><strong>{r.guest}</strong><small>{r.id} · {r.guests} guest{r.guests > 1 ? "s" : ""}</small></div>
                      </div>
                    </td>
                    <td>{r.room}<br /><small>{r.roomType}</small></td>
                    <td>{r.arrival}–{r.departure}</td>
                    <td><span className="source">{r.source}</span></td>
                    <td><span className={`pill ${r.payment === "paid" ? "paid" : "pending"}`}>{r.payment}</span></td>
                    <td><span className={`pill ${STATUS_META[r.status].pill}`}>{r.vip ? "VIP" : STATUS_META[r.status].label}</span></td>
                    <td><button className="row-menu" onClick={() => openBookingDrawer(r.id)}>•••</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel table-panel">
          <div className="panel-head"><div><h2>Today&apos;s Departures</h2><p>18 guests scheduled to leave</p></div><button className="btn btn-secondary" onClick={() => goto("departures")}>View All →</button></div>
          <div className="departure-list">
            {departing.map((r) => {
              const balance = r.payment === "pending" ? Math.round(r.rate * 0.3) : 0;
              return (
                <div key={r.id} className="departure" onClick={() => openBookingDrawer(r.id)}>
                  <div className={`avatar avatar-${r.color}`}>{r.initials}</div>
                  <div className="departure-main"><strong>{r.guest} <span className="room-tag">{r.room}</span></strong><span>Checkout by 11:00 AM</span></div>
                  <div className="balance"><small>Balance</small><strong className={balance ? "red-text" : ""}>{fmtLKR(balance)}</strong></div>
                  <span className={`pill ${balance ? "pending" : "paid"}`}>{balance ? "Pending" : "Ready"}</span>
                </div>
              );
            })}
          </div>
        </article>
      </div>

      <div className="section-grid three-col">
        <article className="panel stat-panel">
          <div className="panel-head"><div><h2>Guest Insights</h2><p>Guest relationship overview</p></div></div>
          <div className="big-stat"><strong>1,248</strong><span>Total guests this year</span></div>
          <div className="insight-row"><span>New guests</span><b>684</b><i>54.8%</i></div>
          <div className="insight-row"><span>Returning guests</span><b>564</b><i>45.2%</i></div>
          <div className="insight-row"><span>VIP guests</span><b>87</b><i>7.0%</i></div>
          <div className="insight-row"><span>Avg. stay</span><b>3.6 nights</b><i>+0.4</i></div>
        </article>
        <article className="panel">
          <div className="panel-head"><div><h2>Housekeeping</h2><p>Live room cleaning queue</p></div><span className="pill confirmed">18 ready</span></div>
          <div className="house-stats"><div><strong>06</strong><span>To clean</span></div><div><strong>03</strong><span>Cleaning</span></div><div><strong>04</strong><span>Priority</span></div></div>
          <div className="cleaning-list">
            <div><b>101</b><span>Checkout room</span><i>High</i></div>
            <div><b>106</b><span>Stayover cleaning</span><i>Normal</i></div>
            <div><b>204</b><span>Maintenance hold</span><i>Blocked</i></div>
          </div>
        </article>
        <article className="panel">
          <div className="panel-head"><div><h2>Maintenance</h2><p>Open service requests</p></div><button className="more" onClick={() => goto("maintenance")}>•••</button></div>
          <div className="maintenance-list">
            <div><span className="maintenance-icon">⚒</span><div><strong>Room 204 · Air Conditioning</strong><small>Assigned to Maintenance Team</small></div><em className="high">High</em></div>
            <div><span className="maintenance-icon">⚡</span><div><strong>Room 117 · Power outlet</strong><small>Assigned to Electrical</small></div><em className="medium">Medium</em></div>
            <div><span className="maintenance-icon">♨</span><div><strong>Restaurant · Water heater</strong><small>Awaiting inspection</small></div><em className="low">Low</em></div>
          </div>
        </article>
      </div>

      <div className="section-grid two-col">
        <article className="panel pricing-panel">
          <div className="panel-head"><div><h2>Revenue Management</h2><p>Dynamic pricing &amp; forecast</p></div><span className="ai-badge">✦ AI INSIGHTS</span></div>
          <div className="revenue-stats">
            <div><span>Occupancy forecast</span><strong>91%</strong><small>+9.2% vs last week</small></div>
            <div><span>Revenue forecast</span><strong>LKR 2.84M</strong><small>Next 7 days</small></div>
            <div><span>Booking pace</span><strong>+16.8%</strong><small>vs previous period</small></div>
          </div>
          <div className="pricing-table">
            <div className="pricing-row header"><span>Room Type</span><span>Current</span><span>Weekend</span><span>Occupancy</span><span>Suggested</span></div>
            <div className="pricing-row"><strong>Deluxe King</strong><span>LKR 25K</span><span>LKR 28K</span><span><b>87%</b></span><span className="suggested">LKR 31K ✦</span></div>
            <div className="pricing-row"><strong>Suite</strong><span>LKR 42K</span><span>LKR 48K</span><span><b>92%</b></span><span className="suggested">LKR 51K ✦</span></div>
            <div className="pricing-row"><strong>Premium Suite</strong><span>LKR 58K</span><span>LKR 65K</span><span><b>76%</b></span><span className="suggested">LKR 61K ✦</span></div>
          </div>
        </article>
        <article className="panel finance-summary">
          <div className="panel-head"><div><h2>Finance Snapshot</h2><p>Today&apos;s payment activity</p></div><button className="btn btn-secondary" onClick={() => goto("finance")}>Finance →</button></div>
          <div className="finance-kpis"><div><span>Collected</span><strong>LKR 452K</strong></div><div><span>Pending</span><strong>LKR 33K</strong></div><div><span>Refunds</span><strong>LKR 8.5K</strong></div></div>
          <div className="payment-bars">
            <div><span>Card <b>52%</b></span><i><em style={{ width: "52%" }}></em></i></div>
            <div><span>PayHere <b>24%</b></span><i><em style={{ width: "24%" }}></em></i></div>
            <div><span>Cash <b>15%</b></span><i><em style={{ width: "15%" }}></em></i></div>
            <div><span>Bank transfer <b>9%</b></span><i><em style={{ width: "9%" }}></em></i></div>
          </div>
        </article>
      </div>

      <div className="section-grid two-col">
        <article className="panel insight-panel">
          <div className="panel-head"><div><h2>Hotel Insights</h2><p>Operational intelligence &amp; recommendations</p></div><span className="ai-badge">✦ AI</span></div>
          <div className="insight-list">
            <div className="insight-item"><i>↗</i><p>Occupancy is <b>8% higher</b> than the same day last week.</p></div>
            <div className="insight-item"><i>◆</i><p>Deluxe King demand increased <b>14%</b> for the upcoming weekend.</p></div>
            <div className="insight-item"><i>◉</i><p>Weekend rates can be increased by approximately <b>LKR 4,000</b> without impacting pace.</p></div>
            <div className="insight-item"><i>⇄</i><p><b>Booking.com</b> generated the highest volume of new bookings this week.</p></div>
            <div className="insight-item"><i>⛔</i><p><b>3 rooms</b> are expected to sell out tomorrow — consider closing discount codes.</p></div>
          </div>
        </article>
        <article className="panel">
          <div className="panel-head"><div><h2>Reports</h2><p>Quick access to operational reports</p></div><button className="btn btn-secondary" onClick={() => goto("reports")}>Report Center →</button></div>
          <div className="report-grid">
            {["Occupancy", "Revenue", "ADR / RevPAR", "Booking Sources", "Cancellations", "Payments"].map((r, i) => (
              <button key={r} onClick={() => toast(`Generating "${r}" report.`)}>
                <span>{["▥", "◉", "↗", "⇄", "⊘", "▤"][i]}</span>
                <strong>{r}</strong>
                <small>{["Daily & monthly", "Department breakdown", "Rate performance", "OTA & direct", "Cancellation trends", "Transactions & refunds"][i]}</small>
              </button>
            ))}
          </div>
        </article>
      </div>

      <div className="section-grid">
        <article className="panel">
          <div className="panel-head"><div><h2>Recent Activity</h2><p>Latest system audit events{unread > 0 ? ` · ${unread} unread notifications` : ""}</p></div><button className="btn btn-secondary" onClick={() => goto("audit")}>Full Audit Log →</button></div>
          <div className="activity-list">
            {recentActivity.map((a, i) => (
              <div key={i}>
                <div className={`activity-dot ${a.status === "success" ? "blue" : "amber"}`}></div>
                <p><strong>{a.user}</strong> {a.action.toLowerCase()} <b>{a.entity}</b><small>{a.time}</small></p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

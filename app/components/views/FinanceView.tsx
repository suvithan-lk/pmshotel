"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppContext";
import { DAILY_REVENUE_7D, FIN_INVOICES, FIN_OUTSTANDING, FIN_PAYMENTS, FIN_REFUNDS } from "../../lib/data";
import { fmtLKR } from "../../lib/format";

const TABS = [
  { key: "payments", label: "Payments" },
  { key: "invoices", label: "Invoices" },
  { key: "refunds", label: "Refunds" },
  { key: "transactions", label: "Transactions" },
  { key: "outstanding", label: "Outstanding Balances" },
  { key: "daily", label: "Daily Revenue" },
];

export default function FinanceView({ active }: { active: boolean }) {
  const { view, navParams, toast } = useApp();
  const [tab, setTab] = useState("payments");

  const [prevNavParams, setPrevNavParams] = useState(navParams);
  if (view === "finance" && navParams !== prevNavParams) {
    setPrevNavParams(navParams);
    if (navParams.tab) setTab(navParams.tab);
  }

  const maxRev = Math.max(...DAILY_REVENUE_7D.map((d) => d.value));

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">FINANCE</div>
          <h1>Finance</h1>
          <p>Payments, invoices, refunds and transaction history</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Finance data exported.")}>⇩ Export</button>
          <button className="btn btn-primary" onClick={() => toast("Add payment form opened.")}>＋ Add Payment</button>
        </div>
      </div>
      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(6,1fr)" }}>
        <article className="kpi-card"><div className="kpi-label">Today&apos;s Revenue</div><strong className="kpi-value">LKR 485K</strong></article>
        <article className="kpi-card"><div className="kpi-label">Monthly Revenue</div><strong className="kpi-value">LKR 12.4M</strong></article>
        <article className="kpi-card"><div className="kpi-label">Net Revenue</div><strong className="kpi-value">LKR 11.1M</strong></article>
        <article className="kpi-card"><div className="kpi-label">Pending Payments</div><strong className="kpi-value">LKR 185K</strong></article>
        <article className="kpi-card"><div className="kpi-label">Refunds</div><strong className="kpi-value">LKR 42K</strong></article>
        <article className="kpi-card"><div className="kpi-label">Taxes Collected</div><strong className="kpi-value">LKR 930K</strong></article>
      </div>
      <div className="tabs">
        {TABS.map((t) => (
          <button key={t.key} className={tab === t.key ? "active" : ""} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      {tab === "payments" && (
        <div className="fin-panel active">
          <article className="panel table-panel full-table">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Date</th><th>Guest</th><th>Booking</th><th>Method</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  {FIN_PAYMENTS.map((p, i) => (
                    <tr key={i}><td>{p.date}</td><td>{p.guest}</td><td>{p.booking}</td><td>{p.method}</td><td>{fmtLKR(p.amount)}</td><td><span className={`pill ${p.status === "paid" ? "paid" : "pending"}`}>{p.status}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}

      {tab === "invoices" && (
        <div className="fin-panel active">
          <article className="panel table-panel full-table">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Invoice #</th><th>Guest</th><th>Booking</th><th>Issued</th><th>Amount</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {FIN_INVOICES.map((inv) => (
                    <tr key={inv.no}>
                      <td><b>{inv.no}</b></td><td>{inv.guest}</td><td>{inv.booking}</td><td>{inv.issued}</td><td>{fmtLKR(inv.amount)}</td>
                      <td><span className={`pill ${inv.status === "paid" ? "paid" : inv.status === "refunded" ? "cancelled" : "pending"}`}>{inv.status}</span></td>
                      <td><button className="row-menu" onClick={() => toast(`Invoice ${inv.no} opened.`)}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}

      {tab === "refunds" && (
        <div className="fin-panel active">
          <article className="panel table-panel full-table">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Refund #</th><th>Guest</th><th>Booking</th><th>Reason</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  {FIN_REFUNDS.map((r) => (
                    <tr key={r.no}><td><b>{r.no}</b></td><td>{r.guest}</td><td>{r.booking}</td><td>{r.reason}</td><td>{fmtLKR(r.amount)}</td><td><span className={`pill ${r.status === "completed" ? "confirmed" : "pending"}`}>{r.status}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}

      {tab === "transactions" && (
        <div className="fin-panel active">
          <article className="panel table-panel full-table">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Txn ID</th><th>Date</th><th>Guest</th><th>Type</th><th>Method</th><th>Amount</th></tr></thead>
                <tbody>
                  {FIN_PAYMENTS.map((p, i) => (
                    <tr key={i}><td>TXN-{9000 + i}</td><td>{p.date}</td><td>{p.guest}</td><td>Payment</td><td>{p.method}</td><td>{fmtLKR(p.amount)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}

      {tab === "outstanding" && (
        <div className="fin-panel active">
          <article className="panel table-panel full-table">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Guest</th><th>Room</th><th>Booking</th><th>Due Date</th><th>Balance</th><th></th></tr></thead>
                <tbody>
                  {FIN_OUTSTANDING.map((o, i) => (
                    <tr key={i}>
                      <td>{o.guest}</td><td>{o.room}</td><td>{o.booking}</td><td>{o.due}</td>
                      <td style={{ color: "#d14343", fontWeight: 700 }}>{fmtLKR(o.balance)}</td>
                      <td><button className="btn btn-secondary" style={{ height: 28, fontSize: "8.5px" }} onClick={() => toast(`Payment reminder sent to ${o.guest}.`)}>Send Reminder</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}

      {tab === "daily" && (
        <div className="fin-panel active">
          <article className="panel chart-panel">
            <div className="panel-head"><div><h2>Daily Revenue — Last 7 Days</h2></div></div>
            <div className="bar-chart">
              {DAILY_REVENUE_7D.map((d) => (
                <div className="bar-chart-col" key={d.day}>
                  <strong>{fmtLKR(d.value)}</strong>
                  <div className="bar" style={{ height: `${(d.value / maxRev) * 100}%` }}></div>
                  <small>{d.day}</small>
                </div>
              ))}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

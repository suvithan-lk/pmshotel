"use client";

import { DYNAMIC_PRICING, FORECAST_14D } from "../../lib/data";
import { fmtLKR } from "../../lib/format";

export default function RevenueView({ active }: { active: boolean }) {
  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">REVENUE</div>
          <h1>Revenue Management</h1>
          <p>Forecasting, pacing and AI-assisted pricing recommendations</p>
        </div>
        <div className="head-actions"><span className="ai-badge">✦ AI INSIGHTS</span></div>
      </div>
      <div className="kpi-grid rm-kpis">
        <article className="kpi-card"><div className="kpi-label">Occupancy Forecast</div><strong className="kpi-value">91%</strong><span className="kpi-sub">+9.2% vs last week</span></article>
        <article className="kpi-card"><div className="kpi-label">ADR</div><strong className="kpi-value">LKR 24.5K</strong><span className="kpi-sub">+6.2%</span></article>
        <article className="kpi-card"><div className="kpi-label">RevPAR</div><strong className="kpi-value">LKR 20.1K</strong><span className="kpi-sub">+8.7%</span></article>
        <article className="kpi-card"><div className="kpi-label">Booking Pace</div><strong className="kpi-value">+16.8%</strong><span className="kpi-sub">vs previous period</span></article>
        <article className="kpi-card"><div className="kpi-label">Average LOS</div><strong className="kpi-value">3.6 <small>nights</small></strong><span className="kpi-sub">+0.4 nights</span></article>
        <article className="kpi-card"><div className="kpi-label">Pickup (7d)</div><strong className="kpi-value">+42</strong><span className="kpi-sub">rooms booked</span></article>
        <article className="kpi-card revenue-kpi"><div className="kpi-label">Revenue Forecast</div><strong className="kpi-value">LKR 2.84M</strong><span className="kpi-sub">next 7 days</span></article>
      </div>
      <article className="panel">
        <div className="panel-head"><div><h2>Dynamic Pricing</h2><p>AI-suggested rates by room type</p></div></div>
        <div className="table-wrap">
          <table className="dyn-pricing-table">
            <thead>
              <tr><th>Room Type</th><th>Current Rate</th><th>Base Rate</th><th>Weekend Rate</th><th>Peak Rate</th><th>Occupancy</th><th>Suggested Rate</th><th>Variance</th><th>Reason</th></tr>
            </thead>
            <tbody>
              {DYNAMIC_PRICING.map((p) => {
                const variance = p.suggested - p.current;
                return (
                  <tr key={p.type}>
                    <td><strong>{p.type}</strong></td>
                    <td>{fmtLKR(p.current)}</td>
                    <td>{fmtLKR(p.base)}</td>
                    <td>{fmtLKR(p.weekend)}</td>
                    <td>{fmtLKR(p.peak)}</td>
                    <td><b>{p.occ}%</b></td>
                    <td className="suggested">{fmtLKR(p.suggested)} ✦</td>
                    <td className={variance >= 0 ? "variance-up" : ""}>{variance >= 0 ? "+" : ""}{fmtLKR(variance)}</td>
                    <td className="reason">{p.reason}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
      <div className="section-grid two-col">
        <article className="panel chart-panel">
          <div className="panel-head">
            <div><h2>Revenue Analytics</h2><p>Room · Restaurant · Events · Other</p></div>
            <div className="segmented"><button className="active">Line</button><button>Bar</button><button>Donut</button></div>
          </div>
          <div className="chart-legend"><span><i className="dot blue"></i> Gross</span><span><i className="dot green"></i> Net</span><span><i className="dot amber"></i> Taxes</span></div>
          <div className="line-chart">
            <div className="y-labels"><span>3M</span><span>2.25M</span><span>1.5M</span><span>0.75M</span><span>0</span></div>
            <div className="chart-area">
              <div className="gridline g1"></div><div className="gridline g2"></div><div className="gridline g3"></div><div className="gridline g4"></div><div className="gridline g5"></div>
              <svg viewBox="0 0 700 230" preserveAspectRatio="none" className="chart-svg">
                <path d="M0,180 C60,170 120,140 180,145 S300,110 360,120 S480,80 540,90 S660,55 700,60 L700,230 L0,230 Z" fill="url(#area)" />
                <path d="M0,180 C60,170 120,140 180,145 S300,110 360,120 S480,80 540,90 S660,55 700,60" fill="none" stroke="#20a35e" strokeWidth="3" />
                <path d="M0,205 C60,200 120,195 180,190 S300,175 360,178 S480,160 540,165 S660,148 700,150" fill="none" stroke="#f2ad2f" strokeWidth="2.5" strokeDasharray="4 4" />
              </svg>
              <div className="x-labels"><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div>
            </div>
          </div>
        </article>
        <article className="panel">
          <div className="panel-head"><div><h2>Forecast — Next 14 Days</h2></div></div>
          <div className="forecast-list">
            {FORECAST_14D.map((f) => (
              <div className="forecast-row" key={f.date}>
                <b>{f.date}</b>
                <span>{f.occ}% occ.</span>
                <div className="fr-bar"><i style={{ width: `${f.occ}%` }}></i></div>
                <span>{fmtLKR(f.rev)}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

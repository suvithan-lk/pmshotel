"use client";

import { useApp } from "../../lib/AppContext";
import { REPORTS } from "../../lib/data";

export default function ReportsView({ active }: { active: boolean }) {
  const { toast } = useApp();

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">REPORTS</div>
          <h1>Reports Center</h1>
          <p>Generate, filter and export operational reports</p>
        </div>
      </div>
      <div className="report-grid-full">
        {REPORTS.map((r) => (
          <article className="report-card-full" key={r.name} onClick={() => toast(`Generating "${r.name}" — export ready shortly.`)}>
            <div className="rcf-icon">{r.icon}</div>
            <h3>{r.name}</h3>
            <p>{r.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

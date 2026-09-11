"use client";

import { useApp } from "../../lib/AppContext";
import { useData } from "../../lib/DataContext";
import { ALERTS } from "../../lib/data";

export default function AlertCenterView({ active }: { active: boolean }) {
  const { openConflict, toast } = useApp();
  const { triggerConflictDemo } = useData();

  async function handleAction(a: (typeof ALERTS)[number]) {
    if (a.conflict) {
      const info = await triggerConflictDemo();
      if (info) openConflict(info);
      else toast("No conflict found — Room 205's demo booking may already be cancelled.");
      return;
    }
    toast(`${a.action} action opened.`);
  }

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">OPERATIONS</div>
          <h1>Attention Required</h1>
          <p>Operational issues that need immediate action</p>
        </div>
      </div>
      <div className="full-alerts">
        {ALERTS.map((a) => (
          <article className="panel" key={a.title}>
            <div className={`alert-item ${a.severity}`}>
              <div className="alert-icon">{a.icon}</div>
              <div><strong>{a.title}</strong><p>{a.desc}</p><small>{a.time}</small></div>
              <button onClick={() => handleAction(a)}>{a.action}</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

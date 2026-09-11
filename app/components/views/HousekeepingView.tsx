"use client";

import { useState } from "react";
import { useApp } from "../../lib/AppContext";

interface HkCard {
  room: string;
  note: string;
  staff: string;
  tag?: "priority" | "vip";
}
interface HkStage {
  key: string;
  label: string;
  items: HkCard[];
}

const INITIAL_STAGES: HkStage[] = [
  { key: "dirty", label: "Dirty", items: [
      { room: "206", note: "Checkout 11:00 AM", staff: "Unassigned" },
      { room: "305", note: "Late checkout — 1:00 PM", staff: "Unassigned", tag: "priority" },
    ] },
  { key: "cleaning", label: "Cleaning", items: [
      { room: "106", note: "Started 10:20 AM", staff: "Kanchana Wijesinghe" },
      { room: "210", note: "Started 10:05 AM", staff: "Nimal Perera" },
    ] },
  { key: "clean", label: "Clean", items: [{ room: "108", note: "Awaiting inspection", staff: "Kanchana Wijesinghe" }] },
  { key: "inspected", label: "Inspected", items: [
      { room: "203", note: "Passed inspection", staff: "Head Housekeeper" },
      { room: "303", note: "Passed inspection", staff: "Head Housekeeper" },
    ] },
  { key: "available", label: "Available", items: [
      { room: "102", note: "Ready to sell", staff: "—" },
      { room: "308", note: "Ready to sell — VIP prepped", staff: "—", tag: "vip" },
    ] },
];

export default function HousekeepingView({ active }: { active: boolean }) {
  const { toast } = useApp();
  const [stages, setStages] = useState<HkStage[]>(INITIAL_STAGES);
  const [dragging, setDragging] = useState<{ stageKey: string; room: string } | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  function handleDrop(targetKey: string) {
    setDragOverStage(null);
    if (!dragging) return;
    if (dragging.stageKey === targetKey) return;
    setStages((prev) => {
      const source = prev.find((s) => s.key === dragging.stageKey);
      const card = source?.items.find((c) => c.room === dragging.room);
      if (!card) return prev;
      return prev.map((s) => {
        if (s.key === dragging.stageKey) return { ...s, items: s.items.filter((c) => c.room !== dragging.room) };
        if (s.key === targetKey) return { ...s, items: [...s.items, card] };
        return s;
      });
    });
    const targetLabel = stages.find((s) => s.key === targetKey)?.label;
    toast(`Room ${dragging.room} moved to ${targetLabel}.`);
    setDragging(null);
  }

  const toClean = stages.find((s) => s.key === "dirty")?.items.length ?? 0;
  const cleaning = stages.find((s) => s.key === "cleaning")?.items.length ?? 0;
  const inspected = stages.find((s) => s.key === "inspected")?.items.length ?? 0;
  const priority = stages.reduce((n, s) => n + s.items.filter((c) => c.tag === "priority").length, 0);
  const vip = stages.reduce((n, s) => n + s.items.filter((c) => c.tag === "vip").length, 0);

  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">ROOMS</div>
          <h1>Housekeeping Command Center</h1>
          <p>Live cleaning workflow · drag cards between stages</p>
        </div>
        <div className="head-actions">
          <button className="btn btn-secondary" onClick={() => toast("Staff roster opened.")}>Staff Roster</button>
          <button className="btn btn-primary" onClick={() => toast("Task assignment workflow opened.")}>＋ Assign Task</button>
        </div>
      </div>
      <div className="hk-kpis">
        <div className="hk-kpi"><strong>{String(toClean).padStart(2, "0")}</strong><span>Rooms to Clean</span></div>
        <div className="hk-kpi"><strong>{String(cleaning).padStart(2, "0")}</strong><span>Cleaning</span></div>
        <div className="hk-kpi"><strong>{String(inspected).padStart(2, "0")}</strong><span>Inspected</span></div>
        <div className="hk-kpi"><strong>18</strong><span>Ready</span></div>
        <div className="hk-kpi warn"><strong>{String(priority).padStart(2, "0")}</strong><span>Priority</span></div>
        <div className="hk-kpi vip"><strong>{String(vip).padStart(2, "0")}</strong><span>VIP</span></div>
      </div>
      <div className="kanban">
        {stages.map((stage) => (
          <div
            key={stage.key}
            className={`kanban-col${dragOverStage === stage.key ? " drag-over" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverStage(stage.key);
            }}
            onDragLeave={() => setDragOverStage((s) => (s === stage.key ? null : s))}
            onDrop={() => handleDrop(stage.key)}
          >
            <div className="kanban-col-head">{stage.label}<span>{stage.items.length}</span></div>
            {stage.items.map((card) => (
              <div
                key={card.room}
                className="kanban-card"
                draggable
                onDragStart={() => setDragging({ stageKey: stage.key, room: card.room })}
                onDragEnd={() => setDragging(null)}
                onClick={() => toast(`Room ${card.room} housekeeping detail opened.`)}
              >
                <b>Room {card.room}</b>
                <span>{card.note}</span>
                <div className="kc-staff">👤 {card.staff}</div>
                {card.tag && <span className={`kc-tag ${card.tag}`}>{card.tag === "vip" ? "VIP" : "Priority"}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

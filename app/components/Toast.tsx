"use client";

import { useApp } from "../lib/AppContext";

export default function Toast() {
  const { toastMsg, toastShow } = useApp();
  return (
    <div className={`toast${toastShow ? " show" : ""}`}>
      <span>✓</span>
      <div>
        <strong>Success</strong>
        <p>{toastMsg}</p>
      </div>
    </div>
  );
}

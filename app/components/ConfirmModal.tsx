"use client";

import { useApp } from "../lib/AppContext";

export default function ConfirmModal() {
  const { confirmState, closeConfirm } = useApp();
  const open = confirmState !== null;

  return (
    <div className={`modal-overlay${open ? " show" : ""}`} onClick={(e) => e.target === e.currentTarget && closeConfirm()}>
      <div className="modal confirm-modal">
        <div className="modal-head">
          <div>
            <h2>{confirmState?.title || ""}</h2>
          </div>
          <button className="icon-btn" onClick={closeConfirm}>×</button>
        </div>
        <div className="confirm-body">
          <p>{confirmState?.body || ""}</p>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={closeConfirm}>Keep Booking</button>
          <button
            className="btn btn-danger"
            onClick={() => {
              const cb = confirmState?.onConfirm;
              closeConfirm();
              cb?.();
            }}
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}

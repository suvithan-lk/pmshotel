"use client";

import { useApp } from "../lib/AppContext";
import { useData } from "../lib/DataContext";

export default function ConflictModal() {
  const { conflictInfo, closeConflict, openConfirm, toast } = useApp();
  const { cancelReservation } = useData();
  const open = conflictInfo !== null;

  return (
    <div
      className={`modal-overlay${open ? " show" : ""}`}
      onClick={(e) => e.target === e.currentTarget && closeConflict()}
    >
      <div className="modal conflict-modal">
        <div className="modal-head conflict-head">
          <div>
            <span className="eyebrow">⚠ DOUBLE BOOKING DETECTED</span>
            <h2>Room {conflictInfo?.roomNumber} conflict</h2>
          </div>
          <button className="icon-btn" onClick={closeConflict}>×</button>
        </div>
        {conflictInfo && (
          <>
            <div className="conflict-body">
              <div className="conflict-card">
                <span className="conflict-label">Existing Booking</span>
                <strong>{conflictInfo.existingGuest}</strong>
                <span>{conflictInfo.existingBookingCode} · {conflictInfo.existingRange}</span>
              </div>
              <div className="conflict-vs">VS</div>
              <div className="conflict-card new">
                <span className="conflict-label">Attempted Booking</span>
                <strong>{conflictInfo.attemptedGuest}</strong>
                <span>{conflictInfo.attemptedRange}</span>
              </div>
            </div>
            <div className="conflict-date">
              Room <b>{conflictInfo.roomNumber} · {conflictInfo.roomType}</b> is already reserved for the requested dates — the new booking was <b>not</b> created.
            </div>
            <div className="modal-actions conflict-actions">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  const bookingCode = conflictInfo.existingBookingCode;
                  closeConflict();
                  openConfirm(
                    "Cancel Existing Booking?",
                    `This will cancel ${bookingCode} (${conflictInfo.existingGuest}) and notify the guest. This action cannot be undone.`,
                    async () => {
                      await cancelReservation(bookingCode);
                      toast(`Booking ${bookingCode} cancelled — the room is now free.`);
                    }
                  );
                }}
              >
                Cancel Existing Booking
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  closeConflict();
                  toast("Override requires manager approval — request sent.");
                }}
              >
                Override
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  closeConflict();
                  toast("Try a different room or adjust the dates and create the reservation again.");
                }}
              >
                Change Room / Dates
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

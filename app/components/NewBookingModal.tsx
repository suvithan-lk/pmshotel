"use client";

import { useState } from "react";
import { useApp } from "../lib/AppContext";
import { useData } from "../lib/DataContext";

const ROOM_TYPES = ["Standard", "Deluxe King", "Deluxe Twin", "Suite", "Premium Suite", "Executive Suite"];
const SOURCES = ["Direct Website", "Booking.com", "Agoda", "Expedia", "Walk-in", "Corporate", "Travel Agent", "Phone", "Email"];

export default function NewBookingModal() {
  const { newBookingOpen, closeNewBooking, openConflict, toast } = useApp();
  const { createReservation } = useData();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    const result = await createReservation({
      guestName: String(data.get("guestName")),
      phone: String(data.get("phone")),
      arrival: String(data.get("arrival")),
      departure: String(data.get("departure")),
      roomTypeName: String(data.get("roomType")),
      source: String(data.get("source")),
      request: String(data.get("request") || ""),
    });
    setSubmitting(false);

    if (result.ok) {
      closeNewBooking();
      toast(`Reservation ${result.reservation.id} created — Room ${result.reservation.room}.`);
      form.reset();
    } else {
      closeNewBooking();
      openConflict(result.conflict);
    }
  }

  return (
    <div
      className={`modal-overlay${newBookingOpen ? " show" : ""}`}
      onClick={(e) => e.target === e.currentTarget && closeNewBooking()}
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            <span className="eyebrow">RESERVATION</span>
            <h2>Create New Booking</h2>
          </div>
          <button className="icon-btn" onClick={closeNewBooking}>×</button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <label>Guest name<input name="guestName" required placeholder="e.g. Anjali Fernando" /></label>
            <label>Phone<input name="phone" required placeholder="+94 77 123 4567" /></label>
            <label>Check-in<input name="arrival" type="date" defaultValue="2026-08-26" required /></label>
            <label>Check-out<input name="departure" type="date" defaultValue="2026-08-29" required /></label>
            <label>
              Room type
              <select name="roomType" defaultValue="Deluxe King">
                {ROOM_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Booking source
              <select name="source" defaultValue="Direct Website">
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Special requests
            <textarea name="request" placeholder="Airport pickup, high floor, dietary preferences..."></textarea>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={closeNewBooking}>Cancel</button>
            <button className="btn btn-primary" disabled={submitting}>{submitting ? "Creating…" : "Create Reservation"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

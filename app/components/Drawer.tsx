"use client";

import { useState } from "react";
import { useApp } from "../lib/AppContext";
import { useData } from "../lib/DataContext";
import { createCheckoutSession } from "../lib/actions/payments";
import { fmtLKR, STATUS_META } from "../lib/format";
import type { Reservation, Room } from "../lib/types";

export default function Drawer() {
  const { drawerMode, drawerId, closeDrawer, toast } = useApp();
  const { reservations, rooms, checkIn, checkOut, updateRoomStatus } = useData();
  const [payingBookingId, setPayingBookingId] = useState<string | null>(null);
  const open = drawerMode !== null;

  const reservation = drawerMode === "booking" ? reservations.find((r) => r.id === drawerId) : undefined;
  const room = drawerMode === "room" ? rooms.find((r) => r.no === drawerId) : undefined;

  function act(message: string, close = false) {
    toast(message);
    if (close) closeDrawer();
  }

  async function payNow() {
    if (!reservation) return;
    setPayingBookingId(reservation.id);
    const result = await createCheckoutSession(reservation.id, window.location.origin);
    setPayingBookingId(null);
    if (result.ok && result.url) {
      window.location.href = result.url;
    } else {
      toast(result.error || "Could not start checkout — is STRIPE_SECRET_KEY set?");
    }
  }

  async function toggleStay() {
    if (!reservation) return;
    if (reservation.status === "checkedin") {
      await checkOut(reservation.id);
      toast(`${reservation.guest} checked out — room marked dirty for housekeeping.`);
    } else {
      await checkIn(reservation.id);
      toast(`${reservation.guest} checked in — room marked occupied.`);
    }
    closeDrawer();
  }

  return (
    <>
      <div className={`drawer-overlay${open ? " show" : ""}`} onClick={closeDrawer}></div>
      <aside className={`booking-drawer${open ? " open" : ""}`}>
        {reservation && (
          <>
            <div className="drawer-head">
              <div>
                <span className="eyebrow">RESERVATION DETAILS</span>
                <h2>{reservation.guest}{reservation.vip ? " ✦" : ""}</h2>
                <span>{reservation.id}</span>
              </div>
              <button className="icon-btn" onClick={closeDrawer}>×</button>
            </div>
            <div className="drawer-body">
              <BookingBody reservation={reservation} />
            </div>
            <div className="drawer-actions">
              <button className="btn btn-secondary" onClick={() => act("Reservation modification opened.")}>Modify</button>
              <button className="btn btn-secondary" onClick={payNow} disabled={payingBookingId === reservation.id}>
                {payingBookingId === reservation.id ? "Redirecting…" : "Add Payment"}
              </button>
              <button className="btn btn-secondary" onClick={() => act("Invoice sent to printer.")}>Print Invoice</button>
              <button className="btn btn-primary" onClick={toggleStay}>
                {reservation.status === "checkedin" ? "Check-out" : "Check-in"}
              </button>
            </div>
          </>
        )}
        {room && (
          <>
            <div className="drawer-head">
              <div>
                <span className="eyebrow">ROOM DETAILS</span>
                <h2>Room {room.no}</h2>
                <span>{room.type} · Floor {room.floor}</span>
              </div>
              <button className="icon-btn" onClick={closeDrawer}>×</button>
            </div>
            <div className="drawer-body">
              <RoomBody room={room} reservations={reservations} />
            </div>
            <div className="drawer-actions">
              <button className="btn btn-secondary" onClick={() => act("Assign guest workflow opened.")}>Assign Guest</button>
              <button className="btn btn-secondary" onClick={async () => { await updateRoomStatus(room.no, "maintenance"); act(`Room ${room.no} blocked for maintenance review.`, true); }}>Block Room</button>
              <button className="btn btn-secondary" onClick={async () => { await updateRoomStatus(room.no, "available"); act(`Room ${room.no} marked clean and available.`, true); }}>Mark Clean</button>
              <button className="btn btn-primary" onClick={async () => { await updateRoomStatus(room.no, "maintenance"); act(`Maintenance ticket created for room ${room.no}.`, true); }}>Send to Maintenance</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function BookingBody({ reservation: res }: { reservation: Reservation }) {
  const roomRate = res.rate * res.nights;
  const tax = Math.round(roomRate * 0.15);
  const total = roomRate + tax;
  const meta = STATUS_META[res.status] || STATUS_META.confirmed;
  return (
    <>
      <div className="drawer-profile">
        <div className={`avatar avatar-${res.color}`}>{res.initials}</div>
        <div>
          <strong>{res.source}</strong>
          <span>{meta.label} reservation</span>
        </div>
        <span className={`pill ${res.payment === "paid" ? "paid" : res.payment === "refunded" ? "cancelled" : "pending"}`}>
          {res.payment === "paid" ? "Paid" : res.payment === "refunded" ? "Refunded" : "Pending"}
        </span>
      </div>
      <div className="drawer-section">
        <h4>Stay Details</h4>
        <div className="detail-grid">
          <div><span>Room</span><strong>{res.room} · {res.roomType}</strong></div>
          <div><span>Guests</span><strong>{res.guests} guest{res.guests > 1 ? "s" : ""}</strong></div>
          <div><span>Check-in</span><strong>{res.arrival} · 2:00 PM</strong></div>
          <div><span>Check-out</span><strong>{res.departure} · 11:00 AM</strong></div>
        </div>
      </div>
      <div className="drawer-section">
        <h4>Rate Breakdown</h4>
        <div className="price-line"><span>Room · {res.nights} night{res.nights > 1 ? "s" : ""}</span><b>{fmtLKR(roomRate)}</b></div>
        <div className="price-line"><span>Taxes &amp; service charge</span><b>{fmtLKR(tax)}</b></div>
        <div className="price-line total"><span>Total</span><b>{fmtLKR(total)}</b></div>
      </div>
      <div className="drawer-section">
        <h4>Special Requests</h4>
        <div className="request-box">{res.request}</div>
      </div>
      <div className="drawer-section">
        <h4>Internal Notes</h4>
        <div className="request-box">
          {res.vip
            ? "VIP guest — ensure amenities and welcome note prepared before arrival."
            : "No special handling required. Standard welcome amenities."}
        </div>
      </div>
      <div className="drawer-section">
        <h4>Booking Timeline</h4>
        <div className="timeline">
          <div><i></i><p><strong>Reservation created</strong><small>via {res.source}</small></p></div>
          <div><i></i><p><strong>Payment {res.payment === "paid" ? "received" : res.payment === "refunded" ? "refunded" : "pending"}</strong><small>{fmtLKR(total)}</small></p></div>
          <div><i></i><p><strong>Room {res.room} assigned</strong><small>{res.roomType}</small></p></div>
        </div>
      </div>
    </>
  );
}

function RoomBody({ room, reservations }: { room: Room; reservations: Reservation[] }) {
  const nextBooking = reservations.find((r) => r.room === room.no && (r.status === "confirmed" || r.status === "pending"));
  return (
    <>
      <div className="drawer-profile">
        <div className="avatar">{room.no}</div>
        <div>
          <strong>{room.type}</strong>
          <span>Floor {room.floor} · {room.bed} bed</span>
        </div>
        <span className={`rcf-status ${room.status}`}>{room.status}</span>
      </div>
      <div className="drawer-section">
        <h4>Room Details</h4>
        <div className="detail-grid">
          <div><span>Max occupancy</span><strong>{room.occ} guests</strong></div>
          <div><span>Current rate</span><strong>{fmtLKR(room.rate)}</strong></div>
          <div><span>Bed type</span><strong>{room.bed}</strong></div>
          <div><span>Floor</span><strong>{room.floor}</strong></div>
        </div>
      </div>
      <div className="drawer-section">
        <h4>Current Guest</h4>
        <div className="request-box">{room.guest ? `${room.guest} · checking out ${room.out || "—"}` : "Room currently unoccupied."}</div>
      </div>
      <div className="drawer-section">
        <h4>Next Booking</h4>
        <div className="request-box">
          {nextBooking ? `${nextBooking.guest} · ${nextBooking.arrival} – ${nextBooking.departure} · ${nextBooking.id}` : "No upcoming reservation on file."}
        </div>
      </div>
      <div className="drawer-section">
        <h4>Housekeeping</h4>
        <div className="request-box">{room.hk || "No housekeeping activity logged."}</div>
      </div>
      <div className="drawer-section">
        <h4>Maintenance</h4>
        <div className="request-box">{room.issue || "No open maintenance tickets for this room."}</div>
      </div>
      <div className="drawer-section">
        <h4>Room History</h4>
        <div className="timeline">
          <div><i></i><p><strong>Housekeeping status updated</strong><small>{room.hk || "Inspected"}</small></p></div>
          <div><i></i><p><strong>Rate reviewed</strong><small>{fmtLKR(room.rate)} per night</small></p></div>
          <div><i></i><p><strong>Room type confirmed</strong><small>{room.type} · sleeps {room.occ}</small></p></div>
        </div>
      </div>
    </>
  );
}

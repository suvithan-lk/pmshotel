export interface Room {
  no: string;
  type: string;
  floor: number;
  bed: string;
  occ: number;
  rate: number;
  status: "available" | "occupied" | "maintenance" | "cleaning" | "dirty";
  guest?: string;
  hk?: string;
  out?: string;
  vip?: boolean;
  issue?: string;
}

export interface Reservation {
  id: string;
  guest: string;
  initials: string;
  color: string;
  room: string;
  roomType: string;
  arrival: string;
  departure: string;
  /** ISO date ("2026-08-26") — for calendar column math; arrival/departure above stay display-formatted. */
  arrivalISO: string;
  departureISO: string;
  nights: number;
  guests: number;
  source: string;
  rate: number;
  total: number;
  payment: "paid" | "pending" | "refunded";
  status: "confirmed" | "pending" | "checkedin" | "checkedout" | "cancelled" | "noshow";
  vip?: boolean;
  phone: string;
  request: string;
  country: string;
}

export interface Channel {
  key: string;
  name: string;
  logo: string;
  cls: string;
  status: "connected" | "warning";
  lastSync: string;
  inventory: number;
  bookings: number;
  rateSync: string;
  invSync: string;
}

export interface MaintenanceTicket {
  id: string;
  room: string;
  issue: string;
  priority: "low" | "medium" | "high" | "critical";
  staff: string;
  created: string;
  sla: string;
  status: "open" | "assigned" | "inprogress" | "waiting" | "resolved";
}

export interface Guest {
  name: string;
  initials: string;
  color: string;
  country: string;
  stays: number;
  ltv: number;
  last: string;
  room: string;
  status: "vip" | "returning" | "corporate" | "new";
}

export interface StaffUser {
  name: string;
  email: string;
  role: string;
  dept: string;
  status: "active" | "inactive";
  last: string;
}

export interface RolePermission {
  role: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  del: boolean;
  exp: boolean;
  approve: boolean;
}

export interface AuditEntry {
  time: string;
  user: string;
  role: string;
  action: string;
  module: string;
  entity: string;
  old: string;
  new: string;
  ip: string;
  status: "success" | "failed";
}

export interface NotificationItem {
  cat: "bookings" | "payments" | "channels" | "rooms" | "system" | "maintenance";
  title: string;
  desc: string;
  time: string;
  unread: boolean;
}

export interface Promotion {
  name: string;
  tag: string;
  validity: string;
  rooms: string;
  bookings: number;
  revenue: number;
  status: "active" | "scheduled" | "paused";
}

export interface ReportDef {
  name: string;
  icon: string;
  desc: string;
}

export interface DynamicPricingRow {
  type: string;
  current: number;
  base: number;
  weekend: number;
  peak: number;
  occ: number;
  suggested: number;
  reason: string;
}

export interface ForecastDay {
  date: string;
  occ: number;
  adr: number;
  rev: number;
}

export interface SyncLogEntry {
  color: string;
  text: string;
  time: string;
}

export interface FinPayment {
  date: string;
  guest: string;
  booking: string;
  method: string;
  amount: number;
  status: "paid" | "pending";
}

export interface FinInvoice {
  no: string;
  guest: string;
  booking: string;
  issued: string;
  amount: number;
  status: "paid" | "unpaid" | "refunded";
}

export interface FinRefund {
  no: string;
  guest: string;
  booking: string;
  reason: string;
  amount: number;
  status: "completed" | "processing";
}

export interface FinOutstanding {
  guest: string;
  room: string;
  booking: string;
  due: string;
  balance: number;
}

export interface DailyRevenueDay {
  day: string;
  value: number;
}

export interface AlertItem {
  severity: "critical" | "warning" | "info" | "vip";
  icon: string;
  title: string;
  desc: string;
  time: string;
  action: string;
  conflict?: boolean;
}

export interface CalendarBooking {
  id: string;
  guest: string;
  source: string;
  start: number;
  end: number;
  status: string;
  conflict?: boolean;
}

export interface CalendarRoomEntry {
  room: string;
  bookings?: CalendarBooking[];
  maintenance?: boolean;
  note?: string;
  cleaning?: boolean;
  dirty?: boolean;
}

export type DrawerMode = "booking" | "room" | null;

export interface ConfirmState {
  title: string;
  body: string;
  onConfirm: () => void;
}

/** Populated from a real overlap check in createReservation — not a hardcoded demo pair. */
export interface ConflictInfo {
  roomNumber: string;
  roomType: string;
  existingGuest: string;
  existingBookingCode: string;
  existingRange: string;
  attemptedGuest: string;
  attemptedRange: string;
}

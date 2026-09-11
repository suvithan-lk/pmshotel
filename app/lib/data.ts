import type {
  AlertItem,
  AuditEntry,
  Channel,
  DailyRevenueDay,
  DynamicPricingRow,
  FinInvoice,
  FinOutstanding,
  FinPayment,
  FinRefund,
  ForecastDay,
  MaintenanceTicket,
  NotificationItem,
  Promotion,
  ReportDef,
  RolePermission,
  StaffUser,
  SyncLogEntry,
} from "./types";

export const HOTEL = {
  name: "Grand Azure Colombo",
  category: "5-Star Luxury Hotel",
  totalRooms: 100,
  currency: "LKR",
  today: "26 Aug 2026",
};

export const CHANNELS: Channel[] = [
  { key: "booking", name: "Booking.com", logo: "B.", cls: "booking", status: "connected", lastSync: "2 minutes ago", inventory: 98, bookings: 12, rateSync: "Healthy", invSync: "Healthy" },
  { key: "agoda", name: "Agoda", logo: "a", cls: "agoda", status: "connected", lastSync: "4 minutes ago", inventory: 96, bookings: 7, rateSync: "Healthy", invSync: "Healthy" },
  { key: "expedia", name: "Expedia", logo: "E", cls: "expedia", status: "warning", lastSync: "18 minutes ago", inventory: 94, bookings: 4, rateSync: "Mismatch", invSync: "Warning" },
  { key: "direct", name: "Direct Website", logo: "GA", cls: "direct", status: "connected", lastSync: "1 minute ago", inventory: 100, bookings: 9, rateSync: "Healthy", invSync: "Healthy" },
];

export const MAINTENANCE: MaintenanceTicket[] = [
  { id: "MT-1042", room: "104", issue: "Air conditioning unit not cooling", priority: "high", staff: "Sunil Bandara", created: "25 Aug · 9:10 AM", sla: "Overdue by 2h", status: "inprogress" },
  { id: "MT-1043", room: "204", issue: "Air conditioning fault — compressor noise", priority: "critical", staff: "Sunil Bandara", created: "26 Aug · 7:40 AM", sla: "Due in 40 min", status: "assigned" },
  { id: "MT-1039", room: "117", issue: "Power outlet not working near desk", priority: "medium", staff: "Electrical Team", created: "24 Aug · 2:15 PM", sla: "Due in 5h", status: "open" },
  { id: "MT-1031", room: "Restaurant", issue: "Water heater inspection overdue", priority: "low", staff: "Unassigned", created: "22 Aug · 11:00 AM", sla: "Due in 2d", status: "open" },
  { id: "MT-1028", room: "210", issue: "Bathroom tap leaking", priority: "medium", staff: "Nimal Perera", created: "21 Aug · 4:30 PM", sla: "Met", status: "resolved" },
  { id: "MT-1020", room: "312", issue: "TV remote unresponsive", priority: "low", staff: "Chathura Silva", created: "20 Aug · 10:00 AM", sla: "Met", status: "resolved" },
  { id: "MT-1045", room: "205", issue: "Curtain rail detached", priority: "medium", staff: "Unassigned", created: "26 Aug · 8:05 AM", sla: "Due in 6h", status: "open" },
  { id: "MT-1035", room: "Lobby", issue: "Main door sensor delayed response", priority: "high", staff: "Facilities Team", created: "23 Aug · 6:20 PM", sla: "Waiting on part", status: "waiting" },
  { id: "MT-1018", room: "306", issue: "Minibar not cooling", priority: "low", staff: "Nimal Perera", created: "19 Aug · 9:00 AM", sla: "Met", status: "resolved" },
  { id: "MT-1046", room: "108", issue: "Smoke detector beeping — battery", priority: "high", staff: "Sunil Bandara", created: "26 Aug · 6:50 AM", sla: "Due in 20 min", status: "assigned" },
];
export const USERS: StaffUser[] = [
  { name: "Suvithan Admin", email: "suvithan.lk@gmail.com", role: "Super Admin", dept: "Management", status: "active", last: "Today · 9:02 AM" },
  { name: "Priyanka Jayawardena", email: "priyanka.j@grandazure.lk", role: "Hotel Manager", dept: "Management", status: "active", last: "Today · 8:40 AM" },
  { name: "Ruwan Dissanayake", email: "ruwan.d@grandazure.lk", role: "Reservation Manager", dept: "Reservations", status: "active", last: "Today · 8:55 AM" },
  { name: "Nadeesha Perera", email: "nadeesha.p@grandazure.lk", role: "Receptionist", dept: "Front Office", status: "active", last: "Today · 9:10 AM" },
  { name: "Sunil Bandara", email: "sunil.b@grandazure.lk", role: "Maintenance Staff", dept: "Maintenance", status: "active", last: "Today · 7:30 AM" },
  { name: "Kanchana Wijesinghe", email: "kanchana.w@grandazure.lk", role: "Housekeeping Staff", dept: "Housekeeping", status: "active", last: "Today · 7:15 AM" },
  { name: "Dinesh Rajapaksa", email: "dinesh.r@grandazure.lk", role: "Accountant", dept: "Finance", status: "active", last: "Yesterday · 6:20 PM" },
  { name: "Ishara Gunasekara", email: "ishara.g@grandazure.lk", role: "Revenue Manager", dept: "Revenue", status: "inactive", last: "3 days ago" },
];

export const ROLES_PERMISSIONS: RolePermission[] = [
  { role: "Super Admin", view: true, create: true, edit: true, del: true, exp: true, approve: true },
  { role: "Hotel Manager", view: true, create: true, edit: true, del: true, exp: true, approve: true },
  { role: "Reservation Manager", view: true, create: true, edit: true, del: false, exp: true, approve: true },
  { role: "Receptionist", view: true, create: true, edit: true, del: false, exp: false, approve: false },
  { role: "Housekeeping Staff", view: true, create: false, edit: true, del: false, exp: false, approve: false },
  { role: "Maintenance Staff", view: true, create: false, edit: true, del: false, exp: false, approve: false },
  { role: "Accountant", view: true, create: true, edit: false, del: false, exp: true, approve: false },
  { role: "Revenue Manager", view: true, create: true, edit: true, del: false, exp: true, approve: true },
];

export const AUDIT_LOG: AuditEntry[] = [
  { time: "26 Aug · 10:42 AM", user: "Suvithan Admin", role: "Super Admin", action: "Room Assignment", module: "Reservations", entity: "BK-2026-00421", old: "101", new: "205", ip: "10.0.4.21", status: "success" },
  { time: "26 Aug · 10:38 AM", user: "Nadeesha Perera", role: "Receptionist", action: "Check-in", module: "Front Office", entity: "Kumar Perera", old: "Confirmed", new: "Checked-in", ip: "10.0.4.09", status: "success" },
  { time: "26 Aug · 10:25 AM", user: "Ishara Gunasekara", role: "Revenue Manager", action: "Rate Update", module: "Revenue", entity: "Suite", old: "LKR 48,000", new: "LKR 51,000", ip: "10.0.4.33", status: "success" },
  { time: "26 Aug · 10:17 AM", user: "System", role: "Channel Manager", action: "Inventory Sync", module: "Channels", entity: "Agoda", old: "95 rooms", new: "96 rooms", ip: "system", status: "success" },
  { time: "26 Aug · 9:55 AM", user: "Ruwan Dissanayake", role: "Reservation Manager", action: "Booking Modified", module: "Reservations", entity: "BK-2026-00447", old: "5 nights", new: "6 nights", ip: "10.0.4.14", status: "success" },
  { time: "26 Aug · 9:40 AM", user: "Dinesh Rajapaksa", role: "Accountant", action: "Refund Issued", module: "Finance", entity: "BK-2026-00399", old: "Paid LKR 79,200", new: "Refunded LKR 79,200", ip: "10.0.4.51", status: "success" },
  { time: "26 Aug · 9:12 AM", user: "Sunil Bandara", role: "Maintenance Staff", action: "Ticket Updated", module: "Maintenance", entity: "MT-1042", old: "Open", new: "In Progress", ip: "10.0.4.62", status: "success" },
  { time: "26 Aug · 8:58 AM", user: "Kanchana Wijesinghe", role: "Housekeeping Staff", action: "Room Status", module: "Housekeeping", entity: "Room 106", old: "Dirty", new: "Cleaning", ip: "10.0.4.44", status: "success" },
  { time: "26 Aug · 8:30 AM", user: "System", role: "Channel Manager", action: "Rate Sync Failed", module: "Channels", entity: "Expedia", old: "LKR 42,000", new: "LKR 39,000", ip: "system", status: "failed" },
  { time: "25 Aug · 6:15 PM", user: "Priyanka Jayawardena", role: "Hotel Manager", action: "Promotion Created", module: "Revenue", entity: "Weekend Escape", old: "—", new: "10% OFF", ip: "10.0.4.05", status: "success" },
  { time: "25 Aug · 4:12 PM", user: "Ruwan Dissanayake", role: "Reservation Manager", action: "Reservation Created", module: "Reservations", entity: "BK-2026-00421", old: "—", new: "Confirmed", ip: "10.0.4.14", status: "success" },
  { time: "25 Aug · 2:40 PM", user: "Nadeesha Perera", role: "Receptionist", action: "Guest Check-out", module: "Front Office", entity: "Emma Wilson", old: "Occupied", new: "Checked-out", ip: "10.0.4.09", status: "success" },
  { time: "24 Aug · 11:20 AM", user: "Suvithan Admin", role: "Super Admin", action: "User Role Changed", module: "Administration", entity: "Ishara Gunasekara", old: "Receptionist", new: "Revenue Manager", ip: "10.0.4.21", status: "success" },
  { time: "24 Aug · 10:05 AM", user: "System", role: "System", action: "Failed Login Attempt", module: "Security", entity: "unknown@mail.com", old: "—", new: "Blocked", ip: "203.94.81.12", status: "failed" },
];

export const NOTIFICATIONS: NotificationItem[] = [
  { cat: "bookings", title: "New reservation received", desc: "BK-2026-00470 · Dilani Gunawardena · Premium Suite", time: "5 min ago", unread: true },
  { cat: "payments", title: "Payment received", desc: "LKR 84,000 · BK-2026-00430 via Visa", time: "18 min ago", unread: true },
  { cat: "channels", title: "Booking.com sync completed", desc: "98 rooms synchronized successfully", time: "22 min ago", unread: true },
  { cat: "rooms", title: "Room 106 marked clean", desc: "Housekeeping · Kanchana Wijesinghe", time: "30 min ago", unread: false },
  { cat: "system", title: "Nightly backup completed", desc: "All property data backed up successfully", time: "1 hour ago", unread: false },
  { cat: "bookings", title: "Booking cancelled", desc: "BK-2026-00399 · Sarah Johnson · Refund issued", time: "2 hours ago", unread: true },
  { cat: "channels", title: "Expedia rate mismatch", desc: "Suite rate differs by LKR 3,000 from PMS", time: "2 hours ago", unread: true },
  { cat: "rooms", title: "Maintenance ticket opened", desc: "MT-1045 · Room 205 · Curtain rail detached", time: "3 hours ago", unread: false },
  { cat: "payments", title: "Refund processed", desc: "LKR 79,200 · BK-2026-00399", time: "4 hours ago", unread: false },
  { cat: "system", title: "New staff account created", desc: "Ishara Gunasekara added as Revenue Manager", time: "Yesterday", unread: false },
  { cat: "maintenance", title: "Critical maintenance SLA breach", desc: "MT-1042 · Room 104 · Overdue by 2 hours", time: "Yesterday", unread: true },
  { cat: "bookings", title: "VIP guest arriving soon", desc: "Rajiv Kumar · Suite 301 · Arriving in 30 min", time: "Yesterday", unread: false },
];

export const PROMOTIONS: Promotion[] = [
  { name: "Weekend Escape", tag: "10% OFF", validity: "1 Aug – 30 Sep 2026", rooms: "Deluxe King, Suite", bookings: 42, revenue: 1240000, status: "active" },
  { name: "Early Bird", tag: "15% OFF", validity: "1 Jun – 31 Dec 2026", rooms: "All room types", bookings: 68, revenue: 1980000, status: "active" },
  { name: "Long Stay Special", tag: "20% OFF", validity: "1 Jul – 31 Aug 2026", rooms: "Suite, Premium Suite", bookings: 19, revenue: 2110000, status: "active" },
  { name: "Festive Season", tag: "12% OFF", validity: "15 Dec 2026 – 5 Jan 2027", rooms: "All room types", bookings: 0, revenue: 0, status: "scheduled" },
  { name: "Corporate Rate", tag: "18% OFF", validity: "Ongoing", rooms: "Deluxe King, Suite", bookings: 31, revenue: 1425000, status: "active" },
  { name: "Honeymoon Package", tag: "8% OFF + upgrade", validity: "1 Jan – 30 Jun 2026", rooms: "Premium Suite, Executive Suite", bookings: 14, revenue: 980000, status: "paused" },
];

export const REPORTS: ReportDef[] = [
  { name: "Occupancy Report", icon: "▥", desc: "Daily & monthly occupancy trends" },
  { name: "ADR Report", icon: "◆", desc: "Average daily rate by room type" },
  { name: "RevPAR Report", icon: "↗", desc: "Revenue per available room" },
  { name: "Revenue Report", icon: "◉", desc: "Department-wise revenue breakdown" },
  { name: "Booking Sources", icon: "⇄", desc: "OTA vs direct channel performance" },
  { name: "Cancellation Report", icon: "⊘", desc: "Cancellation trends & reasons" },
  { name: "No-show Report", icon: "◌", desc: "No-show frequency by source" },
  { name: "Guest Analytics", icon: "◎", desc: "Guest demographics & loyalty" },
  { name: "Housekeeping Report", icon: "✦", desc: "Cleaning turnaround performance" },
  { name: "Maintenance Report", icon: "⚒", desc: "Ticket volume & SLA compliance" },
  { name: "Payments Report", icon: "▤", desc: "Transactions, refunds & methods" },
  { name: "Forecast Report", icon: "◔", desc: "14-day occupancy & revenue forecast" },
];

export const DYNAMIC_PRICING: DynamicPricingRow[] = [
  { type: "Standard", current: 16500, base: 15000, weekend: 18000, peak: 21000, occ: 68, suggested: 17500, reason: "Steady demand — minor uplift recommended." },
  { type: "Deluxe King", current: 25000, base: 23000, weekend: 28000, peak: 33000, occ: 87, suggested: 31000, reason: "Occupancy expected to reach 92% this weekend." },
  { type: "Deluxe Twin", current: 25000, base: 23000, weekend: 27000, peak: 32000, occ: 74, suggested: 26500, reason: "Family segment demand rising for the holidays." },
  { type: "Suite", current: 42000, base: 39000, weekend: 48000, peak: 56000, occ: 92, suggested: 51000, reason: "High pace vs. last year — raise before sellout." },
  { type: "Premium Suite", current: 58000, base: 54000, weekend: 65000, peak: 74000, occ: 76, suggested: 61000, reason: "Moderate demand — small increase supported." },
  { type: "Executive Suite", current: 68000, base: 63000, weekend: 76000, peak: 88000, occ: 81, suggested: 72500, reason: "VIP segment pacing ahead of forecast." },
];

export const FORECAST_14D: ForecastDay[] = [
  { date: "26 Aug", occ: 82, adr: 24500, rev: 2009000 },
  { date: "27 Aug", occ: 78, adr: 24200, rev: 1888000 },
  { date: "28 Aug", occ: 85, adr: 25100, rev: 2134000 },
  { date: "29 Aug", occ: 91, adr: 26800, rev: 2439000 },
  { date: "30 Aug", occ: 94, adr: 27500, rev: 2585000 },
  { date: "31 Aug", occ: 96, adr: 28200, rev: 2707000 },
  { date: "01 Sep", occ: 88, adr: 25900, rev: 2280000 },
  { date: "02 Sep", occ: 72, adr: 23800, rev: 1714000 },
  { date: "03 Sep", occ: 69, adr: 23500, rev: 1622000 },
  { date: "04 Sep", occ: 74, adr: 24000, rev: 1776000 },
  { date: "05 Sep", occ: 80, adr: 24600, rev: 1968000 },
  { date: "06 Sep", occ: 89, adr: 26200, rev: 2332000 },
  { date: "07 Sep", occ: 93, adr: 27100, rev: 2521000 },
  { date: "08 Sep", occ: 90, adr: 26500, rev: 2385000 },
];

export const SYNC_LOGS: SyncLogEntry[] = [
  { color: "green", text: "Booking.com inventory synchronized — 98 rooms", time: "2 min ago" },
  { color: "green", text: "Agoda booking imported — BK-2026-00462", time: "11 min ago" },
  { color: "amber", text: "Expedia rate mismatch detected — Suite LKR 3,000 variance", time: "18 min ago" },
  { color: "blue", text: "Direct Website availability pushed — 100 rooms", time: "24 min ago" },
  { color: "green", text: "Agoda inventory synchronized — 96 rooms", time: "31 min ago" },
  { color: "amber", text: "Expedia connection retried after timeout", time: "42 min ago" },
];

export const FIN_PAYMENTS: FinPayment[] = [
  { date: "26 Aug", guest: "Anjali Fernando", booking: "BK-2026-00430", method: "Visa •••• 4471", amount: 92400, status: "paid" },
  { date: "26 Aug", guest: "David Miller", booking: "BK-2026-00445", method: "PayHere", amount: 255200, status: "paid" },
  { date: "25 Aug", guest: "Kumar Perera", booking: "BK-2026-00421", method: "Mastercard •••• 8820", amount: 86250, status: "paid" },
  { date: "25 Aug", guest: "Priya Wickramasinghe", booking: "BK-2026-00450", method: "Bank Transfer", amount: 189200, status: "paid" },
  { date: "24 Aug", guest: "Rajiv Kumar", booking: "BK-2026-00438", method: "Cash", amount: 100000, status: "pending" },
  { date: "24 Aug", guest: "Sarah Miller", booking: "BK-2026-00447", method: "Visa •••• 2210", amount: 165000, status: "pending" },
];

export const FIN_INVOICES: FinInvoice[] = [
  { no: "INV-8821", guest: "Anjali Fernando", booking: "BK-2026-00430", issued: "26 Aug 2026", amount: 92400, status: "paid" },
  { no: "INV-8819", guest: "David Miller", booking: "BK-2026-00445", issued: "26 Aug 2026", amount: 255200, status: "paid" },
  { no: "INV-8812", guest: "Kumar Perera", booking: "BK-2026-00421", issued: "25 Aug 2026", amount: 86250, status: "paid" },
  { no: "INV-8808", guest: "Rajiv Kumar", booking: "BK-2026-00438", issued: "24 Aug 2026", amount: 255200, status: "unpaid" },
  { no: "INV-8795", guest: "Sarah Johnson", booking: "BK-2026-00399", issued: "18 Aug 2026", amount: 79200, status: "refunded" },
];

export const FIN_REFUNDS: FinRefund[] = [
  { no: "RF-2201", guest: "Sarah Johnson", booking: "BK-2026-00399", reason: "Trip cancellation", amount: 79200, status: "completed" },
  { no: "RF-2198", guest: "Arun Kumar", booking: "BK-2026-00405", reason: "No-show — partial refund policy", amount: 42570, status: "completed" },
  { no: "RF-2205", guest: "Ravi Menon", booking: "BK-2026-00456", reason: "Service issue adjustment", amount: 8500, status: "processing" },
];

export const FIN_OUTSTANDING: FinOutstanding[] = [
  { guest: "Rajiv Kumar", room: "301", booking: "BK-2026-00438", due: "27 Aug 2026", balance: 100000 },
  { guest: "Sarah Miller", room: "107", booking: "BK-2026-00447", due: "28 Aug 2026", balance: 45000 },
  { guest: "Ravi Menon", room: "208", booking: "BK-2026-00456", due: "27 Aug 2026", balance: 25200 },
  { guest: "Chaminda Rathnayake", room: "203", booking: "BK-2026-00466", due: "27 Aug 2026", balance: 14800 },
];

export const DAILY_REVENUE_7D: DailyRevenueDay[] = [
  { day: "Mon", value: 398000 }, { day: "Tue", value: 412000 }, { day: "Wed", value: 375000 },
  { day: "Thu", value: 441000 }, { day: "Fri", value: 468000 }, { day: "Sat", value: 452000 }, { day: "Sun", value: 485000 },
];

export const DAY_HEADS = ["26 WED", "27 THU", "28 FRI", "29 SAT", "30 SUN", "31 MON", "01 TUE"];

export const ALERTS: AlertItem[] = [
  { severity: "critical", icon: "!", title: "Potential double booking", desc: "Room 205 is fully booked through 31 Aug — attempting an overlapping stay will be blocked", time: "2 min ago", action: "Resolve", conflict: true },
  { severity: "warning", icon: "₨", title: "Payment pending", desc: "4 reservations · LKR 185,000 outstanding", time: "12 min ago", action: "Review" },
  { severity: "warning", icon: "⇄", title: "Channel sync warning", desc: "Expedia rate mismatch on Suite — LKR 3,000 variance", time: "18 min ago", action: "Sync" },
  { severity: "info", icon: "⚒", title: "Maintenance required", desc: "Room 204 · Air conditioning fault reported", time: "31 min ago", action: "View" },
  { severity: "info", icon: "◷", title: "Late checkouts", desc: "Rooms 107, 206, 305 pending inspection", time: "45 min ago", action: "View" },
  { severity: "vip", icon: "◇", title: "VIP arrival soon", desc: "Rajiv Kumar · Suite 301 · Arriving in 30 minutes", time: "Arriving 12:15 PM", action: "Prepare" },
];

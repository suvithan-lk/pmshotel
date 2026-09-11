export function fmtLKR(n: number): string {
  return "LKR " + Math.round(n).toLocaleString("en-US");
}

export function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = ["blue", "purple", "amber", "green"];

export function colorOf(name: string): string {
  let h = 0;
  for (const c of name) h += c.charCodeAt(0);
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

export const STATUS_META: Record<string, { label: string; pill: string }> = {
  confirmed: { label: "Confirmed", pill: "confirmed" },
  pending: { label: "Pending", pill: "pending" },
  checkedin: { label: "Checked-in", pill: "confirmed" },
  checkedout: { label: "Checked-out", pill: "checkedout" },
  cancelled: { label: "Cancelled", pill: "cancelled" },
  noshow: { label: "No-show", pill: "noshow" },
};

export function bookingClass(b: { conflict?: boolean; status: string }): string {
  if (b.conflict) return "red-book";
  if (b.status === "vip") return "purple-book";
  if (b.status === "pending") return "amber-book";
  if (b.status === "checkedin") return "green-book";
  return "blue-book";
}

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  HOTEL_MANAGER: "Hotel Manager",
  RESERVATION_MANAGER: "Reservation Manager",
  RECEPTIONIST: "Receptionist",
  HOUSEKEEPING_STAFF: "Housekeeping Staff",
  MAINTENANCE_STAFF: "Maintenance Staff",
  ACCOUNTANT: "Accountant",
  REVENUE_MANAGER: "Revenue Manager",
};

export function roleLabel(role: string): string {
  return ROLE_LABELS[role] || role;
}

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Formats a Date as "26 Aug" to match the display style used across the UI. */
export function formatShortDate(d: Date): string {
  return `${String(d.getUTCDate()).padStart(2, "0")} ${MONTH_ABBR[d.getUTCMonth()]}`;
}

export function nightsBetween(arrival: Date, departure: Date): number {
  return Math.max(1, Math.round((departure.getTime() - arrival.getTime()) / 86400000));
}

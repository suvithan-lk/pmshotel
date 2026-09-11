/**
 * Seed snapshot for Grand Azure Colombo.
 * Intentionally self-contained (not imported from app/lib/data.ts) — seed data is a
 * fixed historical snapshot and must keep working even after data.ts is pruned as
 * views migrate to the database.
 *
 * Run: npx prisma db seed
 * Seeded login: any email below with password "password123".
 */
import { PrismaClient, Role, RoomStatus, ReservationStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ROLE_MAP: Record<string, Role> = {
  "Super Admin": Role.SUPER_ADMIN,
  "Hotel Manager": Role.HOTEL_MANAGER,
  "Reservation Manager": Role.RESERVATION_MANAGER,
  "Receptionist": Role.RECEPTIONIST,
  "Housekeeping Staff": Role.HOUSEKEEPING_STAFF,
  "Maintenance Staff": Role.MAINTENANCE_STAFF,
  "Accountant": Role.ACCOUNTANT,
  "Revenue Manager": Role.REVENUE_MANAGER,
};

const ROOM_STATUS_MAP: Record<string, RoomStatus> = {
  available: RoomStatus.AVAILABLE,
  occupied: RoomStatus.OCCUPIED,
  dirty: RoomStatus.DIRTY,
  cleaning: RoomStatus.CLEANING,
  maintenance: RoomStatus.MAINTENANCE,
};

const RES_STATUS_MAP: Record<string, ReservationStatus> = {
  confirmed: ReservationStatus.CONFIRMED,
  pending: ReservationStatus.PENDING,
  checkedin: ReservationStatus.CHECKED_IN,
  checkedout: ReservationStatus.CHECKED_OUT,
  cancelled: ReservationStatus.CANCELLED,
  noshow: ReservationStatus.NO_SHOW,
};

const MONTHS: Record<string, number> = { Aug: 7, Sep: 8 };
function parseDate(s: string, year = 2026): Date {
  const [day, mon] = s.split(" ");
  return new Date(Date.UTC(year, MONTHS[mon], parseInt(day, 10), 12, 0, 0));
}

const ROOM_TYPES = [
  { name: "Standard", bed: "Queen", maxOccupancy: 2 },
  { name: "Deluxe King", bed: "King", maxOccupancy: 2 },
  { name: "Deluxe Twin", bed: "Twin", maxOccupancy: 2 },
  { name: "Suite", bed: "King", maxOccupancy: 3 },
  { name: "Premium Suite", bed: "King", maxOccupancy: 3 },
  { name: "Executive Suite", bed: "King", maxOccupancy: 4 },
];

const ROOMS = [
  { no: "101", type: "Deluxe King", floor: 1, rate: 25000, status: "occupied", hk: "Occupied" },
  { no: "102", type: "Standard", floor: 1, rate: 16500, status: "available", hk: "Inspected" },
  { no: "103", type: "Suite", floor: 1, rate: 42000, status: "occupied", hk: "Occupied" },
  { no: "104", type: "Deluxe Twin", floor: 1, rate: 24000, status: "maintenance", issue: "AC repair in progress" },
  { no: "105", type: "Premium Suite", floor: 1, rate: 58000, status: "occupied", hk: "Occupied" },
  { no: "106", type: "Deluxe King", floor: 1, rate: 25000, status: "cleaning", hk: "Cleaning · Housekeeping #04" },
  { no: "107", type: "Deluxe King", floor: 1, rate: 25000, status: "occupied", hk: "Occupied" },
  { no: "108", type: "Standard", floor: 1, rate: 16500, status: "available", hk: "Ready to sell" },
  { no: "201", type: "Deluxe King", floor: 2, rate: 26000, status: "occupied", hk: "Occupied" },
  { no: "202", type: "Suite", floor: 2, rate: 43000, status: "occupied", hk: "Occupied" },
  { no: "203", type: "Deluxe King", floor: 2, rate: 26000, status: "available", hk: "Ready to sell" },
  { no: "204", type: "Deluxe Twin", floor: 2, rate: 25000, status: "maintenance", issue: "Air conditioning fault reported" },
  { no: "205", type: "Deluxe King", floor: 2, rate: 26000, status: "occupied", hk: "Occupied" },
  { no: "206", type: "Suite", floor: 2, rate: 43000, status: "dirty", hk: "Checkout — awaiting cleaning" },
  { no: "207", type: "Deluxe Twin", floor: 2, rate: 25000, status: "occupied", hk: "Occupied" },
  { no: "208", type: "Standard", floor: 2, rate: 17500, status: "occupied", hk: "Occupied" },
  { no: "301", type: "Premium Suite", floor: 3, rate: 58000, status: "occupied", hk: "Occupied" },
  { no: "302", type: "Executive Suite", floor: 3, rate: 68000, status: "occupied", hk: "Occupied" },
  { no: "303", type: "Suite", floor: 3, rate: 44000, status: "available", hk: "Ready to sell" },
  { no: "304", type: "Premium Suite", floor: 3, rate: 59000, status: "occupied", hk: "Occupied" },
  { no: "305", type: "Executive Suite", floor: 3, rate: 69000, status: "dirty", hk: "Late checkout — not inspected" },
  { no: "306", type: "Suite", floor: 3, rate: 44000, status: "occupied", hk: "Occupied" },
  { no: "307", type: "Deluxe King", floor: 3, rate: 27000, status: "occupied", hk: "Occupied" },
  { no: "308", type: "Premium Suite", floor: 3, rate: 59000, status: "available", hk: "Ready to sell" },
];

const RESERVATIONS = [
  { id: "BK-2026-00421", guest: "Kumar Perera", phone: "+94 77 214 5521", country: "🇱🇰", room: "101", arrival: "26 Aug", departure: "29 Aug", guests: 2, source: "Booking.com", rate: 25000, status: "checkedin", payment: "paid", request: "Late arrival around 9:00 PM · High floor preferred" },
  { id: "BK-2026-00430", guest: "Anjali Fernando", phone: "+94 77 214 8890", country: "🇱🇰", room: "103", arrival: "26 Aug", departure: "28 Aug", guests: 2, source: "Agoda", rate: 42000, status: "checkedin", payment: "paid", vip: true, request: "Anniversary — champagne and rose petals on arrival" },
  { id: "BK-2026-00438", guest: "Rajiv Kumar", phone: "+91 98 2001 4432", country: "🇮🇳", room: "301", arrival: "26 Aug", departure: "30 Aug", guests: 3, source: "Direct Website", rate: 58000, status: "checkedin", payment: "pending", vip: true, request: "Airport pickup at 6:40 PM · Ground floor parking" },
  { id: "BK-2026-00441", guest: "Nimal Silva", phone: "+94 71 445 9081", country: "🇱🇰", room: "201", arrival: "26 Aug", departure: "27 Aug", guests: 1, source: "Direct Website", rate: 26000, status: "checkedin", payment: "paid", request: "—" },
  { id: "BK-2026-00445", guest: "David Miller", phone: "+1 415 552 0192", country: "🇺🇸", room: "105", arrival: "26 Aug", departure: "30 Aug", guests: 3, source: "Expedia", rate: 58000, status: "checkedin", payment: "paid", request: "Business traveler — early check-in requested" },
  { id: "BK-2026-00447", guest: "Sarah Miller", phone: "+44 7700 900112", country: "🇬🇧", room: "107", arrival: "24 Aug", departure: "26 Aug", guests: 2, source: "Booking.com", rate: 25000, status: "checkedin", payment: "pending", request: "Late checkout requested — 1:00 PM" },
  { id: "BK-2026-00450", guest: "Priya Wickramasinghe", phone: "+94 77 331 2245", country: "🇱🇰", room: "202", arrival: "25 Aug", departure: "29 Aug", guests: 3, source: "Corporate", rate: 43000, status: "checkedin", payment: "paid", request: "Corporate billing — invoice to Ceylon Traders Ltd" },
  { id: "BK-2026-00452", guest: "John Smith", phone: "+61 4 1122 3344", country: "🇦🇺", room: "205", arrival: "27 Aug", departure: "31 Aug", guests: 2, source: "Direct Website", rate: 26000, status: "confirmed", payment: "paid", request: "—" },
  { id: "BK-2026-00454", guest: "Michael Wilson", phone: "+1 647 555 0138", country: "🇨🇦", room: "207", arrival: "24 Aug", departure: "26 Aug", guests: 2, source: "Travel Agent", rate: 25000, status: "checkedin", payment: "paid", request: "Twin beds confirmed" },
  { id: "BK-2026-00456", guest: "Ravi Menon", phone: "+91 98 4432 1109", country: "🇮🇳", room: "208", arrival: "23 Aug", departure: "26 Aug", guests: 1, source: "Agoda", rate: 17500, status: "checkedin", payment: "pending", request: "Room not yet inspected after stay extension" },
  { id: "BK-2026-00458", guest: "Fatima Al-Rashid", phone: "+971 50 442 8871", country: "🇦🇪", room: "302", arrival: "22 Aug", departure: "02 Sep", guests: 4, source: "Direct Website", rate: 68000, status: "checkedin", payment: "paid", vip: true, request: "Halal dining, connecting rooms for family" },
  { id: "BK-2026-00460", guest: "Hans Mueller", phone: "+49 170 3345 210", country: "🇩🇪", room: "304", arrival: "25 Aug", departure: "29 Aug", guests: 3, source: "Booking.com", rate: 59000, status: "checkedin", payment: "paid", request: "Gluten-free breakfast" },
  { id: "BK-2026-00462", guest: "Yuki Tanaka", phone: "+81 90 3345 6621", country: "🇯🇵", room: "306", arrival: "24 Aug", departure: "26 Aug", guests: 3, source: "Expedia", rate: 44000, status: "checkedin", payment: "paid", request: "Quiet room away from elevator" },
  { id: "BK-2026-00464", guest: "Robert Chen", phone: "+65 8123 4456", country: "🇸🇬", room: "307", arrival: "24 Aug", departure: "26 Aug", guests: 2, source: "Agoda", rate: 27000, status: "checkedin", payment: "paid", request: "—" },
  { id: "BK-2026-00466", guest: "Chaminda Rathnayake", phone: "+94 76 552 3310", country: "🇱🇰", room: "203", arrival: "27 Aug", departure: "29 Aug", guests: 2, source: "Walk-in", rate: 26000, status: "pending", payment: "pending", request: "Paying by cash on arrival" },
  { id: "BK-2026-00468", guest: "Thilina Jayasuriya", phone: "+94 71 220 6698", country: "🇱🇰", room: "303", arrival: "29 Aug", departure: "31 Aug", guests: 2, source: "Phone", rate: 44000, status: "pending", payment: "pending", request: "Requested sea-facing room" },
  { id: "BK-2026-00470", guest: "Dilani Gunawardena", phone: "+94 77 887 6612", country: "🇱🇰", room: "308", arrival: "30 Aug", departure: "02 Sep", guests: 3, source: "Email", rate: 59000, status: "pending", payment: "pending", request: "Wedding proposal setup — coordinate with events team" },
  { id: "BK-2026-00399", guest: "Sarah Johnson", phone: "+1 212 555 0199", country: "🇺🇸", room: "104", arrival: "18 Aug", departure: "21 Aug", guests: 2, source: "Booking.com", rate: 24000, status: "cancelled", payment: "refunded", request: "Cancelled due to travel change" },
  { id: "BK-2026-00405", guest: "Arun Kumar", phone: "+91 98 7712 4432", country: "🇮🇳", room: "206", arrival: "19 Aug", departure: "22 Aug", guests: 2, source: "Agoda", rate: 43000, status: "noshow", payment: "refunded", request: "Guest did not arrive — no contact" },
  { id: "BK-2026-00380", guest: "Emma Wilson", phone: "+44 7700 900321", country: "🇬🇧", room: "102", arrival: "20 Aug", departure: "23 Aug", guests: 1, source: "Direct Website", rate: 16500, status: "checkedout", payment: "paid", request: "—" },
  { id: "BK-2026-00390", guest: "Arjun Nair", phone: "+91 98 1123 4499", country: "🇮🇳", room: "108", arrival: "21 Aug", departure: "24 Aug", guests: 2, source: "Agoda", rate: 16500, status: "checkedout", payment: "paid", request: "—" },
];

const USERS = [
  { name: "Suvithan Admin", email: "suvithan.lk@gmail.com", role: "Super Admin", dept: "Management" },
  { name: "Priyanka Jayawardena", email: "priyanka.j@grandazure.lk", role: "Hotel Manager", dept: "Management" },
  { name: "Ruwan Dissanayake", email: "ruwan.d@grandazure.lk", role: "Reservation Manager", dept: "Reservations" },
  { name: "Nadeesha Perera", email: "nadeesha.p@grandazure.lk", role: "Receptionist", dept: "Front Office" },
  { name: "Sunil Bandara", email: "sunil.b@grandazure.lk", role: "Maintenance Staff", dept: "Maintenance" },
  { name: "Kanchana Wijesinghe", email: "kanchana.w@grandazure.lk", role: "Housekeeping Staff", dept: "Housekeeping" },
  { name: "Dinesh Rajapaksa", email: "dinesh.r@grandazure.lk", role: "Accountant", dept: "Finance" },
  { name: "Ishara Gunasekara", email: "ishara.g@grandazure.lk", role: "Revenue Manager", dept: "Revenue" },
];

const CHANNELS = [
  { key: "booking", name: "Booking.com", status: "connected", inventory: 98 },
  { key: "agoda", name: "Agoda", status: "connected", inventory: 96 },
  { key: "expedia", name: "Expedia", status: "warning", inventory: 94 },
  { key: "direct", name: "Direct Website", status: "connected", inventory: 100 },
];

const SYNC_LOGS = [
  { channel: "booking", message: "Booking.com inventory synchronized — 98 rooms", level: "info" },
  { channel: "agoda", message: "Agoda booking imported — BK-2026-00462", level: "info" },
  { channel: "expedia", message: "Expedia rate mismatch detected — Suite LKR 3,000 variance", level: "warning" },
  { channel: "direct", message: "Direct Website availability pushed — 100 rooms", level: "info" },
  { channel: "agoda", message: "Agoda inventory synchronized — 96 rooms", level: "info" },
  { channel: "expedia", message: "Expedia connection retried after timeout", level: "warning" },
];

async function main() {
  console.log("Seeding Grand Azure Colombo…");

  const roomTypeIds = new Map<string, string>();
  for (const rt of ROOM_TYPES) {
    const created = await prisma.roomType.upsert({
      where: { name: rt.name },
      update: {},
      create: rt,
    });
    roomTypeIds.set(rt.name, created.id);
  }

  const roomIds = new Map<string, string>();
  for (const r of ROOMS) {
    const created = await prisma.room.upsert({
      where: { number: r.no },
      update: {},
      create: {
        number: r.no,
        floor: r.floor,
        rate: r.rate,
        status: ROOM_STATUS_MAP[r.status],
        roomTypeId: roomTypeIds.get(r.type)!,
        housekeeping: r.hk,
        issue: r.issue,
      },
    });
    roomIds.set(r.no, created.id);
  }

  const guestIds = new Map<string, string>();
  for (const r of RESERVATIONS) {
    if (guestIds.has(r.guest)) continue;
    const created = await prisma.guest.upsert({
      where: { email: r.guest.toLowerCase().replace(/\s/g, ".") + "@example.com" },
      update: {},
      create: {
        name: r.guest,
        email: r.guest.toLowerCase().replace(/\s/g, ".") + "@example.com",
        phone: r.phone,
        country: r.country,
        vip: !!r.vip,
      },
    });
    guestIds.set(r.guest, created.id);
  }

  for (const r of RESERVATIONS) {
    const arrival = parseDate(r.arrival);
    const departure = parseDate(r.departure);
    const nights = Math.max(1, Math.round((departure.getTime() - arrival.getTime()) / 86400000));
    const totalLkr = Math.round(r.rate * nights * 1.15);
    // Nominal LKR->USD conversion purely so seeded historical payments have a
    // plausible test-mode amount; Stripe checkout itself always runs in USD.
    const amountUsdCents = Math.round((totalLkr / 300) * 100);

    const reservation = await prisma.reservation.upsert({
      where: { bookingCode: r.id },
      update: {},
      create: {
        bookingCode: r.id,
        guestId: guestIds.get(r.guest)!,
        roomId: roomIds.get(r.room)!,
        arrival,
        departure,
        guestsCount: r.guests,
        source: r.source,
        rate: r.rate,
        status: RES_STATUS_MAP[r.status],
        request: r.request,
        vip: !!r.vip,
      },
    });

    if (r.payment !== "pending") {
      const existing = await prisma.payment.findFirst({ where: { reservationId: reservation.id } });
      if (!existing) {
        await prisma.payment.create({
          data: {
            reservationId: reservation.id,
            amountUsdCents,
            status: r.payment === "refunded" ? "REFUNDED" : "PAID",
            method: r.payment === "refunded" ? "Refund" : "Card",
          },
        });
      }
    }
  }

  const passwordHash = await bcrypt.hash("password123", 10);
  for (const u of USERS) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        passwordHash,
        role: ROLE_MAP[u.role],
        department: u.dept,
      },
    });
  }

  const channelIds = new Map<string, string>();
  for (const c of CHANNELS) {
    const created = await prisma.channel.upsert({
      where: { key: c.key },
      update: {},
      create: { ...c, lastSyncAt: new Date() },
    });
    channelIds.set(c.key, created.id);
  }

  for (const log of SYNC_LOGS) {
    await prisma.syncLog.create({
      data: {
        channelId: channelIds.get(log.channel)!,
        message: log.message,
        level: log.level,
      },
    });
  }

  console.log("Seed complete.");
  console.log(`Seeded ${USERS.length} users — log in with any email above and password "password123".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

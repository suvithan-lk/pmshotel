"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { requireStripe } from "../stripe";
import { fmtLKR, nightsBetween } from "../format";
import { writeAudit } from "./audit";

export interface CreateCheckoutResult {
  ok: boolean;
  url?: string;
  error?: string;
}

/**
 * Creates a Stripe test-mode Checkout Session for a reservation's outstanding
 * balance. Charged in USD (Stripe test money) — LKR stays the display
 * currency everywhere else in the UI; see app/lib/stripe.ts.
 */
export async function createCheckoutSession(bookingCode: string, baseUrl: string): Promise<CreateCheckoutResult> {
  const reservation = await prisma.reservation.findUnique({
    where: { bookingCode },
    include: { guest: true },
  });
  if (!reservation) return { ok: false, error: "Reservation not found." };

  const nights = nightsBetween(reservation.arrival, reservation.departure);
  const totalLkr = Math.round(reservation.rate * nights * 1.15);
  const amountUsdCents = Math.max(50, Math.round((totalLkr / 300) * 100));

  try {
    const stripe = requireStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: reservation.guest.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amountUsdCents,
            product_data: {
              name: `JaffnaCityPMS — ${bookingCode}`,
              description: `${reservation.guest.name} · ${nights} night(s) · ${fmtLKR(totalLkr)}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: { bookingCode, reservationId: reservation.id },
      success_url: `${baseUrl}/?payment=success&booking=${bookingCode}`,
      cancel_url: `${baseUrl}/?payment=cancelled&booking=${bookingCode}`,
    });

    if (!session.url) return { ok: false, error: "Stripe did not return a checkout URL." };

    await prisma.payment.create({
      data: {
        reservationId: reservation.id,
        amountUsdCents,
        status: "PENDING",
        method: "Stripe Checkout",
        stripeSessionId: session.id,
      },
    });

    return { ok: true, url: session.url };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to start checkout." };
  }
}

export async function markPaymentPaidFromSession(sessionId: string, paymentIntentId: string | null) {
  const payment = await prisma.payment.findUnique({ where: { stripeSessionId: sessionId }, include: { reservation: { include: { guest: true } } } });
  if (!payment) return;

  await prisma.payment.update({
    where: { id: payment.id },
    data: { status: "PAID", stripePaymentIntentId: paymentIntentId ?? undefined },
  });

  await writeAudit({
    action: "Payment Received",
    module: "Finance",
    entity: payment.reservation.bookingCode,
    oldValue: "Pending",
    newValue: `Paid · ${payment.reservation.guest.name}`,
  });

  revalidatePath("/");
}

export interface FinancePaymentRow {
  id: string;
  date: string;
  guest: string;
  booking: string;
  method: string;
  amountUsdCents: number;
  status: "paid" | "pending" | "failed" | "refunded";
}

export interface OutstandingRow {
  guest: string;
  room: string;
  booking: string;
  balanceLkr: number;
}

export async function getFinanceData(): Promise<{ payments: FinancePaymentRow[]; outstanding: OutstandingRow[] }> {
  const payments = await prisma.payment.findMany({
    include: { reservation: { include: { guest: true } } },
    orderBy: { createdAt: "desc" },
  });

  const paymentRows: FinancePaymentRow[] = payments.map((p) => ({
    id: p.id,
    date: p.createdAt.toISOString().slice(0, 10),
    guest: p.reservation.guest.name,
    booking: p.reservation.bookingCode,
    method: p.method || "—",
    amountUsdCents: p.amountUsdCents,
    status: p.status.toLowerCase() as FinancePaymentRow["status"],
  }));

  const reservations = await prisma.reservation.findMany({
    where: { status: { in: ["CONFIRMED", "PENDING", "CHECKED_IN"] } },
    include: { guest: true, room: true, payments: true },
  });

  const outstanding: OutstandingRow[] = reservations
    .filter((r) => !r.payments.some((p) => p.status === "PAID"))
    .map((r) => {
      const nights = nightsBetween(r.arrival, r.departure);
      return {
        guest: r.guest.name,
        room: r.room.number,
        booking: r.bookingCode,
        balanceLkr: Math.round(r.rate * nights * 1.15),
      };
    });

  return { payments: paymentRows, outstanding };
}

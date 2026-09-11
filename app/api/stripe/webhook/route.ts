import { NextResponse } from "next/server";
import { requireStripe } from "../../../lib/stripe";
import { markPaymentPaidFromSession } from "../../../lib/actions/payments";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 400 });
  }

  const body = await request.text();

  let event;
  try {
    const stripe = requireStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { id: string; payment_intent: string | null };
    await markPaymentPaidFromSession(session.id, session.payment_intent);
  }

  return NextResponse.json({ received: true });
}

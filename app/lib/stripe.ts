import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

// Instantiated lazily so the app can still boot (and Phases 1-3 work) before
// Stripe test keys are configured — only payment actions need this to be real.
export const stripe = key ? new Stripe(key) : null;

export function requireStripe(): Stripe {
  if (!stripe) {
    throw new Error(
      "Stripe is not configured — set STRIPE_SECRET_KEY in .env (see .env.example)."
    );
  }
  return stripe;
}

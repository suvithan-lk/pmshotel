// Next.js 16 renamed `middleware.ts` to `proxy.ts` — same mechanics, new file/export name.
import { withAuth } from "next-auth/middleware";

export const proxy = withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  matcher: [
    "/((?!login|api/auth|api/stripe/webhook|_next/static|_next/image|favicon.ico).*)",
  ],
};

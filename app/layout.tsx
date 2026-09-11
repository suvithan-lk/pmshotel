import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./dashboard.css";
import SessionProviderWrapper from "./components/SessionProviderWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "JaffnaCityPMS — Hotel PMS",
  description: "JaffnaCityPMS — Hotel Property Management System",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}

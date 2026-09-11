"use client";

import { useEffect } from "react";
import { AppProvider, useApp } from "../lib/AppContext";
import { DataProvider, useData } from "../lib/DataContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Drawer from "./Drawer";
import NewBookingModal from "./NewBookingModal";
import ConflictModal from "./ConflictModal";
import ConfirmModal from "./ConfirmModal";
import Toast from "./Toast";
import OverviewView from "./views/OverviewView";
import ReservationsView from "./views/ReservationsView";
import CalendarView from "./views/CalendarView";
import ArrivalsView from "./views/ArrivalsView";
import DeparturesView from "./views/DeparturesView";
import RoomsView from "./views/RoomsView";
import HousekeepingView from "./views/HousekeepingView";
import MaintenanceView from "./views/MaintenanceView";
import GuestsView from "./views/GuestsView";
import Guest360View from "./views/Guest360View";
import ChannelsView from "./views/ChannelsView";
import RatesView from "./views/RatesView";
import RevenueView from "./views/RevenueView";
import PromotionsView from "./views/PromotionsView";
import FinanceView from "./views/FinanceView";
import ReportsView from "./views/ReportsView";
import UsersView from "./views/UsersView";
import NotificationsView from "./views/NotificationsView";
import AlertCenterView from "./views/AlertCenterView";
import AuditView from "./views/AuditView";
import SettingsView from "./views/SettingsView";

function ThemeSync() {
  const { theme } = useApp();
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return null;
}

function KeyboardShortcuts() {
  const { closeDrawer, closeNewBooking, closeConflict, closeConfirm } = useApp();
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeDrawer();
        closeNewBooking();
        closeConflict();
        closeConfirm();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer, closeNewBooking, closeConflict, closeConfirm]);
  return null;
}

function PaymentRedirectHandler() {
  const { openBookingDrawer, toast } = useApp();
  const { refresh } = useData();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const booking = params.get("booking");
    if (!payment) return;

    if (payment === "success") {
      // The webhook marks the payment PAID asynchronously (needs `stripe listen`
      // forwarding locally) — refresh so it shows up once that lands.
      refresh();
      toast(booking ? `Checkout complete for ${booking} — payment will show once confirmed.` : "Checkout complete.");
      if (booking) openBookingDrawer(booking);
    } else if (payment === "cancelled") {
      toast("Checkout cancelled — no payment was made.");
    }

    window.history.replaceState({}, "", window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function DataGate({ children }: { children: React.ReactNode }) {
  const { loading, error } = useData();
  if (loading) {
    return (
      <div className="data-gate">
        <div className="data-gate-spinner" />
        <p>Loading JaffnaCityPMS…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="data-gate data-gate-error">
        <p>
          <b>Couldn&apos;t reach the database.</b>
          <br />
          Make sure Postgres is running (<code>npm run db:up</code>) and migrated (<code>npm run db:migrate</code>).
        </p>
        <p className="data-gate-detail">{error}</p>
      </div>
    );
  }
  return <>{children}</>;
}

function Shell() {
  const { view } = useApp();

  return (
    <div className="app-shell">
      <ThemeSync />
      <KeyboardShortcuts />
      <PaymentRedirectHandler />
      <Sidebar />
      <main className="main">
        <Header />
        <DataGate>
        <OverviewView active={view === "overview"} />
        <ReservationsView active={view === "reservations"} />
        <CalendarView active={view === "calendar"} />
        <ArrivalsView active={view === "arrivals"} />
        <DeparturesView active={view === "departures"} />
        <RoomsView active={view === "rooms"} />
        <HousekeepingView active={view === "housekeeping"} />
        <MaintenanceView active={view === "maintenance"} />
        <GuestsView active={view === "guests"} />
        <Guest360View active={view === "guest360"} />
        <ChannelsView active={view === "channels"} />
        <RatesView active={view === "rates"} />
        <RevenueView active={view === "revenue"} />
        <PromotionsView active={view === "promotions"} />
        <FinanceView active={view === "finance"} />
        <ReportsView active={view === "reports"} />
        <UsersView active={view === "users"} />
        <NotificationsView active={view === "notifications"} />
        <AlertCenterView active={view === "alertcenter"} />
        <AuditView active={view === "audit"} />
        <SettingsView active={view === "settings"} />
        </DataGate>
      </main>
      <Drawer />
      <NewBookingModal />
      <ConflictModal />
      <ConfirmModal />
      <Toast />
    </div>
  );
}

export default function DashboardApp() {
  return (
    <AppProvider>
      <DataProvider>
        <Shell />
      </DataProvider>
    </AppProvider>
  );
}

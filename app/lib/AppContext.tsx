"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { NOTIFICATIONS } from "./data";
import type { ConfirmState, ConflictInfo, DrawerMode, NotificationItem } from "./types";

export interface NavParams {
  filter?: string;
  tab?: string;
  channel?: string;
}

interface AppState {
  view: string;
  navParams: NavParams;
  setView: (view: string, params?: NavParams) => void;

  drawerMode: DrawerMode;
  drawerId: string | null;
  openBookingDrawer: (id: string) => void;
  openRoomDrawer: (no: string) => void;
  closeDrawer: () => void;

  newBookingOpen: boolean;
  openNewBooking: () => void;
  closeNewBooking: () => void;

  conflictInfo: ConflictInfo | null;
  openConflict: (info: ConflictInfo) => void;
  closeConflict: () => void;

  confirmState: ConfirmState | null;
  openConfirm: (title: string, body: string, onConfirm: () => void) => void;
  closeConfirm: () => void;

  toastMsg: string;
  toastShow: boolean;
  toast: (message: string) => void;

  notifications: NotificationItem[];
  markAllRead: () => void;

  theme: "light" | "dark";
  toggleTheme: () => void;

  lang: "EN" | "TA";
  toggleLang: () => void;

  selectedGuest: string | null;
  openGuest360: (name: string) => void;

  mobileNavOpen: boolean;
  toggleMobileNav: () => void;
}

const AppCtx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState("overview");
  const [navParams, setNavParams] = useState<NavParams>({});
  const setView = useCallback((v: string, params: NavParams = {}) => {
    setViewState(v);
    setNavParams(params);
  }, []);

  const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const openBookingDrawer = useCallback((id: string) => {
    setDrawerMode("booking");
    setDrawerId(id);
  }, []);
  const openRoomDrawer = useCallback((no: string) => {
    setDrawerMode("room");
    setDrawerId(no);
  }, []);
  const closeDrawer = useCallback(() => setDrawerMode(null), []);

  const [newBookingOpen, setNewBookingOpen] = useState(false);
  const openNewBooking = useCallback(() => setNewBookingOpen(true), []);
  const closeNewBooking = useCallback(() => setNewBookingOpen(false), []);

  const [conflictInfo, setConflictInfo] = useState<ConflictInfo | null>(null);
  const openConflict = useCallback((info: ConflictInfo) => setConflictInfo(info), []);
  const closeConflict = useCallback(() => setConflictInfo(null), []);

  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  const openConfirm = useCallback((title: string, body: string, onConfirm: () => void) => {
    setConfirmState({ title, body, onConfirm });
  }, []);
  const closeConfirm = useCallback(() => setConfirmState(null), []);

  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toast = useCallback((message: string) => {
    setToastMsg(message);
    setToastShow(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 2800);
  }, []);

  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  const [lang, setLang] = useState<"EN" | "TA">("EN");
  const toggleLang = useCallback(() => setLang((l) => (l === "EN" ? "TA" : "EN")), []);

  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);
  const openGuest360 = useCallback((name: string) => {
    setSelectedGuest(name);
    setViewState("guest360");
    setNavParams({});
  }, []);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = useCallback(() => setMobileNavOpen((o) => !o), []);

  const value = useMemo<AppState>(
    () => ({
      view,
      navParams,
      setView,
      drawerMode,
      drawerId,
      openBookingDrawer,
      openRoomDrawer,
      closeDrawer,
      newBookingOpen,
      openNewBooking,
      closeNewBooking,
      conflictInfo,
      openConflict,
      closeConflict,
      confirmState,
      openConfirm,
      closeConfirm,
      toastMsg,
      toastShow,
      toast,
      notifications,
      markAllRead,
      theme,
      toggleTheme,
      lang,
      toggleLang,
      selectedGuest,
      openGuest360,
      mobileNavOpen,
      toggleMobileNav,
    }),
    [
      view,
      navParams,
      setView,
      drawerMode,
      drawerId,
      openBookingDrawer,
      openRoomDrawer,
      closeDrawer,
      newBookingOpen,
      openNewBooking,
      closeNewBooking,
      conflictInfo,
      openConflict,
      closeConflict,
      confirmState,
      openConfirm,
      closeConfirm,
      toastMsg,
      toastShow,
      toast,
      notifications,
      markAllRead,
      theme,
      toggleTheme,
      lang,
      toggleLang,
      selectedGuest,
      openGuest360,
      mobileNavOpen,
      toggleMobileNav,
    ]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getGuests } from "./actions/guests";
import { getRooms, updateRoomStatus as updateRoomStatusAction } from "./actions/rooms";
import {
  checkIn as checkInAction,
  checkOut as checkOutAction,
  cancelReservation as cancelReservationAction,
  createReservation as createReservationAction,
  getReservations,
  type CreateReservationInput,
  type CreateReservationResult,
} from "./actions/reservations";
import type { ConflictInfo, Guest, Reservation, Room } from "./types";

interface DataState {
  reservations: Reservation[];
  rooms: Room[];
  guests: Guest[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createReservation: (input: CreateReservationInput) => Promise<CreateReservationResult>;
  checkIn: (bookingCode: string) => Promise<void>;
  checkOut: (bookingCode: string) => Promise<void>;
  cancelReservation: (bookingCode: string) => Promise<void>;
  updateRoomStatus: (roomNumber: string, status: Room["status"]) => Promise<void>;
  /**
   * Attempts a deliberately overlapping booking on Room 205 (seeded with an
   * active stay through 31 Aug) so the conflict-detection demo always fires
   * against a real overlap query instead of a hardcoded pair.
   */
  triggerConflictDemo: () => Promise<ConflictInfo | null>;
}

const DataCtx = createContext<DataState | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [res, rms, gst] = await Promise.all([getReservations(), getRooms(), getGuests()]);
      setReservations(res);
      setRooms(rms);
      setGuests(gst);
      setError(null);
    } catch (err) {
      console.error("Failed to load data from the database:", err);
      setError(err instanceof Error ? err.message : "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Legitimate initial data fetch on mount (not derived-state-from-props) —
    // the lint rule can't see through the `refresh` indirection to tell the two apart.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const createReservation = useCallback(async (input: CreateReservationInput) => {
    const result = await createReservationAction(input);
    if (result.ok) await refresh();
    return result;
  }, [refresh]);

  const checkIn = useCallback(async (bookingCode: string) => {
    await checkInAction(bookingCode);
    await refresh();
  }, [refresh]);

  const checkOut = useCallback(async (bookingCode: string) => {
    await checkOutAction(bookingCode);
    await refresh();
  }, [refresh]);

  const cancelReservation = useCallback(async (bookingCode: string) => {
    await cancelReservationAction(bookingCode);
    await refresh();
  }, [refresh]);

  const updateRoomStatus = useCallback(async (roomNumber: string, status: Room["status"]) => {
    await updateRoomStatusAction(roomNumber, status);
    await refresh();
  }, [refresh]);

  const triggerConflictDemo = useCallback(async (): Promise<ConflictInfo | null> => {
    const result = await createReservationAction({
      guestName: "Demo Guest",
      phone: "+94 77 000 0000",
      country: "🌐",
      arrival: "2026-08-28",
      departure: "2026-08-31",
      source: "Direct Website",
      roomNumber: "205",
    });
    return result.ok ? null : result.conflict;
  }, []);

  const value = useMemo<DataState>(
    () => ({
      reservations,
      rooms,
      guests,
      loading,
      error,
      refresh,
      createReservation,
      checkIn,
      checkOut,
      cancelReservation,
      updateRoomStatus,
      triggerConflictDemo,
    }),
    [reservations, rooms, guests, loading, error, refresh, createReservation, checkIn, checkOut, cancelReservation, updateRoomStatus, triggerConflictDemo]
  );

  return <DataCtx.Provider value={value}>{children}</DataCtx.Provider>;
}

export function useData(): DataState {
  const ctx = useContext(DataCtx);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}

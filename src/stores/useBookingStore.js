import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookingStore = create(
    persist(
        (set) => ({
            reservedSeats: {},

            reservedSeats: (movieId, seatIds) => set((state) => ({
                reservedSeats: {
                    ...state.reservedSeats,
                    [movieId]: [...(state.reservedSeats[movieId] || []), ...seatIds]
                }
            })),
        }),
        { name: "movie-booking-storage" }
    )
);
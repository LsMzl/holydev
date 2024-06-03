import { House } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookHouseStore {
  bookingHouseData: HouseDataType | null;
  paymentIntent: string | null;
  clientSecret: string | undefined;

  setHouseData: (data: HouseDataType) => void;
  setPaymentIntent: (paymentIntent: string) => void;
  setClientSecret: (clientSecret: string) => void;
  resetBookHouse: () => void;
}

type HouseDataType = {
  house: House;
  totalPrice: number;
  startDate: Date;
  endDate: Date;
};

/**
 * Etat global permettant l'accès aux données de réservation ( paiement, prix etc...)
 * et aux fonctions permettant de mettre à jour l'état des réservations.
 */
const useBookHouse = create<BookHouseStore>()(
  persist(
    (set) => ({
      bookingHouseData: null,
      paymentIntent: null,
      clientSecret: undefined,
      setHouseData: (data: HouseDataType) => {
        set({ bookingHouseData: data });
      },
      setPaymentIntent: (paymentIntent: string) => {
        set({ paymentIntent });
      },
      setClientSecret: (clientSecret: string) => {
        set({ clientSecret });
      },
      resetBookHouse: () => {
        set({
          bookingHouseData: null,
          paymentIntent: null,
          clientSecret: undefined,
        });
      },
    }),
    {
      // Nom des données dans le local storage
      name: "bookHouse",
    }
  )
);

export default useBookHouse;

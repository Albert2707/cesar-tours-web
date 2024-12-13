import { create } from "zustand";
import { VehicleModel } from "../../../models/booking/vehicle";

type TripFeature = {
  text: string;
  value: number;
};

type BookInfo = {
  trip_type: number;
  passengerNo?: number;
  bagsNo?: number;
  returnDate: Date;
  returnHours?: string
  departureHour?: string;
  departureDate: Date;
  vehicle?: VehicleModel;
  origin?: string;
  destination?: string;
  distance?: TripFeature;
  duration?: TripFeature;
  total: number;
  paymentMethod: "Cash" | "Card";
};

const values: BookInfo = {
  passengerNo: 1,
  paymentMethod: "Cash",
  bagsNo: 0,
  trip_type: 1,
  total: 0,
  departureDate: new Date(),
  returnDate: new Date()
};
type Actions = {
  setTripType: (trip_type: number) => void;
  setDepartureDate: (date: Date) => void;
  setReturnDate: (date: Date) => void;
  setDepartureHour: (hour: string) => void;
  setReturnHour: (hour: string) => void;
  setNoPassenger: (passengers: number) => void;
  setVehicle: (vehicle: VehicleModel) => void;
  setBagsNo: (bagsNo: number) => void;
  setPaymentMethod: (payment: "Cash" | "Card") => void;
  setOrigin(origin: string): void;
  setDestination(destination: string): void;
  setDistance(distance: TripFeature): void;
  setDuration(duration: TripFeature): void;
  setTotal(total: number): void;
};
export const useBookingStore = create<BookInfo & Actions>()((set) => ({
  ...values,
  setTripType: (trip_type) => set(() => ({ trip_type })),
  setDepartureDate: (date) =>
    set(() => {
      return { departureDate: date };
    }),
    setReturnDate: (date) =>
      set(() => {
        return { returnDate: date };
      }),
  setOrigin: (origin) => set(() => ({ origin })),
  setDestination: (destination) => set(() => ({ destination })),
  setDistance: (distance) => set(() => ({ distance })),
  setDuration: (duration) => set(() => ({ duration })),
  setTotal: (total) => set(() => ({ total })),
  setDepartureHour: (hour) =>
    set(() => {
      return { departureHour: hour };
    }),
    setReturnHour: (hour) =>
      set(() => {
        return { returnHours: hour };
      }),
  setNoPassenger: (passengerNo) =>
    set(() => {
      return { passengerNo };
    }),
  setBagsNo: (bagsNo) =>
    set(() => {
      return { bagsNo };
    }),
  setVehicle: (vehicle) =>
    set(() => {
      return { vehicle };
    }),
  setPaymentMethod: (payment) =>
    set(() => {
      return { paymentMethod: payment };
    }),
}));

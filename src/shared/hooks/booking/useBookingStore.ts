import { create } from "zustand";
import { VehicleModel } from "../../../models/booking/vehicle";

type BookInfo = {
  trip_type?: number;
  passengerNo?: number;
  bagsNo?: number;
  departureHour?: string;
  departureDate: Date;
  vehicle?: VehicleModel;
  origin?: string;
  destination?: string;
  distance?: string;
  duration?: string;
  paymentMethod: "Cash" | "Card";
};

const values: BookInfo = {
  passengerNo: 1,
  paymentMethod: "Cash",
  bagsNo: 0,
  trip_type: 1,
  departureDate: new Date(),
};
type Actions = {
  setTripType: (trip_type: number) => void;
  setDepartureDate: (date: Date) => void;
  setDepartureHour: (hour: string) => void;
  setNoPassenger: (passengers: number) => void;
  setVehicle: (vehicle: VehicleModel) => void;
  setBagsNo: (bagsNo: number) => void;
  setPaymentMethod: (payment: "Cash" | "Card") => void;
};
export const useBookingStore = create<BookInfo & Actions>()((set) => ({
  ...values,
  setTripType: (trip_type) => set(() => ({ trip_type })),
  setDepartureDate: (date) =>
    set(() => {
      return { departureDate: date };
    }),
  setDepartureHour: (hour) =>
    set(() => {
      return { departureHour: hour };
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

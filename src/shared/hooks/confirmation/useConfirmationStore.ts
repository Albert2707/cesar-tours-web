import { create } from "zustand";

type Order = {
  order_num: string;
  origin: string;
  destination: string;
  trip_type: "one_way" | "round_trip";
  passengers: number;
  luggage: number;
  departureDate: Date;
  departureHours: string;
  countryId: string;
  distance: string;
  duration: string;
  vehicleId: string;
  customerId: string;
  airline: string;
  flight_number: string;
  additionalNotes: string;
  paymentMethod: "Card" | "Cash" | "Other";
  total: number;
  returnDate: Date | null;
  returnHours: string | null;
  status: number;
  createAt: Date;
  updateAt: Date;
};
type Confirmation = {
  order?: Order;
};

export type actions = {
  addOrder(order: Order): void;
};
export const useConfirmationStore = create<Confirmation & actions>()((set) => ({
  addOrder: (order) => set({ order }),
}));

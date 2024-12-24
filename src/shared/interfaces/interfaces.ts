import { VehicleModel } from "@/models/booking/vehicle";
import { Location } from "@hooks/booking/useBookingStore";

export interface ICountry {
  country_id: string;
  country: string;
}
export interface ICustomer {
  customer_id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  optionalPhone: string;
  country: ICountry;
  countryId: string;
}

export interface IOrder {
  order_num: string;
  origin: Location;
  destination: Location;
  trip_type: "one_way" | "round_trip";
  passengers: number;
  luggage: number;
  departureDate: string;
  departureHours: string;
  returnDate?: string | null;
  returnHours?: string | null;
  country: ICountry;
  countryId: string;
  distance: string;
  duration: string;
  vehicle: VehicleModel;
  vehicleId: string;
  status: number;
  customer: ICustomer;
  customerId: string;
  airline: string;
  flight_number: string;
  additionalNotes?: string | null;
  paymentMethod: "Cash" | "Card";
  total: number;
}

export interface Translations {
  [key: string]: string | string[];
}

export interface TableParameters {
  accesor: string;
  total: string;
  key: keyof TableParameters;
  value: keyof TableParameters;
}

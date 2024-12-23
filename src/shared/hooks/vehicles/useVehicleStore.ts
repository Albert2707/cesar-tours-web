import { create } from "zustand";
import { VehicleModel } from "@/models/booking/vehicle";

type VehiclesPage = {
  vehicle_admin?: VehicleModel;
  editMode: boolean;
  confirm: boolean;
  show: boolean
  vehicleId: string;
  orderId: string
};

const values: VehiclesPage = {
  confirm: false,
  editMode: false,
  show: false,
  vehicleId: "",
  orderId: ""
};
type Actions = {
  setEditMode: (editMode: boolean) => void;
  setConfirm: (confirm: boolean) => void;
  setShow: (show: boolean) => void;
  setVehicle: (vehicle: VehicleModel) => void;
  setVehicleId: (vehicleId: string) => void;
  setOrderId: (orderId: string) => void;
};
export const useVehicleStore = create<VehiclesPage & Actions>()((set) => ({
  ...values,
  setConfirm: (confirm) => set({ confirm }),
  setEditMode: (editMode) => set({ editMode }),
  setVehicle: (vehicle) => set({ vehicle_admin: vehicle }),
  setShow: (show) => set({ show }),
  setVehicleId: (vehicleId) => set({ vehicleId }),
  setOrderId: (orderId) => set({ orderId })
}));

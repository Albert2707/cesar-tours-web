import "./Vehicle.scss";
import VehicleModal from "@/shared/components/vehicleModal/VehicleModal";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "@/utils/api/request";
import Loader from "@/features/loader/Loader";
import { VehicleModel } from "@/models/booking/vehicle";
import { Toaster } from "react-hot-toast";
import Button from "@/shared/components/button/Button";
import ConfirmPopup from "@/shared/components/confirmPopup/ConfirmPopup";
import { customToast } from "@/utils/functions/customToast";
import { VITE_CESAR_API } from "@/config/config";

const Vehicles = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const client = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const vehicleId = useRef<string>("");
  const [vehicle, setVehicle] = useState<VehicleModel>();
  const [show, setShow] = useState<boolean>(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicles_admin"],
    queryFn: async () => {
      const res = await request.get("vehicle/getAllVehicles/");
      return res.data.vehicle;
    },
  });

  const deleteVehicle = useMutation({
    mutationFn: async (id: string) => {
      await request.delete("vehicle/deleteVehicle/" + id);
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["vehicles_admin"],
      });
      customToast("success", "Eliminado con exito");
      vehicleId.current = "";
      setConfirm(false);
    },
    onError: () => {
      customToast("error", "Error eliminando vehiculo");
    },
  });

  const handleDelete = () => {
    if (!vehicleId.current)
      return customToast("error", "Este vehiculo no existe");
    deleteVehicle.mutate(vehicleId.current);
  };
  const content = () => {
    if (error) {
      return <div>Something went wrong</div>;
    } else if (isLoading) {
      return <Loader />;
    } else if (data.length === 0) {
      return <div>No hay vehiculos agregados</div>;
    } else {
      return data.map((e: VehicleModel) => (
        <div key={e.id} className="vehicle_item">
          <div className="avehicle_img">
            <img src={VITE_CESAR_API + "/" + e.img_url} alt={e.brand} />
          </div>
          <div className="specs">
            <div className="spec">{e.brand}</div>
            <div className="spec">{e.model}</div>
            <div className="spec">{e.capacity}</div>
            <div className="spec">{e.luggage_capacity}</div>
            <div className="spec">{e.price_per_km}</div>
            <div className="spec">{e.status}</div>
          </div>
          <div className="options">
            <Button
              properties={{
                type: "options",
                onClickfn: () => {
                  setVehicle(e);
                  setEditMode(true);
                  setShow(true);
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="btn_icon"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
              </svg>
              Editar
            </Button>
            {e.status && (
              <Button
                properties={{
                  type: "options",
                  onClickfn: () => {
                    vehicleId.current = e.id;
                    setConfirm(true);
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="btn_icon"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                Borrar
              </Button>
            )}
          </div>
        </div>
      ));
    }
  };
  return (
    <div className="admin_vehicle">
      <Toaster />
      <AnimatePresence>
        {show && (
          <VehicleModal
            properties={{ setShow, queryClient: client, editMode, vehicle }}
          />
        )}
      </AnimatePresence>
      <div className="filters">
        <div className="filter">
          <Button properties={{ type: "filter", onClickfn: () => {} }}>
            Disponibles
          </Button>
          <Button properties={{ type: "filter", onClickfn: () => {} }}>
            No disponibles
          </Button>
          <div className="warn">
          <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-triangle-alert"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
            <span className="">Solo puedes eliminar los vehiculos que no estan ocupados</span>
          </div>
        </div>
        <Button
          properties={{
            type: "options",
            onClickfn: () => {
              setShow(true);
              setEditMode(false);
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="btn_icon"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Agregar vehiculo
        </Button>
      </div>
      <div className="avehicle_container">{content()}</div>
      {confirm && (
        <ConfirmPopup
          title="Borrar vehiculo"
          subTitle="Este vehiculo sera eliminado completamente ¿Seguro que deseas continuar? "
          onConfirm={handleDelete}
          onCancel={() => {
            vehicleId.current = "";
            setConfirm(false);
          }}
        />
      )}
    </div>
  );
};

export default Vehicles;

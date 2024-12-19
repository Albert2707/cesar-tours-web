import "./Vehicle.scss";
import VehicleModal from "@/shared/components/vehicleModal/VehicleModal";
import { useMemo} from "react";
import { AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "@/utils/api/request";
import Loader from "@/features/loader/Loader";
import { Toaster } from "react-hot-toast";
import Button from "@/shared/components/button/Button";
import ConfirmPopup from "@/shared/components/confirmPopup/ConfirmPopup";
import { customToast } from "@/utils/functions/customToast";
import useTranslate from "@hooks/translations/Translate";
import Table2 from "@/shared/components/table2/Table2";
import { useVehicleStore } from "@hooks/vehicles/useVehicleStore";

const Vehicles = () => {
  const {confirm, setConfirm, show,setShow,setEditMode, setVehicleId, vehicleId} = useVehicleStore();
  const client = useQueryClient();
  const { translate } = useTranslate();
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
      customToast("success", translate("vehicle_deleted_successfully"));
      setVehicleId("");
      setConfirm(false);
    },
    onError: () => {
      customToast("error", translate("error_deleting_vehicle"));
    },
  });

  const translateKeys =useMemo(()=>[
    {
      column: "Imagen",
      key: "img_url"
    },
    {
      column: "Marca",
      key: "brand",
    },
    {
      column: "Capacidad",
      key: "capacity",
    },
    {
      column: "Luggage",
      key: "luggage_capacity",
    },
    {
      column: "price",
      key: "price_per_km",
    },
    {
      column: "status",
      key: "status",
    },
    {
      column: "",
      key: "button",
    },
  ],[]);

  const handleDelete = () => {
    if (!vehicleId)
      return customToast("error", translate("vehicle_not_found"));
    deleteVehicle.mutate(vehicleId);
  };
  const content = () => {
    if (error) {
      return <div>{translate("something_went_wrong")}</div>;
    } else if (isLoading) {
      return <Loader />;
    } else if (data.length === 0) {
      return <div>{translate("no_vehicles_added")}</div>;
    } else {

      return <Table2
        headers={translateKeys}
        data={data}
        isOrder={false}
      />
    }
  };
  return (
    <div className="admin_vehicle">
      <Toaster />
      <AnimatePresence>
        {show && (
          <VehicleModal
            properties={{queryClient: client}}
          />
        )}
      </AnimatePresence>
      <div className="filters">
        <div className="warn_mobile">
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
          <span className="">
            {translate("only_remove_unoccupied_vehicles")}
          </span>
        </div>
        <div className="filter">
          <Button properties={{ type: "filter", onClickfn: () => {} }}>
            {translate("available")}
          </Button>
          <Button properties={{ type: "filter", onClickfn: () => {} }}>
            {translate("occupied")}
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
            <span className="">
              {translate("only_remove_unoccupied_vehicles")}
            </span>
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
          {translate("add_vehicle")}
        </Button>
      </div>

      {content()}
      {confirm && (
        <ConfirmPopup
          title="Borrar vehiculo"
          subTitle="Este vehiculo sera eliminado completamente ¿Seguro que deseas continuar? "
          onConfirm={handleDelete}
          onCancel={() => {
            setVehicleId("");
            setConfirm(false);
          }}
        />
      )}
    </div>
  );
};

export default Vehicles;

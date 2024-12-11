import "./Vehicle.scss";
import VehicleModal from "../../../shared/components/vehicleModal/VehicleModal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../../../utils/api/request";
import Loader from "../../../features/loader/Loader";
import { VehicleModel } from "../../../models/booking/vehicle";
import toast, { Toaster } from "react-hot-toast";
// const { VITE_CESAR_API } = import.meta.env;

const Vehicles = () => {
  const client = useQueryClient();
  const [show, setShow] = useState<boolean>(false);
  const { data, isLoading, error , refetch } = useQuery({
    queryKey: ["vehicles_admin"],
    queryFn: async () => {
      const res = await request.get("vehicle/getAllVehicles/");
      return res.data.vehicle;
    },
  });

  const deleteVehicle = useMutation({
    mutationFn: async (id: number) => {
      await request.delete("vehicle/deleteVehicle/"+id);
    },
    onSuccess: () => {
       client.invalidateQueries({
        queryKey:["vehicles_admin"],
       })
      toast.success("Eliminado con exito");
    },
    onError: () => {
      toast.error("Error");
    },
  });
  const content = () => {
    if (error) {
      return <div>Something went wrong</div>;
    } else if (isLoading) {
      return <Loader />;
    } else if (data.length === 0) {
      return <div>No hay vehiculos agregados</div>;
    } else {
      // return <span>Hola mundo</span>;
      return data.map((e: VehicleModel) => (
        <div key={crypto.randomUUID()}>
          <div>{e.brand}</div>
          <div>{e.model}</div>
          <div>{e.capacity}</div>
          <div>{e.luggage_capacity}</div>
          <div>{e.price_per_km}</div>
          <div>{e.status}</div>
          <button>Editar</button>
          <button
            onClick={() => {
              deleteVehicle.mutate(e.id);
            }}
          >
            Borrar
          </button>
          {/* <img src={VITE_CESAR_API + "/" + e.img_url} alt={e.brand} /> */}
        </div>
      ));
    }
  };
  return (
    <div className="admin_vehicle">
      <Toaster/>
      aqui los vehiculos
      {content()}
      <button onClick={() => setShow(true)}>Agregar vehiculo</button>
      <AnimatePresence>
        {show && <VehicleModal properties={{ setShow, refetch}} />}
      </AnimatePresence>
    </div>
  );
};

export default Vehicles;

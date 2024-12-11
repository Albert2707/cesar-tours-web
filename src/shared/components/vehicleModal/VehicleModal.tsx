import { FC, useState } from "react";
import Button from "../button/Button";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { request } from "../../../utils/api/request";
interface Props {
  properties: {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: any;
  };
}
interface Inputs {
  img: FileList;
  brand: string;
  model: string;
  capacity: number;
  luggage_capacity: number;
  price_per_km: number;
}
const VehicleModal: FC<Props> = ({ properties }) => {
  const { setShow } = properties;
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [file, setFile] = useState<any>(null);
  const validate = async (img: FileList) => {
    const file = img[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Formato no permitido. Solo se aceptan PNG, JPEG y WEBP.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // Máximo 5 MB
        toast.error("El archivo es demasiado grande. Máximo permitido: 5 MB.");
        return;
      }
      setFile(file);
    }
  };
  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFile(null);
  };
  const createV = useMutation({
    mutationFn: async (data: FormData) => {
      request.post("vehicle/createVehicle", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vehicles_admin"],
      });
      queryClient.refetchQueries();
      toast.success("Vehiculo creado exitosamente");
      setFile(null);
      reset();
      setShow(false);
    },
    onError: () => {
      toast.error("Error al crear el vehículo");
    },
  });
  const submit: SubmitHandler<Inputs> = async (data) => {
    const form = new FormData();
    form.append("image", data.img[0]);
    form.append("brand", data.brand);
    form.append("model", data.model);
    form.append("capacity", data.capacity.toString());
    form.append("luggage_capacity", data.luggage_capacity.toString());
    form.append("price_per_km", data.price_per_km.toString());
    createV.mutate(form);
  };

  return (
    <motion.div
      className="admin_vehicles_modal"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0.5 }}
    >
      <Toaster />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ scale: 0.3 }}
        exit={{ scale: 0 }}
        className="modal_container"
      >
        <div className="title">
          <h2>Nuevo Vehiculo</h2>
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
            className="lucide lucide-circle-x"
            onClick={() => setShow(false)}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </div>

        <form
          action=""
          className="vehicle_form"
          onSubmit={handleSubmit(submit)}
          encType="multipart/form-data"
        >
          <label htmlFor="img_file" className="upload">
            {file ? (
              <div className="foto">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Previsualización de la imagen"
                />
                <button onClick={handleRemoveFile}>X</button>
              </div>
            ) : (
              <>
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
                  className="lucide lucide-image-up"
                >
                  <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
                  <path d="m14 19.5 3-3 3 3" />
                  <path d="M17 22v-5.5" />
                  <circle cx="9" cy="9" r="2" />
                </svg>
                <span>Subir imagen</span>
              </>
            )}
            <input
              id="img_file"
              type="file"
              className="img_input"
              accept="image/png, image/jpeg, image/webp"
              {...register("img", {
                required: true,
                onChange: (e) => {
                  validate(e.target.files);
                },
              })}
            />
          </label>

          <input
            type="text"
            placeholder="Marca"
            {...register("brand", { required: true })}
          />
          <input
            type="text"
            placeholder="Modelo"
            {...register("model", { required: true })}
          />
          <input
            type="text"
            placeholder="Capacidad Personas"
            inputMode="numeric"
            {...register("capacity", { required: true })}
          />
          <input
            type="text"
            placeholder="Capacidad equipaje"
            inputMode="numeric"
            {...register("luggage_capacity", { required: true })}
          />
          <input
            type="text"
            placeholder="Precio por kilometro"
            inputMode="numeric"
            {...register("price_per_km", { required: true })}
          />
          <Button
            properties={{
              type: "primary",
              onClickfn: () => {},
            }}
          >
            <span>Guardar</span>
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default VehicleModal;
import { FC, useEffect, useState } from "react";
import Button from "@/shared/components/button/Button";
import { motion } from "framer-motion";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { QueryClient, useMutation } from "react-query";
import { customToast } from "@/utils/functions/customToast";
import { request } from "@/utils/api/request";
import { VITE_CESAR_API } from "@/config/config";
import useTranslate from "@hooks/translations/Translate";
import { useVehicleStore } from "@hooks/vehicles/useVehicleStore";
interface Inputs {
  img_url: FileList;
  brand: string;
  model: string;
  capacity: number;
  luggage_capacity: number;
  price_per_km: number;
}
interface Props {
  properties: {
    queryClient: QueryClient;
  };
}

type Value =
  | "img_url"
  | "brand"
  | "model"
  | "capacity"
  | "luggage_capacity"
  | "price_per_km";
const VehicleModal: FC<Props> = ({ properties }) => {
  const {setShow, editMode,vehicle_admin : vehicle} = useVehicleStore();

  const { queryClient } = properties;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const { translate } = useTranslate();
  const [file, setFile] = useState<any>(null);

  const validate = async (img: FileList) => {
    const file = img[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        customToast("warning", translate("invalid_format"));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // Máximo 5 MB
        customToast("warning", translate("file_too_large"));
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
      const res = await request.post("vehicle/createVehicle", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vehicles_admin"],
      });
      customToast("success", translate("vehicle_created_successfully"));
      setFile(null);
      reset();
      setShow(false);
    },
    onError: () => {
      customToast("error", translate("vehicle_creation_error"));
    },
  });

  const updateVehicle = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await request.put(
        "vehicle/updateVehicle/" + vehicle?.id,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vehicles_admin"],
      });
      customToast("success", translate("vehicle_updated_successfully"));
      setFile(null);
      reset();
      setShow(false);
    },
    onError: () => {
      customToast("error", translate("vehicle_update_error"));
    },
  });

  const submit: SubmitHandler<Inputs> = async (data) => {
    const form = new FormData();
    form.append("image", data.img_url[0]);
    form.append("brand", data.brand);
    form.append("model", data.model);
    form.append("capacity", data.capacity.toString());
    form.append("luggage_capacity", data.luggage_capacity.toString());
    form.append("price_per_km", data.price_per_km.toString());
    if (editMode) {
      updateVehicle.mutate(form);
    } else {
      createV.mutate(form);
    }
  };

  const handleInput = (
    event: React.FormEvent<HTMLInputElement>,
    key:
      | "img_url"
      | "brand"
      | "model"
      | "capacity"
      | "luggage_capacity"
      | "price_per_km"
  ) => {
    const value = event.currentTarget.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    event.currentTarget.value = numericValue;
    setValue(key, numericValue, { shouldValidate: true });
  };

  const onError = (err: FieldErrors<Inputs>) => {
    if (err.img_url) {
      customToast("error", translate("select_image"));
    } else if (err.brand) {
      customToast("error", translate("complete_brand_field"));
    } else if (err.model) {
      customToast("error", translate("complete_model_field"));
    } else if (err.capacity) {
      customToast("error", translate("complete_capacity_field"));
    } else if (err.luggage_capacity) {
      customToast("error", translate("complete_cargo_capacity_field"));
    } else if (err.price_per_km) {
      customToast("error", translate("complete_price_per_km_field"));
    }
  };

  useEffect(() => {
    if (!vehicle) return;
    if (editMode) {
      Object.keys(vehicle).map((e: any) => {
        const val = e as Value;
        setValue(e, vehicle[val].toString());
      });
    }
  }, [editMode, vehicle, setValue]);

  const imgFileContent = () => {
    if (editMode) {
      if (file) {
        return (
          <div className="foto">
            <img
              src={URL.createObjectURL(file)}
              alt="Previsualización de la imagen"
            />
            <button onClick={handleRemoveFile}>X</button>
          </div>
        );
      } else {
        return (
          <div className="foto">
            <img
              src={VITE_CESAR_API + "/" + vehicle?.img_url}
              alt="Previsualización de la imagen"
            />
            <button
              onClick={handleRemoveFile}
              style={{ display: editMode ? "none" : "" }}
            >
              X
            </button>
          </div>
        );
      }
    } else if (file) {
      return (
        <div className="foto">
          <img
            src={URL.createObjectURL(file)}
            alt="Previsualización de la imagen"
          />
          <button onClick={handleRemoveFile}>X</button>
        </div>
      );
    } else if (file == null) {
      return (
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
          <span>{translate("upload_image")}</span>
        </>
      );
    }
  };
  return (
    <motion.div
      className="admin_vehicles_modal"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ scale: 0.3 }}
        exit={{ scale: 0 }}
        className="modal_container"
      >
        <div className="title">
          <h2>{translate("new_vehicle")}</h2>
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
          onSubmit={handleSubmit(submit, onError)}
          encType="multipart/form-data"
        >
          <label
            htmlFor="img_file"
            className={`upload ${errors.img_url ? "invalid" : ""}`}
          >
            {imgFileContent()}
            <input
              id="img_file"
              type="file"
              className="img_input"
              accept="image/png, image/jpeg, image/webp"
              {...register("img_url", {
                required: !editMode,
                onChange: (e) => {
                  validate(e.target.files);
                },
              })}
            />
          </label>

          <input
            type="text"
            placeholder={translate("brand")}
            className={`${errors.brand ? "invalid" : ""}`}
            {...register("brand", { required: true })}
          />
          <input
            type="text"
            placeholder={translate("model")}
            className={`${errors.model ? "invalid" : ""}`}
            {...register("model", { required: true })}
          />
          <input
            type="text"
            placeholder={translate("capacity_persons")}
            inputMode="numeric"
            className={`${errors.capacity ? "invalid" : ""}`}
            {...register("capacity", { required: true })}
            onInput={(e) => handleInput(e, "capacity")}
          />
          <input
            type="text"
            placeholder={translate("luggage_capacity")}
            inputMode="numeric"
            className={`${errors.luggage_capacity ? "invalid" : ""}`}
            {...register("luggage_capacity", { required: true })}
            onInput={(e) => handleInput(e, "luggage_capacity")}
          />
          <input
            type="text"
            placeholder={translate("price_per_km")}
            inputMode="numeric"
            className={`${errors.price_per_km ? "invalid" : ""}`}
            {...register("price_per_km", { required: true })}
            onInput={(e) => handleInput(e, "price_per_km")}
          />
          <Button
            properties={{
              type: "primary",
              onClickfn: () => {},
            }}
          >
            <span>{editMode ? translate("modify") : translate("save")}</span>
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default VehicleModal;

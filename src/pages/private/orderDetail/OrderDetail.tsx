import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { request } from "../../../utils/api/request";
import { moneyFormant } from "../../../utils/functions/moneyFormat";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useIdiom } from "../../../context/idiomContext";
import { IdiomTypes } from "../../../context/idiomTypes";
import "./OrderDetail.scss"
import Select from "react-select";
import { VITE_CESAR_API } from "@/config/config";
import { useEffect, useState } from "react";
import { customToast } from "@/utils/functions/customToast";
import { Toaster } from "react-hot-toast";

const OrderDetail = () => {
  const { id } = useParams();
  const { idiom } = useIdiom() as IdiomTypes;
  const client = useQueryClient();
  const [selected, setSelected] = useState<any>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await request.get(`order/getOrder/${id}`);
      return res.data.order;
    },
  });

  const updateState = useMutation({
    mutationFn: async (state: number) => {
      await request.put(`order/updateOrderStatus/${id}`, { status: state })
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["order"],
      })
      client.invalidateQueries({
        queryKey: ["orders"],
      })
      customToast("success", "Orden actualizada con exito")

    },
    onError: () => {
      customToast("error", "Error al actualizar el estado de la orden")
    }
  })
  const fecha = (date: Date) => {
    if (!date) return "";
    if (idiom === "es") {
      return format(date, "d 'de' MMMM 'de' yyyy", { locale: es })
    }
    else if (idiom === "en") {
      return format(date, "MMMM d, yyyy", { locale: enUS });
    }
  };

  const options = [{
    value: 0,
    label: "Programada",
  },
  {
    value: 1,
    label: "En Curso",
  },
  {
    value: 2,
    label: "Finalizada",
  },
  {
    value: 3,
    label: "Cancelada",
  }
  ]
  const colorMap: { [key: number]: string } = {
    0: "#d97706", // Programada (Azul)
    1: "#f59e0b", // En Curso (Amarillo)
    2: "#47a967", // Finalizada (Verde)
    3: "#dc3545", // Cancelada (Rojo)
  };
  const colorBack: { [key: number]: string } = {
    0: "#faefe6",
    1: "#fff3cd",
    2: "#eef7f1",
    3: "#f8d7da"
  }
  const content = () => {
    if (!id) {
      return <div>No existe tal orden</div>;
    } else if (error) {
      return <div>Hubo un error</div>;
    } else if (isLoading) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="order_detail">
          <div className="order_vehicle">
            <div className="order_vehicle_img">
              <img src={VITE_CESAR_API + "/" + data.vehicle.img_url} alt={data.vehicle.brand + " " + data.vehicle.model} />
            </div>
            <div>{data.vehicle.brand}</div>
            <div>{data.vehicle.model}</div>
          </div>
          <div className="order_header">

            <h3>Detalle de la orden</h3>
            <Select
              options={options}
              value={options.find(e => e.value == data.status)}
              styles={{
                control: (baseStyles) => {
                  const backgroundColor = colorBack[selected?.value]
                  return {

                    ...baseStyles,
                    backgroundColor,
                    borderRadius: "50px",
                    height: "30px",
                    display: "flex",
                    width: "max-content",
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: colorMap[selected?.value],
                    boxShadow: "none",
                    "&:hover": { borderColor: colorBack[selected?.value] },
                  }
                },
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  borderRadius: "10px",
                  display: "flex",
                  width: "max-content",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  fontWeight: 600,
                }),
                option: (baseStyles, state) => {
                  const color = colorMap[state.data.value]
                  return {
                    ...baseStyles,
                    backgroundColor: "transparent",
                    color,
                  };
                },
                indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
                dropdownIndicator: (styles) => ({ ...styles, display: "none" }),
                valueContainer: (baseStyles) => ({ ...baseStyles, padding: "0", margin: "0 8px" }),
                singleValue: (baseStyles, state) => {
                  const color = colorMap[state.data.value]
                  return {
                    ...baseStyles,
                    color,
                    paddingLeft: "0",
                  };
                },

              }}
              isSearchable={false}
              closeMenuOnScroll={true}
              menuPortalTarget={document.body}
              menuPlacement="auto"
              menuPosition="fixed"
              onChange={(e) => {
                if (!e) return;
                setSelected(e)
                updateState.mutate(e.value);
              }}
            />
          </div>
          <div>{data.origin}</div>
          <div>{data.destination}</div>
          <div>{data.trip_type === 1 ? "One way" : "Round trip"}</div>
          <div>{fecha(data.departureDate)}</div>
          <div>{data.departureHours}</div>
          <div>{data.customer.name}</div>
          <div>{data.customer.lastName}</div>
          <div>{moneyFormant(data.total)}</div>
        </div>
      );
    }
  };
  useEffect(() => {
    if (!isLoading && data) {
      setSelected(options.find(e => e.value == data.status))
    }
  }, [isLoading, data])
  return <div>
    <Toaster/>
    {content()}</div>;
};

export default OrderDetail;

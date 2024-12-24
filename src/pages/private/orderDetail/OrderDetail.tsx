import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { request } from "@/utils/api/request";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { IdiomTypes } from "@/context/idiomTypes";
import "./OrderDetail.scss";
import Select from "react-select";
import { Marker } from "@vis.gl/react-google-maps";
import { VITE_CESAR_API } from "@/config/config";
import { useEffect, useMemo, useState } from "react";
import { customToast } from "@/utils/functions/customToast";
import { Toaster } from "react-hot-toast";
import { formatHour } from "@/utils/functions/formatHour";
import { useIdiom } from "@hooks/idiom/useIdiom";
import { colorBack, colorMap } from "@/utils/common/colors";
import { CustomMap } from "@/shared/components/map/Map";
import useTranslate from "@hooks/translations/Translate";

const OrderDetail = () => {
  const { id } = useParams();
  const { translate } = useTranslate();
  const { idiom } = useIdiom() as IdiomTypes;
  const client = useQueryClient();
  const [selected, setSelected] = useState<{
    value: number;
    label: string;
  }>({ value: 0, label: "" });

  const { data, isLoading, error } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await request.get(`order/getOrder/${id}`);
      return res.data.order;
    },
  });
  const updateState = useMutation({
    mutationFn: async (state: number) => {
      await request.put(`order/updateOrderStatus/${id}`, { status: state });
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["order"],
      });
      client.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: () => {
      customToast("error", "Error al actualizar el estado de la orden");
    },
  });
  const fecha = (date: Date) => {
    if (!date) return "";
    if (idiom === "es") {
      return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
    } else if (idiom === "en") {
      return format(date, "MMMM d, yyyy", { locale: enUS });
    }
  };

  const options = useMemo(
    () => [
      {
        value: 0,
        label:translate("scheduled2"),
      },
      {
        value: 1,
        label: translate("in_progress"),
      },
      {
        value: 2,
        label: translate("completed2"),
      },
      {
        value: 3,
        label: translate("canceled2"),
      },
    ],
    [translate]
  );
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
              <img
                src={VITE_CESAR_API + "/" + data.vehicle.img_url}
                alt={data.vehicle.brand + " " + data.vehicle.model}
              />
            </div>
            <div className="order_vehicle_info">
              <div className="vehicle_item">
                <div>{data.vehicle.brand}</div>
                <div>{data.vehicle.model}</div>
              </div>
              <div className="vehicle_item_features">
                <div className="item_features">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  {data.vehicle.capacity}
                </div>
                <div className="item_features">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  {data.vehicle.luggage_capacity}
                </div>
              </div>
            </div>
          </div>
          <div className="order_container">
            <div className="left">
              <div className="order_header">
                <h3>{translate("reservation_details")}</h3>
                <Select
                  options={options}
                  value={options.find((e) => e.value == data.status)}
                  styles={{
                    control: (baseStyles) => {
                      const backgroundColor = colorBack[selected?.value];
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
                      };
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
                      const color = colorMap[state.data.value];
                      return {
                        ...baseStyles,
                        backgroundColor: "transparent",
                        color,
                      };
                    },
                    indicatorSeparator: (styles) => ({
                      ...styles,
                      display: "none",
                    }),
                    dropdownIndicator: (styles) => ({
                      ...styles,
                      display: "none",
                    }),
                    valueContainer: (baseStyles) => ({
                      ...baseStyles,
                      padding: "0",
                      margin: "0 8px",
                    }),
                    singleValue: (baseStyles, state) => {
                      const color = colorMap[state.data.value];
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
                    setSelected(e);
                    updateState.mutate(e.value);
                  }}
                />
              </div>
              <div className="order_body">
                <div className="order_detail_item">
                  <span>{translate("origin_address")}</span>
                  {data.origin.formatted_address.replace(/\d/g, "")}
                </div>
                <div className="order_detail_item">
                  <span>{translate("destination_address")}</span>
                  {data.destination.formatted_address.replace(/\d/g, "")}
                </div>
                <div className="order_detail_item">
                  <span>{translate("trip_type")}</span>
                  {data.trip_type === 1 ? "One way" : "Round trip"}
                </div>
                <div className="order_detail_item">
                  <span>{translate("departure_date_time")}</span>
                  {fecha(data.departureDate)} -{" "}
                  {formatHour(data.departureHours)}
                </div>
                <div className="order_detail_item">
                  <span>{translate("total")}</span>
                  {moneyFormant(data.total)}
                </div>
              </div>
            </div>
            <hr/>
            <div className="right">
              <div className="order_header">
                <h3>{translate("customer")}</h3>
              </div>
              <div className="order_body">
                <div className="order_detail_item">
                  <span> {translate("name")}</span>
                  {data.customer.name}
                </div>
                <div className="order_detail_item">
                  <span>{translate("last_name")}</span>
                  {data.customer.lastName}
                </div>
                <div className="order_detail_item">
                  <span>{translate("email")}</span>
                  {data.customer.email}
                </div>
                <div className="order_detail_item">
                  <span>{translate("phone")}</span>
                  {data.customer.phone}
                </div>
              </div>
            </div>
            <hr/>
            <div className="map" style={{ borderRadius: "10px", overflow: "hidden" }}>
              <CustomMap center={{ lat: 18.6652932, lng: -71.4493516 }}>

                <Marker
                  label={{ text: "A", color: "white" }}
                  position={{
                    lat: parseFloat(data.origin?.lat ?? 0),
                    lng: parseFloat(data.origin?.lng ?? 0),
                  }}
                  clickable={true}
                  onClick={() => alert("marker was clicked!")}
                  title={"clickable google.maps.Marker"}
                />
                <Marker
                  label={{ text: "B", color: "white" }}
                  position={{

                    lat: parseFloat(data.destination?.lat ?? 0),
                    lng: parseFloat(data.destination?.lng ?? 0),
                  }}
                  clickable={true}
                />
              </CustomMap>
            </div>
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    if (!isLoading && data) {
      const selectedOption = options.find((e) => e.value == data.status);
      setSelected(selectedOption || { value: 0, label: "" });
    }
  }, [isLoading, data, options]);

  useEffect(() => {
    const target = document.getElementById("admin_main");
    if (target) {
      target.scrollIntoView();
    }
  }, []);
  return (
    <div>
      <Toaster />
      {content()}
    </div>
  );
};

export default OrderDetail;

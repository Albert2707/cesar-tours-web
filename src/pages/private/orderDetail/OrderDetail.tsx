import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { request } from "../../../utils/api/request";
import { moneyFormant } from "../../../utils/functions/moneyFormat";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useIdiom } from "../../../context/idiomContext";
import { IdiomTypes } from "../../../context/idiomTypes";
import "./OrderDetail.scss"
const { VITE_CESAR_API } = import.meta.env;

const OrderDetail = () => {
  const { id } = useParams();
  const { idiom } = useIdiom() as IdiomTypes;
  const fecha = (date: Date) => {
    if (!date) return "";
    if (idiom === "es") {
      return format(date, "d 'de' MMMM 'de' yyyy", { locale: es })
    }
    else if (idiom === "en") {
      return format(date, "MMMM d, yyyy", { locale: enUS });
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await request.get(`order/getOrder/${id}`);
      console.log(res.data)
      return res.data.order;
    },
  });
  const contect = () => {
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
          <div>{data.origin}</div>
          <div>{data.destination}</div>
          <div>{data.trip_type}</div>
          <div>{fecha(data.departureDate)}</div>
          <div>{data.departureHours}</div>
          <div>{data.returnHour}</div>
          <div>{data.customer.name}</div>
          <div>{data.customer.lastName}</div>
          <div>{moneyFormant(data.total)}</div>
        </div>
      );
    }
  };
  return <div>{contect()}</div>;
};

export default OrderDetail;

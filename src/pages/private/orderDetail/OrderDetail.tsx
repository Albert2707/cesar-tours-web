import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { request } from "../../../utils/api/request";
import { moneyFormant } from "../../../utils/functions/moneyFormat";
const { VITE_CESAR_API } = import.meta.env;

const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await request.get(`order/getOrder/${id}`);
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
        <>
          <div>{data.origin}</div>
          <div>{data.destination}</div>
          <div>{data.trip_type}</div>
          <div>{data.customer.name}</div>
          <div>{data.customer.lastName}</div>
          <div>{data.vehicle.brand}</div>
          <div>{data.vehicle.model}</div>
          <div>{moneyFormant(data.total)}</div>
          <img src={VITE_CESAR_API + "/" + data.vehicle.img_url} alt="" />
        </>
      );
    }
  };
  return <div>{contect()}</div>;
};

export default OrderDetail;

import { format } from "date-fns";
import Alert from "../../../shared/components/alert/Alert";
import { useConfirmationStore } from "../../../shared/hooks/confirmation/useConfirmationStore";
import "./Confirm.scss";
import { enUS, es } from "date-fns/locale";
import { useIdiom } from "../../../context/idiomContext";
import { IdiomTypes } from "../../../context/idiomTypes";
import { moneyFormant } from "../../../utils/functions/moneyFormat";
import { Table } from "../../../shared/components/table/Table";
import { useEffect, useState } from "react";
const Confirm = () => {
  const { order } = useConfirmationStore();
  const { idiom } = useIdiom() as IdiomTypes;
  const [fechaEnEspanol, setFechaEnEspanol] = useState<string>("");
  const [fechaEnIngles, setFechaEnIngles] = useState<string>("");

  useEffect(() => {
    if (order) {
      setFechaEnEspanol(
        format(
          order.departureDate.toString() as string,
          "d 'de' MMMM 'de' yyyy",
          { locale: es }
        )
      );
      setFechaEnIngles(
        format(order.departureDate.toString() as string, "MMMM d, yyyy", {
          locale: enUS,
        })
      );
    }
  }, [order]);

  if (!order) return <div>No hay órdenes registradas</div>;

  return (
    <div className="order-confirm">
      <div className="wrapper">
        <Alert
          msg={"Gracias por su reserva, nos estaremos contactando con usted."}
        />
        <div className="order">
          <h2>Resumen de la reserva</h2>
          <div className="order_item">
            <strong>Numero de la orden:</strong>
            <span>{order?.order_num}</span>
          </div>
          <div className="order_item">
            <strong>Fecha de la reserva:</strong>
            <span> {idiom === "es" ? fechaEnEspanol : fechaEnIngles}</span>
          </div>
          <div className="order_item">
            <strong>Total:</strong>
            <span> {moneyFormant(order?.total as number)}</span>
          </div>
          <div className="order_item">
            <strong>Metodo de pago:</strong>
            <span> {order?.paymentMethod}</span>
          </div>
          <div className="order_item">
            <strong>Aerolinea y numero de vuelo:</strong>
            <span>
              {order?.airline}--{order?.flight_number}
            </span>
          </div>
          <div className="order_item">
            <strong>Direccion de inicio:</strong>
            <span> {order?.origin}</span>
          </div>
          <div className="order_item">
            <strong>Direccion de fin:</strong>
            <span> {order?.destination}</span>
          </div>
          <h2>Detalle de la reserva</h2>
          <Table
            columns={["Reserva", "Total"]}
            data={[
              {
                type: order?.trip_type === "one_way" ? "Ida" : "Ida y vuelta",
                total: moneyFormant(order?.total as number),
                key: "type",
                value: "total",
              },
              {
                subtotal: "Subtotal",
                total: moneyFormant(order?.total as number),
                key: "subtotal",
                value: "total",
              },
              {
                total: "Total",
                totalCost: moneyFormant(order?.total as number),
                key: "total",
                value: "totalCost",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Confirm;

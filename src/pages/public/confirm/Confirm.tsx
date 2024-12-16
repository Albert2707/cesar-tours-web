import { format } from "date-fns";
import Alert from "@/shared/components/alert/Alert";
import { useConfirmationStore } from "@/shared/hooks/confirmation/useConfirmationStore";
import "./Confirm.scss";
import { enUS, es } from "date-fns/locale";
import { useIdiom } from "@/context/idiomContext";
import { IdiomTypes } from "@/context/idiomTypes";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import { Table } from "@/shared/components/table/Table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useTranslate from "@hooks/translations/Translate";
import { translateCountry } from "@/utils/functions/functions";
import StepValidation from "@/shared/components/stepValidation/StepValidation";
const Confirm = () => {
  const { order, addOrder } = useConfirmationStore();
  const { idiom } = useIdiom() as IdiomTypes;
  const [fechaEnEspanol, setFechaEnEspanol] = useState<string>("");
  const [fechaEnIngles, setFechaEnIngles] = useState<string>("");
  const { translate } = useTranslate();
  const { state } = useLocation();
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

  useEffect(() => {
    const target = document.getElementById("main");
    if (target) {
      target.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    if (state) {
      addOrder(state.orderCreated);
    }
  }, [state, addOrder]);
  if (!order)
    return (
      <StepValidation text={translate("no_orders")} redirectTo="/#booking" />
    );

  return (
    <div className="order-confirm">
      <div className="wrapper">
        <Alert msg={translate("thank_you")} />
        <div className="order">
          <h2>{translate("reservation_summary")}</h2>
          <div className="order_item">
            <strong>{translate("reservation_number")}:</strong>
            <span>{order?.order_num}</span>
          </div>
          <div className="order_item">
            <strong>{translate("origin_address")}:</strong>
            <span>
              {translateCountry(
                order?.origin,
                " Dominican Republic",
                ` ${translate("do")}`
              )}
            </span>
          </div>
          <div className="order_item">
            <strong>{translate("destination_address")}:</strong>
            <span>
              {translateCountry(
                order?.destination,
                " Dominican Republic",
                ` ${translate("do")}`
              )}
            </span>
          </div>
          <div className="order_item">
            <strong>{translate("reservation_date")}:</strong>
            <span> {idiom === "es" ? fechaEnEspanol : fechaEnIngles}</span>
          </div>
          <div className="order_item">
            <strong>{translate("payment_method")}:</strong>
            <span>
              {order?.paymentMethod == "Cash"
                ? translate("cash")
                : translate("card")}
            </span>
          </div>
          <div className="order_item">
            <strong>{translate("airline_flight_number")}:</strong>
            <span>
              {order?.airline} - {order?.flight_number}
            </span>
          </div>
          <h2 style={{ marginTop: "15px" }}>
            {translate("reservation_details")}
          </h2>
          <Table
            columns={[translate("reservation"), "Total"]}
            data={[
              {
                type:
                  order?.trip_type === "one_way"
                    ? translate("one_way")
                    : translate("round_trip"),
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

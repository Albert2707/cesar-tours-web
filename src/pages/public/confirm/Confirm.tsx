import { format } from "date-fns";
import Alert from "@/shared/components/alert/Alert";
import { useConfirmationStore } from "@/shared/hooks/confirmation/useConfirmationStore";
import "./Confirm.scss";
import { enUS, es } from "date-fns/locale";
import { IdiomTypes } from "@/context/idiomTypes";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import { Table } from "@/shared/components/table/Table";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTranslate from "@hooks/translations/Translate";
import { translateCountry } from "@/utils/functions/functions";
import StepValidation from "@/shared/components/stepValidation/StepValidation";
import { useIdiom } from "@hooks/idiom/useIdiom";
import Button from "@/shared/components/button/Button";
const Confirm = () => {
  const { order, addOrder } = useConfirmationStore();
  const { idiom } = useIdiom() as IdiomTypes;
  const [fechaEnEspanol, setFechaEnEspanol] = useState<string>("");
  const [fechaEnIngles, setFechaEnIngles] = useState<string>("");
  const { translate } = useTranslate();
  const navigate = useNavigate();
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
                order?.origin?.formatted_address,
                " Dominican Republic",
                ` ${translate("do")}`
              )}
            </span>
          </div>
          <div className="order_item">
            <strong>{translate("destination_address")}:</strong>
            <span>
              {translateCountry(
                order?.destination?.formatted_address,
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
                accesor:
                  order?.trip_type === "one_way"
                    ? translate("one_way")
                    : translate("round_trip"),
                total: moneyFormant(order?.total as number),
                key: "accesor",
                value: "total",
              },
              {
                accesor: "Subtotal",
                total: moneyFormant(order?.total as number),
                key: "accesor",
                value: "total",
              },
              {
                accesor: "Total",
                total: moneyFormant(order?.total as number),
                key: "accesor",
                value: "total",
              },
            ]}
          />
          <Button
            properties={{ type: "back", onClickfn: () => navigate("/") }}
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
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>{translate("home")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;

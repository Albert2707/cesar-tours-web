import { format } from "date-fns";
import Button from "@/shared/components/button/Button";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import { useNavigate } from "react-router-dom";
import { es } from "date-fns/locale";
import useTranslate from "@hooks/translations/Translate";
import "./Table2.scss";
import { VITE_CESAR_API } from "@/config/config";
import { useVehicleStore } from "@hooks/vehicles/useVehicleStore";
import { VehicleModel } from "@/models/booking/vehicle";
import { IOrder } from "@/shared/interfaces/interfaces";

interface Header {
  column: string;
  key: string;
}
interface Props<T> {
  data: T[];
  headers: Header[];
  isOrder: boolean;
}

const Table2 = <T extends IOrder | VehicleModel>({
  data,
  headers,
  isOrder,
}: Props<T>) => {
  const { setConfirm, setVehicle, setEditMode, setShow, setVehicleId } =
    useVehicleStore();
  const getOrderStatus = (status: number): { name: string; class: string } => {
    switch (status) {
      case 0:
        return { name: translate("scheduled"), class: "pending" };
      case 1:
        return { name: translate("in_progress"), class: "in-progress" };
      case 2:
        return { name: translate("completed"), class: "completed" };
      case 3:
        return { name: translate("canceled"), class: "cancelled" };
      default:
        return { name: translate("unknown"), class: "unknown" };
    }
  };

  const getAvailabilityStatus = (
    status: boolean
  ): { name: string; class: string } => {
    return status
      ? { name: translate("Disponible"), class: "pending" }
      : { name: translate("Ocupado"), class: "available" };
  };

  const orderStatus = (
    status: number | boolean,
    isOrder: boolean
  ): { name: string; class: string } => {
    if (isOrder && typeof status === "number") {
      return getOrderStatus(status);
    }
    if (!isOrder && typeof status === "boolean") {
      return getAvailabilityStatus(status);
    }
    return { name: translate("unknown"), class: "unknown" };
  };
  const { translate } = useTranslate();

  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCell = (header: { key: string }, order: any) => {
    const value = header.key.split(".").reduce((acc, key) => acc[key], order); // Acceso dinámico a propiedades anidadas

    switch (header.key) {
      case "departureDate":
        return format(new Date(value), "MMM d, yyyy", { locale: es });
      case "status":
        return orderStatus(value, isOrder).name;
      case "total":
        return moneyFormant(value);
      case "img_url":
        return (
          <div
            className="avehicle_img"
            style={{
              width: "200px",
              height: "150px",
              overflow: "hidden",
            }}
          >
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              src={VITE_CESAR_API + "/" + order.img_url}
              alt={order.brand}
            />
          </div>
        );
      default:
        return value;
    }
  };

  const renderActions = (e: IOrder | VehicleModel) => {
    if (isOrder) {
      return (
        <div className="cell">
          <Button
            properties={{
              type: "primary",
              onClickfn: () => {
                navigate(`/admin/order-detail/${(e as IOrder).order_num}`);
              },
            }}
          >
            {translate("details")}
          </Button>
        </div>
      );
    }

    return (
      <div className="options" style={{ display: "flex", gap: "5px" }}>
        <Button
          properties={{
            type: "options",
            onClickfn: () => {
              setVehicle(e as VehicleModel);
              setEditMode(true);
              setShow(true);
            },
          }}
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
            className="btn_icon"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          </svg>
          {translate("edit")}
        </Button>
        {e.status && (
          <Button
            properties={{
              type: "options",
              onClickfn: () => {
                setVehicleId((e as VehicleModel).id);
                setConfirm(true);
              },
            }}
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
              className="btn_icon"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            {translate("delete")}
          </Button>
        )}
      </div>
    );
  };

  const order = () => {
    if (!data || data.length === 0) {
      return <div>No hay registros en la tabla</div>;
    }

    return data.map((e, index) => (
      <div className="tbl-body-row" key={index}>
        {headers
          .filter((header) => header.column)
          .map((header) => (
            <div
              className={`cell ${
                header.key === "status" &&
                isOrder &&
                orderStatus((e as IOrder).status, isOrder).class
              }`}
              key={header.key}
            >
              {renderCell(header, e)}
            </div>
          ))}
        {renderActions(e)}
      </div>
    ));
  };

  return (
    <div className="table">
      <div className="tbl-header">
        {headers.map((e) => (
          <div key={crypto.randomUUID()} className="cell">
            {translate(e.column)}
          </div>
        ))}
      </div>
      <div className="tbl-body">{order()}</div>
    </div>
  );
};

export default Table2;

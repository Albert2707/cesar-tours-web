import { format } from "date-fns";
import Button from "@/shared/components/button/Button";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import { useNavigate } from "react-router-dom";
import { es } from "date-fns/locale";
import useTranslate from "@hooks/translations/Translate";
import "./Table2.scss";
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
  const { setConfirm, setVehicle, setEditMode, setShow, setVehicleId, setOrderId } =
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

  const getAvailableStatus = (): { name: string; class: string } => {
    return { name: translate("Disponible"), class: "pending" };
  };

  const getUnavailableStatus = (): { name: string; class: string } => {
    return { name: translate("Ocupado"), class: "available" };
  };

  // Uso
  const statusInfo = (status: boolean) =>
    status ? getAvailableStatus() : getUnavailableStatus();

  const orderStatus = (
    status: number | boolean,
    isOrder: boolean
  ): { name: string; class: string } => {
    if (isOrder && typeof status === "number") {
      return getOrderStatus(status);
    }
    if (!isOrder && typeof status === "boolean") {
      return statusInfo(status);
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
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              src={order.img_url}
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
        <div className="cell" style={{ display: "flex", gap: "5px" }}>
          <Button
            properties={{
              type: "options",
              style: { alignSelf: "center" },
              onClickfn: () => {
                navigate(`/admin/order-detail/${(e as IOrder).order_num}`);
              },
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
            <span>
            {translate("details")}
            </span>
          </Button>
          <Button
            properties={{
              type: "options",
              style: { alignSelf: "center" },
              onClickfn: () => {
                setOrderId((e as IOrder).order_num);
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
            <span>
              {translate("delete")}
            </span>
          </Button>
        </div>
      );
    }

    return (
      <div className="cell" style={{ display: "flex", gap: "5px" }}>
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
          <span>
            {translate("edit")}
          </span>
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
            <span>
              {translate("delete")}
            </span>
          </Button>
        )}
      </div>
    );
  };

  const order = () => {
    if (!data || data.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {translate("no_data")}
        </div>
      );
    }

    return data.map((e) => (
      <div className="tbl-body-row" key={crypto.randomUUID()}>
        {headers
          .filter((header) => header.column)
          .map((header) => (
            <div
              className={`cell ${header.key === "status" &&
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

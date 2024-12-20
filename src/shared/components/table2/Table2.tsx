import { format } from "date-fns";
import { FC } from "react";
import Button from "@/shared/components/button/Button";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import { useNavigate } from "react-router-dom";
import { es } from "date-fns/locale";
import useTranslate from "@hooks/translations/Translate";
import "./Table2.scss";
import { VITE_CESAR_API } from "@/config/config";
import { useVehicleStore } from "@hooks/vehicles/useVehicleStore";
export interface ICountry {
  country_id: string;
  country: string;
}
export interface IVehicle {
  id: string;
  brand: string;
  model: string;
  capacity: number;
  luggage_capacity: number;
  price_per_km: number;
  img_url: string;
  status: boolean;
}

export interface ICustomer {
  customer_id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  optionalPhone: string;
  country: ICountry;
  countryId: string;
}

export interface IOrder {
  order_num: string;
  origin: string;
  destination: string;
  trip_type: "one_way" | "round_trip";
  passengers: number;
  luggage: number;
  departureDate: string;
  departureHours: string;
  returnDate?: string | null;
  returnHours?: string | null;
  country: ICountry;
  countryId: string;
  distance: string;
  duration: string;
  vehicle: IVehicle;
  vehicleId: string;
  status: number;
  customer: ICustomer;
  customerId: string;
  airline: string;
  flight_number: string;
  additionalNotes?: string | null;
  paymentMethod: "Cash" | "Card";
  total: number;
}

interface Header {
  column: string;
  key: string;
}
interface Props {
  data: IOrder[];
  headers: Header[];
  isOrder: boolean;
}

const Table2: FC<Props> = ({ data, headers, isOrder }) => {
  const { setConfirm, setVehicle, setEditMode, setShow, setVehicleId } =
    useVehicleStore();
  const orderStatus = (
    status: number | boolean
  ): { name: string; class: string } => {
    if (status === 0 && isOrder) {
      return { name: translate("scheduled"), class: "pending" };
    } else if (status === 1 && isOrder) {
      return { name: translate("in_progress"), class: "in-progress" };
    } else if (status === 2 && isOrder) {
      return { name: translate("completed"), class: "completed" };
    } else if (status === 3 && isOrder) {
      return { name: translate("canceled"), class: "cancelled" };
    } else if (status && !isOrder) {
      return { name: translate("Disponible"), class: "pending" };
    } else {
      return { name: translate("Ocupado"), class: "available" };
    }
  };
  const { translate } = useTranslate();

  const navigate = useNavigate();

  const renderCell = (header:{key:string}, e) => {
    const value = header.key
      .split(".")
      .reduce((acc, key) => acc[key], e); // Acceso dinámico a propiedades anidadas
  
    switch (header.key) {
      case "departureDate":
        return format(new Date(value), "MMM d, yyyy", { locale: es });
      case "status":
        return orderStatus(value).name;
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
              src={VITE_CESAR_API + "/" + e.img_url}
              alt={e.brand}
            />
          </div>
        );
      default:
        return value;
    }
  };
  

  const renderActions = (e) => {
    if (isOrder) {
      return (
        <div className="cell">
          <Button
            properties={{
              type: "primary",
              onClickfn: () => {
                navigate(`/admin/order-detail/${e.order_num}`);
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
              setVehicle(e);
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
                setVehicleId(e.id);
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
  
    return data.map((e: any) => (
      <div className="tbl-body-row" key={crypto.randomUUID()}>
        {headers
          .filter((header) => header.column)
          .map((header, colIndex) => (
            <div
              className={`cell ${
                header.key === "status" &&
                isOrder &&
                orderStatus(e.status).class
              }`}
              key={colIndex}
            >
              {renderCell(header, e)}
            </div>
          ))}
        {renderActions(e)}
      </div>
    ));
  };
  

  // const order = () => {
  //   if (!data || data.length === 0) {
  //     return <div>No hay registros en la tabla</div>;
  //   } else {
  //     return data.map((e: any) => (
  //       <div className="tbl-body-row" key={crypto.randomUUID()}>
  //         {headers
  //           .filter((e) => e.column)
  //           .map((header, colIndex) => {
  //             const value = header.key
  //               .split(".")
  //               .reduce((acc, key) => acc[key], e); // Acceso dinámico a propiedades anidadas
  //             return (
  //               <div
  //                 className={`cell ${
  //                   header.key === "status" &&
  //                   isOrder === true &&
  //                   orderStatus(e.status).class
  //                 }`}
  //                 key={colIndex}
  //               >
  //                 {header.key === "departureDate" ? (
  //                   format(new Date(value), "MMM d, yyyy", { locale: es })
  //                 ) : header.key === "status" ? (
  //                   orderStatus(value).name
  //                 ) : header.key === "total" ? (
  //                   moneyFormant(value)
  //                 ) : header.key == "img_url" ? (
  //                   <div
  //                     className="avehicle_img"
  //                     style={{
  //                       width: "200px",
  //                       height: "150px",
  //                       overflow: "hidden",
  //                     }}
  //                   >
  //                     <img
  //                       style={{
  //                         height: "100%",
  //                         width: "100%",
  //                         objectFit: "cover",
  //                       }}
  //                       src={VITE_CESAR_API + "/" + e.img_url}
  //                       alt={e.brand}
  //                     />
  //                   </div>
  //                 ) : (
  //                   value
  //                 )}
  //               </div>
  //             );
  //           })}

  //         {isOrder ? (
  //           <div className="cell">
  //             <Button
  //               properties={{
  //                 type: "primary",
  //                 onClickfn: () => {
  //                   navigate(`/admin/order-detail/${e.order_num}`);
  //                 },
  //               }}
  //             >
  //               {translate("details")}
  //             </Button>
  //           </div>
  //         ) : (
  //           <div className="options" style={{ display: "flex", gap: "5px" }}>
  //             <Button
  //               properties={{
  //                 type: "options",
  //                 onClickfn: () => {
  //                   setVehicle(e);
  //                   setEditMode(true);
  //                   setShow(true);
  //                 },
  //               }}
  //             >
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="24"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 className="btn_icon"
  //               >
  //                 <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  //               </svg>
  //               {translate("edit")}
  //             </Button>
  //             {e.status && (
  //               <Button
  //                 properties={{
  //                   type: "options",
  //                   onClickfn: () => {
  //                     setVehicleId(e.id);
  //                     setConfirm(true);
  //                   },
  //                 }}
  //               >
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   width="24"
  //                   height="24"
  //                   viewBox="0 0 24 24"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   strokeWidth="2"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   className="btn_icon"
  //                 >
  //                   <path d="M3 6h18" />
  //                   <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
  //                   <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  //                 </svg>
  //                 {translate("delete")}
  //               </Button>
  //             )}
  //           </div>
  //         )}
  //         {/* <div className="cell">{e.order_num}</div>
  //         <div className="cell">
  //           {format(new Date(e.departureDate), "MMM d, yyyy", { locale: es })}
  //         </div>

  //         <div className={`cell ${orderStatus(e.status).class}`}>
  //           {orderStatus(e.status).name}
  //         </div>
  //         <div className="cell">{`${e.customer.name}`}</div>

  //         <div className="cell">{e.origin}</div>
  //         <div className="cell">{e.vehicle.model}</div>

  //         <div className="cell">{moneyFormant(e.total)}</div>
  //         <div className="cell">
  //           <Button
  //             properties={{
  //               type: "primary",
  //               onClickfn: () => {
  //                 navigate(`/admin/order-detail/${e.order_num}`);
  //               },
  //             }}
  //           >
  //             {translate("details")}
  //           </Button>
  //         </div> */}
  //       </div>
  //     ));
  //   }
  // };

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

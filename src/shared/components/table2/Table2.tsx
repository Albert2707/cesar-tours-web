import { format } from "date-fns";
import { FC } from "react";
import Button from "../button/Button";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import { useNavigate } from "react-router-dom";
import { es } from "date-fns/locale";

interface Props {
  data: any;
}
const Table2: FC<Props> = ({ data }) => {
  const orderStatus = (status: number): { name: string; class: string } => {
    if (status === 0) {
      return { name: "Agendada", class: "pending" };
    } else if (status === 1) {
      return { name: "Proceso", class: "in-progress" };
    } else if (status === 2) {
      return { name: "Completada", class: "completed" };
    } else {
      return { name: "Cancelada", class: "cancelled" };
    }
  };

  const navigate = useNavigate();
  return data.map((e: any) => (
    <div className="tbl-body-row" key={crypto.randomUUID()}>
      <div className="cell">{e.order_num}</div>
      <div className="cell">
        {format(new Date(e.departureDate), "MMM d, yyyy", { locale: es })}
      </div>

      <div className={`cell ${orderStatus(e.status).class}`}>
        {orderStatus(e.status).name}
      </div>
      <div className="cell">{`${e.customer.name} ${e.customer.lastName}`}</div>

      <div className="cell">{e.origin}</div>
      <div className="cell">{e.vehicle.model}</div>

      <div className="cell">{moneyFormant(e.total)}</div>
      <div className="cell">
        <Button
          properties={{
            type: "primary",
            onClickfn: () => {
              navigate(`/admin/order-detail/${e.order_num}`);
            },
          }}
        >
          ...
        </Button>
      </div>
    </div>
  ));
};

export default Table2;

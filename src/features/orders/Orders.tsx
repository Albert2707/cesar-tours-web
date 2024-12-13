import { OrderServices } from "./services/orderServices";
import { useQuery } from "react-query";
import { moneyFormant } from "../../utils/functions/moneyFormat";
import { format } from "date-fns";
import "./Order.scss";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import Button from "../../shared/components/button/Button";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const [filter, setFilter] = useState<string>("all");
  const [pageCount, setPageCount] = useState<number>(0);
  const navigate = useNavigate();
  const [skip, setSkip] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const limit: number = 5;
  const { data, isLoading, error, refetch } = useQuery(`orders`, async () => {
    const res = await OrderServices.getOrders(filter, skip, limit);
    setHasNextPage(res.hasNextPage);
    setPageCount(res.totalPages);
    return res.order;
  });

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

  const order = () => {
    if (error) {
      return "Something went wrong";
    } else if (isLoading) {
      return <h1>Loading...</h1>;
    } else if (!data || data.length === 0) {
      return <div>No hay registros en la tabla</div>;
    } else {
      return data.map((e: any) => (
        <div className="tbl-body-row" key={crypto.randomUUID()}>
          <div className="cell">{e.order_num}</div>
          <div className="cell">
            {format(new Date(e.departureDate), "MMM d, yyyy", { locale: es })}
          </div>

          <div className={`cell ${orderStatus(e.status).class}`}>
            {orderStatus(e.status).name}
          </div>
          <div className="cell">
            {`${e.customer.name} ${e.customer.lastName}`}
          </div>

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
    }
  };

  useEffect(() => {
    refetch();
  }, [filter, skip]);
  return (
    <div className="orders">
      <div className="filter">
        <Button
          properties={{
            type: "filter",
            onClickfn: () => {
              setFilter("all");
              setSkip(1);
            },
          }}
        >
          Todos
        </Button>
        <Button
          properties={{
            type: "filter",
            onClickfn: () => {
              setFilter("0");
              setSkip(1);
            },
          }}
        >
          Agendadas
        </Button>
        <Button
          properties={{
            type: "filter",
            onClickfn: () => {
              setFilter("1");
              setSkip(1);
            },
          }}
        >
          En proceso
        </Button>
        <Button
          properties={{
            type: "filter",
            onClickfn: () => {
              setFilter("2");
              setSkip(1);
            },
          }}
        >
          Completadas
        </Button>
        <Button
          properties={{
            type: "filter",
            onClickfn: () => {
              setFilter("3");
              setSkip(1);
            },
          }}
        >
          Canceladas
        </Button>
      </div>
      <div className="table">
        <div className="tbl-header">
          <div className="cell">Order num</div>
          <div className="cell">Date</div>
          <div className="cell">Status</div>
          <div className="cell">Customer</div>
          <div className="cell">Origin</div>
          <div className="cell">Vehicle</div>
          <div className="cell">Total</div>
        </div>
        <div className="tbl-body">{order()}</div>
      </div>
      <div className="pagination">
        <Button
          properties={{
            type: "filter",
            onClickfn: () => {
              if (skip === 1) return;
              setSkip(skip - 1);
            },
          }}
        >
          {"<"}
        </Button>
        <div className="page-numbers">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (e) => (
              <span
                key={crypto.randomUUID()}
                style={{
                  color: e === skip ? "#f24b0f" : "",
                  fontWeight: e === skip ? "bold" : "normal",
                }}
              >
                {e}
              </span>
            )
          )}
        </div>
        <Button
          properties={{
            type: "filter",
            onClickfn: () => {
              if (!hasNextPage) return;
              setSkip(skip + 1);
            },
          }}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default Orders;

import { OrderServices } from "./services/orderServices";
import { useQuery } from "react-query";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import { format } from "date-fns";
import "./Order.scss";
import { es } from "date-fns/locale";
import { FormEvent, useEffect, useState } from "react";
import Button from "@/shared/components/button/Button";
import { useNavigate } from "react-router-dom";
import useTranslate from "@hooks/translations/Translate";
const Orders = () => {
  const [filter, setFilter] = useState<string>("all");
  const [pageCount, setPageCount] = useState<number>(0);
  const navigate = useNavigate();
  const { translate } = useTranslate();
  const [skip, setSkip] = useState<number>(1);
  const [reservation_num, setReservation_num] = useState<string>("");
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const limit: number = 5;
  const { data, isLoading, error, refetch } = useQuery(`orders`, async () => {
    const res = await OrderServices.getOrders(
      filter,
      skip,
      limit,
      reservation_num
    );
    setHasNextPage(res.hasNextPage);
    setPageCount(res.totalPages);
    return res.order;
  });

  const orderStatus = (status: number): { name: string; class: string } => {
    if (status === 0) {
      return { name: translate("scheduled"), class: "pending" };
    } else if (status === 1) {
      return { name: translate("in_progress"), class: "in-progress" };
    } else if (status === 2) {
      return { name: translate("completed"), class: "completed" };
    } else {
      return { name: translate("canceled"), class: "cancelled" };
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
              {translate("details")}
            </Button>
          </div>
        </div>
      ));
    }
  };

  useEffect(() => {
    refetch();
  }, [filter, skip]);

  useEffect(() => {
    if (reservation_num === "") refetch();
  }, [reservation_num, refetch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };
  return (
    <div className="orders">
      <div className="filter">
        <div className="button_filter">
          <Button
            properties={{
              type: "filter",
              btnClass: `${filter == "all" ? "selected" : ""}`,
              onClickfn: () => {
                setFilter("all");
                setSkip(1);
              },
            }}
          >
            {translate("all")}
          </Button>
          <Button
            properties={{
              type: "filter",
              btnClass: `${filter == "0" ? "selected" : ""}`,
              onClickfn: () => {
                setFilter("0");
                setSkip(1);
              },
            }}
          >
            {translate("scheduled")}
          </Button>
          <Button
            properties={{
              type: "filter",
              btnClass: `${filter == "1" ? "selected" : ""}`,
              onClickfn: () => {
                setFilter("1");
                setSkip(1);
              },
            }}
          >
            {translate("in_progress")}
          </Button>
          <Button
            properties={{
              type: "filter",
              btnClass: `${filter == "2" ? "selected" : ""}`,
              onClickfn: () => {
                setFilter("2");
                setSkip(1);
              },
            }}
          >
            {translate("completed")}
          </Button>
          <Button
            properties={{
              type: "filter",
              btnClass: `${filter == "3" ? "selected" : ""}`,
              onClickfn: () => {
                setFilter("3");
                setSkip(1);
              },
            }}
          >
            {translate("canceled")}
          </Button>
        </div>
        <form className="order_search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={translate("reservationNumber")}
            onChange={(e) => {
              setReservation_num(e.target.value);
            }}
          />
          <button>
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
              className="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>
      </div>
      <div className="table">
        <div className="tbl-header">
          <div className="cell">{translate("order_number")}</div>
          <div className="cell">{translate("date")}</div>
          <div className="cell">{translate("status")}</div>
          <div className="cell">{translate("customer")}</div>
          <div className="cell">{translate("origin2")}</div>
          <div className="cell">{translate("vehicle")}</div>
          <div className="cell">{translate("total")}</div>
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

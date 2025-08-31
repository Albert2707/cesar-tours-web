import { OrderServices } from "./services/orderServices";
import { useMutation, useQuery, useQueryClient } from "react-query";
import "./Order.scss";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Button from "@/shared/components/button/Button";
import useTranslate from "@hooks/translations/Translate";
import Table2 from "@/shared/components/table2/Table2";
import { IOrder } from "@/shared/interfaces/interfaces";
import { Pagination } from "@/shared/components/pagination/Pagination";
import ConfirmPopup from "@/shared/components/confirmPopup/ConfirmPopup";
import { useVehicleStore } from "@hooks/vehicles/useVehicleStore";
import { request } from "@/utils/api/request";
import { customToast } from "@/utils/functions/customToast";
import { Toaster } from "react-hot-toast";
const Orders = () => {
  const [filter, setFilter] = useState<string>("all");
  const client = useQueryClient();
  const {
    confirm,
    setConfirm,
    orderId
  } = useVehicleStore();
  const [pageCount, setPageCount] = useState<number>(0);
  const { translate } = useTranslate();
  const [skip, setSkip] = useState<number>(1);
  const [reservation_num, setReservation_num] = useState<string>("");
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const limit: number = 5;
  const deleteOrder = useMutation({
    mutationFn: async (orderNum: string) => {
      await request.delete("order/deleteOrder/" + orderNum);
    },
    onSuccess: () => {
      customToast("success", translate("order_deleted_successfully"));
      client.invalidateQueries({
        queryKey: ["orders"],
      })
      setConfirm(false);
    },

    onError: () => {
      customToast("error", translate("error_deleting_vehicle"));
      setConfirm(false);
    }
  })
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

  const translateKeys = useMemo(
    () => [
      {
        column: "order_number",
        key: "order_num",
      },
      {
        column: "date",
        key: "departureDate",
      },
      {
        column: "status",
        key: "status",
      },
      {
        column: "customer",
        key: "customer.name",
      },
      {
        column: "vehicle",
        key: "vehicle.brand",
      },
      {
        column: "total",
        key: "total",
      },
      {
        column: "",
        key: "button",
      },

    ],
    []
  );

  const order = () => {
    if (error) {
      return "Something went wrong";
    } else if (isLoading) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <Table2<IOrder>
          data={data as unknown as IOrder[]}
          headers={translateKeys}
          isOrder={true}
        />
      );
    }
  };

  const handleDelete = () => {
    deleteOrder.mutate(orderId);
  }

  useEffect(() => {
    refetch();
  }, [filter, skip, refetch]);

  useEffect(() => {
    if (reservation_num === "") refetch();
  }, [reservation_num, refetch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };
  return (
    <div className="orders">
      <Toaster />
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
      {order()}
      <Pagination pageCount={pageCount} skip={skip} setSkip={setSkip} hasNextPage={hasNextPage} />
      {confirm && (
        <ConfirmPopup
          title="Borrar esta reserva"
          subTitle="Esta reserva sera eliminada completamente ¿Seguro que deseas continuar? "
          onConfirm={handleDelete}
          onCancel={() => {
            setConfirm(false);
          }}
        />
      )}
    </div>
  );
};

export default Orders;

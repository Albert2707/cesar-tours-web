import { Table } from "@/shared/components/table/Table";
import { useBookingStore } from "@/shared/hooks/booking/useBookingStore";
import { enUS } from "date-fns/locale/en-US";
import { es } from "date-fns/locale/es";
import "./Checkout.scss";
import { format } from "date-fns";
import { IdiomTypes } from "@/context/idiomTypes";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { CheckoutService } from "./services/checkoutService";
import { Toaster } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import Button from "@/shared/components/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { customToast } from "@/utils/functions/customToast";
import { formatHour } from "@/utils/functions/formatHour";
import { request } from "@/utils/api/request";
import { Country } from "@/models/country/country";
import useTranslate from "@hooks/translations/Translate";
import { translateCountry } from "@/utils/functions/functions";
import StepValidation from "@/shared/components/stepValidation/StepValidation";
import { useIdiom } from "@hooks/idiom/useIdiom";
import SelectBooking from "@/shared/components/selectBooking/SelectBooking";
import { VITE_RESEND_API_KEY } from "@/config/config";
import { ConfirmationEmail } from "@/features/email/ConfirmationEmail";
import { render } from "@react-email/render";
import { IOrder } from "@/shared/interfaces/interfaces";
interface Inputs {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  optionalPhone: string;
  countryId: { value: string; label: string };
  airline: string;
  flight_number: string;
  additionalNotes: string;
}
export interface OrderData extends Omit<Inputs, "countryId"> {
  origin?: string;
  destination?: string;
  trip_type?: number;
  passengers?: number;
  formatted_origin_address?: string
  formatted_destination_address?: string
  origin_lat?: number
  destination_lat?: number
  origin_lng?: number
  destination_lng?: number
  luggage?: number;
  departureDate?: Date;
  countryId?: string;
  departureHours?: string;
  returnDate?: Date;
  returnHours?: string;
  distance?: string;
  duration?: string;
  vehicleId?: string;
  paymentMethod: string;
  total: number;
}

const Checkout = () => {
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([{ value: "", label: "" }]);

  const { translate } = useTranslate();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const { state } = useLocation();
  const {
    origin,
    destination,
    trip_type,
    passengerNo,
    distance,
    duration,
    bagsNo,
    departureDate,
    departureHour,
    returnHours,
    returnDate,
  } = state?.order || {};
  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await request.get("countries/getCountries");
      return res.data;
    },
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let country = watch("countryId");
  const sendEmail = useMutation({
    mutationFn: async (data: { html: string[], subject: string[], email: string }) => {
      const res = await request.post("email/send/confirmation", data, { headers: { resendapikey: VITE_RESEND_API_KEY } })
      return res.data;
    },

  });

  const emailSend = async (order: IOrder) => {
    const confirmationEmailProps = {
      num: translate("order_number"),
      origen: translate("origin2"),
      destino: translate("destination2"),
      dateTime: translate("dateTime"),
      total: translate("total"),
    }

    const labels = {
      ...confirmationEmailProps,
      preview: translate("newReservation"),
      header: translate("newReservationMessage"),
    }
    const labelsCustomer = {
      ...confirmationEmailProps,
      preview: translate("reservationConfirmation"),
      header: translate("thankYouMessage"),
    }
    const formated_origin = translateCountry(
      order?.origin?.formatted_address,
      " Dominican Republic",
      ` ${translate("do")}`
    );
    const formated_destination = translateCountry(
      order?.destination?.formatted_address,
      " Dominican Republic",
      ` ${translate("do")}`
    );
    const hour = formatHour(departureHour)
    const dateFormated = idiom === "es" ? fechaEnEspanol : fechaEnIngles

    const html = await render(
      <ConfirmationEmail parameters={{ name: order?.customer?.name, reservationNum: order?.order_num, origin: formated_origin, destination: formated_destination, date: dateFormated, hour: hour, total: moneyFormant(order?.total as number) }} labels={labels} />,
      {
        pretty: true,
      }
    );
    const htmlCustomer = await render(
      <ConfirmationEmail parameters={{ name: order?.customer?.name, reservationNum: order?.order_num, origin: formated_origin.replace(/\d/g, ""), destination: formated_destination.replace(/\d/g, ""), date: dateFormated, hour: hour, total: moneyFormant(order?.total as number) }} labels={labelsCustomer} />,
      {
        pretty: true,
      }
    );
    const dataToSend = {
      email: order?.customer?.email,
      subject: [translate("reservationConfirmation"), translate("thankYouMessage")],
      html: [html, htmlCustomer]
    }
    sendEmail.mutate(dataToSend);
  }


  const createOrder = useMutation({
    mutationFn: async (order: OrderData) => {
      const res = await CheckoutService.createOrder(order);
      return res;
    },
    onSuccess: ({ orderCreated }) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      emailSend(orderCreated)
      navigate("/order/confirmation", {
        state: { orderCreated },
      });
      setValue("name", "");
      country = { value: "", label: "" };
      reset();
    },
    onError: () => {
      customToast("error", translate("order_creation_error"));
    },
  });

  const {
    setVehicle,
    setTotal,
    paymentMethod,
    setPaymentMethod,
    total,
    vehicle,
  } = useBookingStore();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const order: OrderData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      optionalPhone: data.optionalPhone,
      formatted_origin_address: origin?.formatted_address,
      formatted_destination_address: destination?.formatted_address,
      origin_lng: origin?.lng,
      destination_lng: destination?.lng,
      origin_lat: origin?.lat,
      destination_lat: destination?.lat,
      trip_type,
      passengers: passengerNo,
      luggage: bagsNo,
      departureDate,
      departureHours: departureHour,
      returnHours,
      returnDate,
      countryId: data.countryId.value,
      distance: distance?.text,
      duration: duration?.text,
      vehicleId: vehicle?.id,
      airline: data.airline,
      flight_number: data.flight_number,
      additionalNotes: data.additionalNotes,
      paymentMethod,
      total,
    };
    createOrder.mutate(order);
  };
  const handleInput = (
    event: React.FormEvent<HTMLInputElement>,
    key:
      | "name"
      | "lastName"
      | "email"
      | "phone"
      | "optionalPhone"
      | "countryId"
      | "airline"
      | "flight_number"
      | "additionalNotes"
  ) => {
    const value = event.currentTarget.value;
    // Elimina caracteres no numéricos
    const numericValue = value.replace(/\D/g, "");
    event.currentTarget.value = numericValue;
    setValue(key, numericValue, { shouldValidate: true });
  };
  const onError = (errors: FieldErrors<Inputs>) => {
    if (errors.name) {
      customToast("error", translate("complete_first_name"));
    } else if (errors.lastName) {
      customToast("error", translate("complete_last_name"));
    } else if (errors.email) {
      customToast("error", translate("complete_email"));
    } else if (errors.phone) {
      customToast("error", translate("complete_phone"));
    } else if (errors.countryId || !country) {
      customToast("error", translate("select_country"));
    } else if (errors.airline) {
      customToast("error", translate("complete_airline"));
    } else if (errors.flight_number) {
      customToast("error", translate("complete_flight"));
    } else if (errors.additionalNotes) {
      customToast("error", translate("complete_comments"));
    }
  };
  const today = new Date();
  const { idiom } = useIdiom() as IdiomTypes;
  const fechaEnEspanol = format(
    departureDate ?? today,
    "d 'de' MMMM 'de' yyyy",
    { locale: es }
  );
  const fechaEnIngles = format(departureDate ?? today, "MMMM d, yyyy", {
    locale: enUS,
  });
  const checkoutRef = useRef(null);
  useEffect(() => {
    const target = document.getElementById("main");
    if (target) {
      target.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    if (state) {
      setVehicle(state.vehicle);
      setTotal(state.total);
    }
  }, [state, setVehicle, setTotal]);

  useEffect(() => {
    if (!isLoading && data) {
      setCountries(
        data.map((e: Country) => ({ value: e.country_id, label: e.country }))
      );
    }
  }, [isLoading, data]);
  if (!state) {
    return (
      <StepValidation
        text={translate("reservation_steps_error")}
        redirectTo="/#booking"
      />
    );
  }

  const triggerSubmit = () => {
    handleSubmit(onSubmit, onError)();
  };

  return (
    <motion.div
      className="checkout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", duration: 0.3 }}
      ref={checkoutRef}
    >
      <Toaster />
      <div className="wrapper">
        <div className="top" style={{ display: "flex" }}>
          <div className="left">
            <h2 id="checkout">{translate("billing_details")}</h2>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit, onError)}
              className="checkout-form"
            >
              <div className="item customer">
                <div className="form-item">
                  <label htmlFor="name">{translate("first_name")}</label>
                  <input
                    id="name"
                    type="text"
                    placeholder={translate("first_name")}
                    className={`forminput ${errors.name ? "invalid" : ""}`}
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="last_name">{translate("last_name")}</label>
                  <input
                    id="last_name"
                    type="text"
                    placeholder={translate("last_name")}
                    className={`forminput ${errors.lastName ? "invalid" : ""}`}
                    {...register("lastName", { required: true })}
                  />
                </div>
              </div>
              <div className="item">
                <label htmlFor="email">{translate("email")}</label>
                <input
                  type="email"
                  placeholder={translate("email")}
                  className={`forminput ${errors.email ? "invalid" : ""}`}
                  {...register("email", { required: true })}
                />
              </div>
              <div className="item">
                <label>{translate("phone_number")}</label>
                <input
                  type="text"
                  placeholder={translate("phone_number")}
                  className={`forminput ${errors.phone ? "invalid" : ""}`}
                  {...register("phone", { required: true })}
                  onInput={(e) => handleInput(e, "phone")}
                />
              </div>
              <div className="item">
                <label htmlFor="phone">
                  {translate("additional_phone_number")}
                </label>
                <input
                  type="text"
                  className={`forminput`}
                  placeholder={translate("additional_phone_number")}
                  {...register("optionalPhone", { required: false })}
                  onInput={(e) => handleInput(e, "optionalPhone")}
                />
              </div>
              <div className="item">
                <label htmlFor="country">{translate("country")}</label>
                <Controller
                  name="countryId"
                  control={control}
                  rules={{
                    required: "Country is required", // Mensaje de error personalizado
                  }}
                  render={({ fieldState }) => (
                    <SelectBooking
                      options={countries}
                      isSearchable={true}
                      customStyles={fieldState.error && { borderColor: "Red" }}
                      placeholder={translate("select_country")}
                      onChange={(e) => {
                        setValue("countryId", e, {
                          shouldValidate: true,
                        });
                      }}
                      value={countries.find(
                        (e) => e.value === country?.value
                      )}
                    />
                  )}
                />
              </div>
              <div className="item customer">
                <div className="form-item">
                  <label htmlFor="airline">{translate("airline")}</label>
                  <input
                    className={`forminput ${errors.airline ? "invalid" : ""}`}
                    type="text"
                    placeholder={translate("airline")}
                    {...register("airline", { required: true })}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="flight_number">
                    {translate("flight_number")}
                  </label>
                  <input
                    className={`forminput ${errors.flight_number ? "invalid" : ""
                      }`}
                    type="text"
                    placeholder={translate("flight_number")}
                    {...register("flight_number", { required: true })}
                  />
                </div>
              </div>

              <div className="item">
                <label htmlFor="comments">{translate("comments")}</label>
                <textarea
                  rows={10}
                  className={`forminput ${errors.additionalNotes ? "invalid" : ""
                    }`}
                  placeholder={translate("comments")}
                  {...register("additionalNotes", { required: true })}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="right">
            <h2>{translate("additional_info")}</h2>
            <div className="additional-info">
              <div className="item">
                <strong>{translate("origin_address")}:</strong>
                <span>
                  {translateCountry(
                    origin?.formatted_address,
                    " Dominican Republic",
                    ` ${translate("do")}`
                  )}
                </span>
              </div>
              <div className="item">
                <strong>{translate("destination_address")}:</strong>
                <span>
                  {translateCountry(
                    destination?.formatted_address,
                    " Dominican Republic",
                    ` ${translate("do")}`
                  )}
                </span>
              </div>
              <div className="item">
                <strong>{translate("trip_type")}:</strong>
                <span>
                  {trip_type === 1
                    ? translate("one_way")
                    : translate("round_trip")}
                </span>
              </div>
              <div className="item">
                <strong>{translate("departure_date_time")}:</strong>
                <span>
                  {formatHour(departureHour)} -
                  {idiom === "es" ? fechaEnEspanol : fechaEnIngles}
                </span>
              </div>

              <div className="item">
                <strong>{translate("travel_duration")}:</strong>
                <span>{duration?.text ? duration.text : "---"}</span>
              </div>

              <div className="item">
                <strong>{translate("vehicle")}:</strong>
                <span>
                  {vehicle?.brand} {vehicle?.model} de {vehicle?.capacity}&nbsp;
                  {translate("people")}
                </span>
              </div>
              <div className="item">
                <strong>{translate("num_passengers")}:</strong>
                <span>{passengerNo}</span>
              </div>
              <div className="item">
                <strong>{translate("num_bags")}:</strong>
                <span>{bagsNo}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1>{translate("reservation")}</h1>
          <Table
            columns={[translate("trip"), translate("subtotal")]}
            data={[
              {
                accesor:
                  trip_type === 1
                    ? translate("one_way")
                    : translate("round_trip"),
                total: moneyFormant(total),
                key: "accesor",
                value: "total",
              },
              {
                accesor: "Subtotal",
                total: moneyFormant(total),
                key: "accesor",
                value: "total",
              },
              {
                accesor: "Total",
                total: moneyFormant(total),
                key: "accesor",
                value: "total",
              },
            ]}
          />
          <div className="payment-method">
            <label className="payment-item">
              {translate("cash")}
              <input
                type="radio"
                id="Cash"
                checked={paymentMethod === "Cash"}
                onChange={() => {
                  setPaymentMethod("Cash");
                }}
              />
              <span className="radio-label"></span>
            </label>
            <label className="payment-item">
              {translate("card")}
              <input
                type="radio"
                id="card"
                checked={paymentMethod === "Card"}
                onChange={() => {
                  setPaymentMethod("Card");
                }}
              />
              <span className="radio-label"></span>
            </label>
            <div className="about-card-payment">
              <span className="clippy"></span>
              <span className="advice">{translate("card_payment_note")}</span>
            </div>
            <Button
              properties={{
                type: "secondary",
                onClickfn: () => {
                  triggerSubmit();
                },
                disabled: createOrder.isLoading,
              }}
            >
              {createOrder.isLoading
                ? translate("reserving")
                : translate("schedule_reservation")}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;

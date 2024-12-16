import { Table } from "@/shared/components/table/Table";
import { useBookingStore } from "@/shared/hooks/booking/useBookingStore";
import { enUS } from "date-fns/locale/en-US";
import { es } from "date-fns/locale/es";
import "./Checkout.scss";
import { format } from "date-fns";
import { useIdiom } from "@/context/idiomContext";
import { IdiomTypes } from "@/context/idiomTypes";
import { Controller, FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { CheckoutService } from "./services/checkoutService";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import Button from "@/shared/components/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react";
import { customToast } from "@/utils/functions/customToast";
import { formatHour } from "@/utils/functions/formatHour";
import { request } from "@/utils/api/request";
import { Country } from "@/models/country/country";
import Select from "react-select";
interface Inputs {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  optionalPhone: string;
  countryId: {value:string,label:string};
  airline: string;
  flight_number: string;
  additionalNotes: string;
}
interface OrderData extends Omit<Inputs, "countryId"> {
  origin?: string;
  destination?: string;
  trip_type?: number;
  passengers?: number;
  luggage?: number;
  departureDate?: Date;
  countryId?:string;
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
  const [contries, setCountries] = useState<any>(null);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const { state } = useLocation();
  const { origin,
    destination,
    trip_type,
    passengerNo,
    distance,
    duration,
    bagsNo,
    departureDate,
    departureHour,
    returnHours,
    returnDate, } = state?.order || {};
  const { data, isLoading} = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await request.get("countries/getCountries");
      return res.data;
    }
  })
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createOrder = useMutation({
    mutationFn: async (order: OrderData) => {
      try {
        const res = await CheckoutService.createOrder(order);
        return res;
      } catch (error) {
        toast.error("Hubo un error al crear la orden");
        return Promise.reject(error);
      }
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      navigate("/order/confirmation", { state: { orderCreated: data.orderCreated } });
      reset();
    },
    onError: () => {
      toast.error("Hubo un error al crear la orden");
    },
  });

  const {
    setVehicle,
    setTotal,
    paymentMethod,
    setPaymentMethod,
    total,
    vehicle
  } = useBookingStore();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data.countryId)
    const order: OrderData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      optionalPhone: data.optionalPhone,
      origin,
      destination,
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
      total
    };
    createOrder.mutate(order);
  };
  const handleInput = (event: React.FormEvent<HTMLInputElement>, key: "name" | "lastName" | "email" | "phone" | "optionalPhone" | "countryId" | "airline" | "flight_number" | "additionalNotes") => {
    const value = event.currentTarget.value;
    // Elimina caracteres no numéricos
    const numericValue = value.replace(/[^0-9]/g, '');
    event.currentTarget.value = numericValue;
    setValue(key, numericValue, { shouldValidate: true });
  };
  const onError = (errors: FieldErrors<Inputs>) => {
    if (errors.name) {
      customToast("error", "Complete el campo nombre")
    }
    else if (errors.lastName) {
      customToast("error", "Complete el campo apellido")
    }
    else if (errors.email) {
      customToast("error", "Complete el campo email")
    }
    else if (errors.phone) {
      customToast("error", "Complete el campo telefono")
    }
    else if (errors.countryId) {
      customToast("error", "Complete el campo pais")
    }
    else if (errors.airline) {
      customToast("error", "Complete el campo aerolinea")
    }
    else if (errors.flight_number) {
      customToast("error", "Complete el campo vuelo")
    }
    else if (errors.additionalNotes) {
      customToast("error", "Complete el campo comentarios")
    }
  }
  const today = new Date();
  const { idiom } = useIdiom() as IdiomTypes;
  const fechaEnEspanol = format(departureDate ?? today, "d 'de' MMMM 'de' yyyy", { locale: es });
  const fechaEnIngles = format(departureDate ?? today, "MMMM d, yyyy", { locale: enUS });
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
  }, [state, setVehicle, setTotal])

  useEffect(() => {
    if (!isLoading && data) {
      setCountries(data.map((e: Country) => ({ value: e.country_id, label: e.country })))
    }
  }, [isLoading, data])
  if (!state) {
    return (
      <div
        style={{
          height: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          boxSizing: 'border-box',
        }}
      >
        Debe completar los demas pasos de la reservacion
        <Button properties={{ type: "back", onClickfn: () => { navigate("/#booking") } }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Reservar
        </Button>
      </div>
    );
  }

  const triggerSubmit = () => {
    handleSubmit(onSubmit, onError)();
  };

  return (
    <motion.div className="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: "spring", duration: 0.3 }} ref={checkoutRef}>
      <Toaster />
      <div className="wrapper">
        <div className="top" style={{ display: "flex" }}>
          <div className="left">
            <h2 id="checkout">Datos de Facturación</h2>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit, onError)}
              className="checkout-form"
            >
              <div className="item customer">
                <div className="form-item">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    className={`forminput ${errors.name ? "invalid" : ""}`}
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="last_name">LastName</label>
                  <input
                    id="last_name"
                    type="text"
                    placeholder="Last Name"
                    className={`forminput ${errors.lastName ? "invalid" : ""}`}
                    {...register("lastName", { required: true })}
                  />
                </div>
              </div>
              <div className="item">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className={`forminput ${errors.email ? "invalid" : ""}`}
                  {...register("email", { required: true })}
                />
              </div>
              <div className="item">
                <label>Phone number</label>
                <input
                  type="text"
                  placeholder="Phone number"
                  className={`forminput ${errors.phone ? "invalid" : ""}`}
                  {...register("phone", { required: true })}
                  onInput={(e) => handleInput(e, "phone")}
                />
              </div>
              <div className="item">
                <label htmlFor="phone">Additional Phone number</label>
                <input
                  type="text"
                  className={`forminput`}
                  placeholder="Additional Phone number"
                  {...register("optionalPhone", { required: false })}
                  onInput={(e) => handleInput(e, "optionalPhone")}

                />
              </div>
              <div className="item">
                <label htmlFor="country">Country</label>
                <Controller
                  name="countryId"
                  control={control}
                  rules={{
                    required: "Country is required", // Mensaje de error personalizado
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        options={contries}
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            backgroundColor: "transparent",
                            borderRadius: "10px",
                            display: "flex",
                            height: "47px",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "12px",
                            borderColor: "rgba(51, 55, 64, 0.3)",
                            boxShadow: "none",
                            "&:hover": {
                              borderColor: "rgba(51, 55, 64, 0.5)", // Ajusta el color del borde en hover
                            },
                          }),
                          menu: (baseStyles) => ({
                            ...baseStyles,
                            borderRadius: "10px",
                            fontSize: "12px",
                            backgroundColor: "#f2f2f2",
                            fontWeight: 600,
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: state.isFocused
                              ? "rgba(242, 75, 15, 0.1)"
                              : "transparent",
                            color: state.isFocused ? "orange" : "inherit",
                            "&:active": {
                              backgroundColor: "rgba(242, 75, 15, 0.2)",
                            },
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                          dropdownIndicator: () => ({
                            display: "none",
                          }),
                          valueContainer: (baseStyles) => ({
                            ...baseStyles,
                            padding: "0",
                            margin: "0 8px",
                          }),
                          singleValue: (baseStyles) => ({
                            ...baseStyles,
                            margin: "0",
                            paddingLeft: "0",
                          }),
                        }}
                        placeholder="Select a country"
                        menuPlacement="auto"
                        menuPosition="fixed"
                        isSearchable={false}
                      />
                      {error && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {error.message}
                        </span>
                      )}
                    </>
                  )}
                />


                {/* <input
                  className={`forminput ${errors.countryId ? "invalid" : ""}`} type="text"
                  placeholder="Country"
                  {...register("countryId", { required: true })}
                /> */}
              </div>
              <div className="item customer">
                <div className="form-item">
                  <label htmlFor="airline">Airline</label>
                  <input
                    className={`forminput ${errors.airline ? "invalid" : ""}`} type="text"
                    placeholder="Airline"
                    {...register("airline", { required: true })}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="flight_number">Flight number</label>
                  <input
                    className={`forminput ${errors.flight_number ? "invalid" : ""}`} type="text"
                    placeholder="Flight number"
                    {...register("flight_number", { required: true })}
                  />
                </div>
              </div>

              <div className="item">
                <label htmlFor="comments">Comments</label>
                <textarea rows={10}
                  className={`forminput ${errors.additionalNotes ? "invalid" : ""}`}
                  placeholder="Comments"
                  {...register("additionalNotes", { required: true })}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="right">
            <h2>Información Adicional</h2>
            <div className="additional-info">
              <div className="item">
                <strong>Direccion de inicio:</strong>
                <span>{origin}</span>
              </div>
              <div className="item">
                <strong>Direccion de destino:</strong>
                <span>{destination}</span>
              </div>
              <div className="item">
                <strong>Tipo de viaje:</strong>
                <span>{trip_type === 1 ? "Ida" : "Ida y vuelta"}</span>
              </div>
              <div className="item">
                <strong>Fecha y hora de salida:</strong>
                <span>
                  {formatHour(departureHour)} -{" "}
                  {idiom === "es" ? fechaEnEspanol : fechaEnIngles}
                </span>
              </div>

              <div className="item">
                <strong>Tiempo de viaje:</strong>
                <span>{duration?.text ? duration.text : "---"}</span>
              </div>

              <div className="item">
                <strong>Vehiculo:</strong>
                <span>
                  {vehicle?.brand} {vehicle?.model} de {vehicle?.capacity}{" "}
                  personas
                </span>
              </div>
              <div className="item">
                <strong>Ocupantes:</strong>
                <span>{passengerNo}</span>
              </div>
              <div className="item">
                <strong>Maletas:</strong>
                <span>{bagsNo}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1>Reserva</h1>
          <Table
            columns={["Viaje", "Total parcial"]}
            data={[
              {
                type: trip_type === 1 ? "Ida" : "Ida y vuelta",
                total: moneyFormant(total),
                key: "type",
                value: "total",
              },
              {
                subtotal: "Subtotal",
                total: moneyFormant(total),
                key: "subtotal",
                value: "total",
              },
              {
                total: "Total",
                totalCost: moneyFormant(total),
                key: "total",
                value: "totalCost",
              },
            ]}
          />
          <div className="payment-method">
            <label className="payment-item">
              Efectivo
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
              Tarjeta
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
              <span className="advice">
                Al elegir la opcion de pagar con tarjeta, esta se utilizara una
                vez pasemos a por usted.
              </span>
            </div>
            <Button
              properties={{
                type: "secondary",
                onClickfn: () => {
                  triggerSubmit();
                },
                disabled: createOrder.isLoading
              }}
            >
              {createOrder.isLoading ? "Reservando..." : "Agendar reserva"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;

import { Table } from "../../../shared/components/table/Table";
import { useBookingStore } from "../../../shared/hooks/booking/useBookingStore";
import { enUS } from "date-fns/locale/en-US";
import { es } from "date-fns/locale/es";
import "./Checkout.scss";
import { format } from "date-fns";
import { useIdiom } from "../../../context/idiomContext";
import { IdiomTypes } from "../../../context/idiomTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import { CheckoutService } from "./services/checkoutService";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { moneyFormant } from "../../../utils/functions/moneyFormat";
import Button from "../../../shared/components/button/Button";
import { useNavigate } from "react-router-dom";
import { useConfirmationStore } from "../../../shared/hooks/confirmation/useConfirmationStore";
import {motion} from 'framer-motion'
interface Inputs {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  optionalPhone: string;
  countryId: string;
  airline: string;
  flight_number: string;
  additionalNotes: string;
}
const Checkout = () => {
  const {
    register,
    // setValue,
    handleSubmit,
    // watch,
    // control,
    reset,
    // formState: { errors },void;
  } = useForm<Inputs>();
  const {addOrder}  = useConfirmationStore()
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createOrder = useMutation({
    mutationFn: async (order: any) => {
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
      addOrder(data.orderCreated)
      reset();
      navigate("/order/confirmation");
    },
    onError: () => {
      toast.error("Hubo un error al crear la orden");
    },
  });
  
  const {
    trip_type,
    passengerNo,
    bagsNo,
    departureHour,
    departureDate,
    vehicle,
    origin,
    distance,
    duration,
    destination,
    paymentMethod,
    setPaymentMethod,
    total,
  } = useBookingStore();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const order = {
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
      // returnDateset
      // returnHours
      countryId: "245feb84-471b-4d9f-8de6-87b9768a6489",
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
  const fecha = departureDate;
  const { idiom } = useIdiom() as IdiomTypes;
  const fechaEnEspanol = format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es });
  const fechaEnIngles = format(fecha, "MMMM d, yyyy", { locale: enUS });

  if (!vehicle) {
    return (
      <div
        style={{
          height: "calc(100vh - 80px)",
          display: "flex",
          boxSizing:'border-box',
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No hay vehiculo seleccionado
      </div>
    );
  }

  const triggerSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <motion.div className="checkout" initial={{x:-100, opacity:0}} animate={{x:0, opacity:1}}  transition={{type:"spring", duration:0.3}}> 
      <Toaster />
      <div className="wrapper">
        <div className="top" style={{ display: "flex" }}>
          <div className="left">
            <h2>Datos de Facturación</h2>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="checkout-form"
            >
              <div className="item customer">
                <div className="form-item">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    className="forminput"
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="last_name">LastName</label>
                  <input
                    id="last_name"
                    className="forminput"
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName", { required: true })}
                  />
                </div>
              </div>
              <div className="item">
                <label htmlFor="email">Email</label>
                <input
                  className="forminput"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="item">
                <label>Phone number</label>
                <input
                  className="forminput"
                  type="text"
                  placeholder="Phone number"
                  {...register("phone", { required: true })}
                />
              </div>
              <div className="item">
                <label htmlFor="phone">Additional Phone number</label>
                <input
                  className="forminput"
                  type="text"
                  placeholder="Additional Phone number"
                  {...register("optionalPhone", { required: true })}
                />
              </div>
              <div className="item">
                <label htmlFor="country">Country</label>
                <input
                  className="forminput"
                  type="text"
                  placeholder="Country"
                  {...register("countryId", { required: true })}
                />
              </div>
              <div className="item customer">
                <div className="form-item">
                  <label htmlFor="airline">Airline</label>
                  <input
                    className="forminput"
                    type="text"
                    placeholder="Airline"
                    {...register("airline", { required: true })}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="flight_number">Flight number</label>
                  <input
                    className="forminput"
                    type="text"
                    placeholder="Flight number"
                    {...register("flight_number", { required: true })}
                  />
                </div>
              </div>

              <div className="item">
                <label htmlFor="comments">Comments</label>
                <textarea
                  className="forminput"
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
                  {departureHour} -{" "}
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
              }}
            >
              Agendar reserva
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;

import { motion } from "framer-motion";
import "./Vehicle.scss";
import { format } from "date-fns";
import { FC, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { request } from "@/utils/api/request";
import { VehicleModel } from "@/models/booking/vehicle";
import { IdiomTypes } from "@/context/idiomTypes";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "@hooks/booking/useBookingStore";
import useTranslate from "@hooks/translations/Translate";
import { moneyFormant } from "@/utils/functions/moneyFormat";
import { calculateTripCost } from "@/utils/functions/caculateTripCost";
import { VITE_CESAR_API } from "@/config/config";
import Loader from "@/features/loader/Loader";
import { formatHour } from "@/utils/functions/formatHour";
import { useIdiom } from "@hooks/idiom/useIdiom";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
const variants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};
const Vehicle: FC<Props> = ({ setStep }) => {
  const { idiom } = useIdiom() as IdiomTypes;
  const {
    passengerNo,
    bagsNo,
    departureHour,
    departureDate,
    distance,
    trip_type,
    duration,
    origin,
    destination,
    returnHours,
    returnDate,
  } = useBookingStore();
  let kilometers = 0;
  if (distance) {
    kilometers = Math.ceil(distance.value / 1000);
  }
  const { translate } = useTranslate();
  const order = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );
  const [vehicleData, setVehicleData] = useState<VehicleModel[] | null>(null);
  const navigate = useNavigate();
  console.log(departureDate);
  const { data, isLoading, isError } = useQuery(
    "vehicles",
    async () => {
      const res = await request.get(`vehicle/getVehicles`, {
        params: {
          capacity: passengerNo,
          luggage_capacity: bagsNo,
          departureDate,
          returnDate,
        },
      });
      return res.data;
    },
    { refetchOnWindowFocus: false }
  );
  const memoizedVehicles = useMemo(() => {
    if (!vehicleData) return null;
    return vehicleData.map((e: VehicleModel) => ({
      ...e,
      totalCost: calculateTripCost(+e.price_per_km, kilometers, trip_type),
    }));
  }, [vehicleData, kilometers, trip_type]);

  const memoizedContent = useMemo(() => {
    if (isError) {
      return (
        <div
          style={{ height: "100%", display: "flex", justifyContent: "center" }}
        >
          <span>Something went wrong</span>
        </div>
      );
    } else if (isLoading) {
      return (
        <div
          style={{ height: "100%", display: "flex", justifyContent: "center" }}
        >
          <Loader />
        </div>
      );
    } else if (!memoizedVehicles || memoizedVehicles.length === 0) {
      return <div>{translate("no_vehicles_available")}</div>;
    } else {
      return memoizedVehicles.map((e) => (
        <motion.div
          key={crypto.randomUUID()}
          className="vehicle"
          variants={variants}
        >
          <div className="vehicle-img">
            <img
              src={VITE_CESAR_API + "/" + e.img_url}
              alt="Tahoe Suburban"
              loading="lazy"
            />
          </div>

          <div className="features">
            <div className="vehicle-info">
              <span>
                {e.brand} {e.model}
              </span>
              <span className="price">{moneyFormant(e.totalCost)}</span>
            </div>

            <div className="book-now">
              <div className="more">
                <div className="people">
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
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <span>{e.capacity}</span>
                </div>
                <div className="luggage">
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
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>

                  <span>{e.luggage_capacity}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/checkout", {
                    state: { vehicle: e, total: e.totalCost, order },
                  });
                }}
              >
                {translate("book")}
              </button>
            </div>
          </div>
        </motion.div>
      ));
    }
  }, [isError, isLoading, memoizedVehicles, navigate, order, translate]);

  useEffect(() => {
    if (!isLoading && data) {
      setVehicleData(data);
    }
  }, [isLoading, data]);
  return (
    <div className="select-vehicle">
      <div className="booking-info">
        <div className="container-info">
          <h2>{translate("trip_info")}</h2>
          <div className="route">
            <span>{translate("route")}</span>
            <span>
              {origin} <span> {"->"} </span> {destination}
            </span>
          </div>
          <div className="route">
            <span>{translate("trip_type")}</span>
            <span>{trip_type == 1 ? "Ida" : "Ida y vuelta"}</span>
          </div>
          <div className="collection-time">
            <span>{translate("pickup_time")}</span>
            <span>
              {format(
                departureDate,
                idiom === "es" ? "dd/MM/yyyy" : "MM/dd/yyy"
              )}
              - {formatHour(departureHour)}
            </span>
          </div>
          <div className="distance">
            <span>{translate("distance2")}</span>
            <span>{distance?.text}</span>
          </div>
          <div className="duration">
            <span>{translate("time2")}</span>
            <span>{duration?.text}</span>
          </div>
        </div>
        <button onClick={() => setStep(1)} className="back-button">
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
          <span>{translate("back")}</span>
        </button>
      </div>

      <motion.div
        className="vehicle-list"
        initial="initial"
        animate="animate"
        variants={variants}
      >
        {memoizedContent}
      </motion.div>
    </div>
  );
};

export default Vehicle;

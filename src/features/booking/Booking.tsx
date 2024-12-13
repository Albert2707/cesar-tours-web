import { useState } from "react";
import useTranslate from "@hooks/translations/Translate";
import "./Booking.scss";
import { generateTimeOptions } from "@/utils/functions/functions";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Directions } from "./components/directions/Directions";
import { AutocompleteCustom } from "./components/autoComplete/AutoComplete";
import Vehicle from "./components/steps/Vehicle";
import { Toaster, toast } from "react-hot-toast";
import DatePicker, { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale/en-US";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { useIdiom } from "@/context/idiomContext";
import { IdiomTypes } from "@/context/idiomTypes";
// import { useBookingStore } from "../../shared/hooks/booking/useBookingStore";
import { useBookingStore } from "@hooks/booking/useBookingStore";
import { AnimatePresence, motion } from "framer-motion";
import SelectBooking from "@/shared/components/selectBooking/SelectBooking";
import { customToast } from "@/utils/functions/customToast";
import { VITE_GOOGLE_API_KEY, VITE_CESAR_API } from "@/config/config";


const center = { lat: 18.6652932, lng: -71.4493516 };

interface TripType {
  value: number;
  label: string;
}
const Booking = () => {
  registerLocale("en", enUS);
  registerLocale("es", es);
  console.log(VITE_CESAR_API)
  const today = new Date();
  const { idiom } = useIdiom() as IdiomTypes;
  const { translate } = useTranslate();
  const [step, setStep] = useState(1);
  const [originAddress, setOriginAddress] = useState<any>(null);
  const {
    passengerNo,
    departureDate,
    destination,
    departureHour,
    bagsNo,
    origin: originTrip,
    trip_type,
    setDepartureHour,
    setTripType,
    setDepartureDate,
    setNoPassenger,
    setBagsNo,
    setReturnDate,
    setReturnHour,
    returnHours,
    returnDate
  } = useBookingStore();
  const [destinationAddress, setDestinationAddress] = useState<any>(null);
  const hours = generateTimeOptions();
  const noPassengers = [];
  const noBags = [];
  for (let i = 1; i <= 30; i++) {
    noPassengers.push({ value: i, label: i });
  }
  for (let i = 0; i <= 16; i++) {
    noBags.push({ value: i, label: i });
  }

  const tripType: TripType[] = [
    { value: 1, label: translate("one_way") },
    { value: 2, label: translate("round_trip") },
  ];
  const handleOriginSelect = (place: google.maps.places.PlaceResult | null) => {
    if (place) {
      setOriginAddress({
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      });
    }
  };

  const handleDestinationSelect = (
    place: google.maps.places.PlaceResult | null
  ) => {
    if (place) {
      setDestinationAddress({
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      });
    }
  };
  const handlePlaceSelect = (
    place: google.maps.places.PlaceResult | null,
    type: "origin" | "destination"
  ) => {
    if (type === "origin" && place) {
      handleOriginSelect(place);
    } else {
      handleDestinationSelect(place);
    }
  };
  return (
    <div className="booking" id="booking">
      <Toaster />
      <div className="container">
        <div className="wrapper">
          <h2 className="booking_title">{translate("booking_prompt")}</h2>
          <div className="booking-container">
            <div className="steps">
              <div className="step done">1</div>
              <div className="steps-progress">
                <div
                  className={` progress ${step === 2 || step === 3 ? "done" : ""
                    }`}
                ></div>
              </div>
              <div
                className={` step ${step === 2 || step === 3 ? "done" : ""}`}
              >
                2
              </div>
              <span className="steps-progress">
                <div className={` progress ${step === 3 ? "done" : ""}`}></div>
              </span>
              <div className={` step ${step === 3 ? "done" : ""}`}>3</div>
            </div>
            {step === 1 && (
              <APIProvider apiKey={VITE_GOOGLE_API_KEY}>
                <div className="contain">
                  <div className="left">
                    <motion.form
                      action=""
                      className="booking-form"
                    >
                      <div className="form-item">
                        <label htmlFor="address">
                          {translate("origin_address")}
                        </label>
                        <AutocompleteCustom
                          onPlaceSelect={(place) =>
                            handlePlaceSelect(place, "origin")
                          }
                          isOrigin={true}
                        />
                      </div>
                      <div className="form-item">
                        <label htmlFor="addressDestination">
                          {translate("destination_address")}
                        </label>
                        <AutocompleteCustom
                          onPlaceSelect={(place) =>
                            handlePlaceSelect(place, "destination")
                          }
                          isOrigin={false}
                        />
                      </div>
                      {/* Trip type/ tipo de viaje */}
                      <div className="form-item">
                        <label htmlFor="tripType">
                          {translate("trip_type")}
                        </label>
                        <SelectBooking
                          options={tripType}
                          placeholder="travelType"
                          onChange={(e) => {
                            const { value } = e as TripType;
                            setTripType(value);
                          }}
                          value={tripType.find((e) => e.value === trip_type)}
                        />
                      </div>
                      {/*baggageNo, passengerNo*/}
                      <div className="form-item">
                        <div className="more-info">
                          <div className="passengerNo">
                            <label htmlFor="passengerNo">
                              {translate("num_passengers")}
                            </label>
                            <SelectBooking
                              options={noPassengers}
                              placeholder="travelType"
                              onChange={(e) => {
                                const { value } = e as { value: number };
                                setNoPassenger(value);
                              }}
                              value={noPassengers.find(
                                (e) => e.value === passengerNo
                              )}
                            />
                          </div>
                          <div className="baggageNo">
                            <label htmlFor="baggageNo">
                              {translate("num_bags")}
                            </label>
                            <SelectBooking
                              options={noBags}
                              placeholder="travelType"
                              onChange={(e) => {
                                const { value } = e as { value: number };
                                setBagsNo(value);
                              }}
                              value={noBags.find((e) => e.value === bagsNo)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="departure-date">
                        {/* Departure date/ fecha de salida */}
                        <div className="departure-datePicker">
                          <label htmlFor="outDate">
                            {translate("departure_date")}
                          </label>
                          <DatePicker
                            className="datePicker"
                            selected={departureDate}
                            minDate={today}
                            onChange={(date) => {
                              if (!date) return toast.error("Debe seleccionar una fecha");
                              setDepartureDate(date as Date)
                            }}
                            locale={idiom}
                            dateFormat={
                              idiom === "es" ? "dd/MM/yyyy" : "MM/dd/yyy"
                            }
                          />
                          {/* <input type="date" id="outDate" /> */}
                        </div>
                        {/* Departure hour / hora de partida */}
                        <div className="departure-hour">
                          <label htmlFor="outHour">
                            {translate("departure_time")}
                          </label>
                          <SelectBooking
                            options={hours}
                            placeholder="time"
                            onChange={(e) => {
                              const { value } = e as { value: string };
                              setDepartureHour(value);
                            }}
                            value={hours.find((e) => e.value === departureHour)}
                          />
                        </div>
                      </div>
                      <AnimatePresence>
                        {trip_type === 2 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            exit={{ opacity: 0 }}
                            className="departure-date"
                          >
                            {/* Departure date/ fecha de salida */}
                            <div className="departure-datePicker">
                              <label htmlFor="outDate">
                                {translate("Fecha regreso")}
                              </label>
                              <DatePicker
                                className="datePicker"
                                selected={returnDate}
                                minDate={departureDate}
                                onChange={(date) => {
                                  if (!date) return toast.error("Debe seleccionar una fecha");
                                  setReturnDate(date as Date)
                                }
                                }
                                locale={idiom}
                                dateFormat={
                                  idiom === "es" ? "dd/MM/yyyy" : "MM/dd/yyy"
                                }
                              />
                              {/* <input type="date" id="outDate" /> */}
                            </div>
                            {/* Departure hour / hora de partida */}
                            <div className="departure-hour">
                              <label htmlFor="outHour">
                                {translate("Hora regreso")}
                              </label>
                              <SelectBooking
                                options={hours}
                                placeholder="time"
                                onChange={(e) => {
                                  const { value } = e as { value: string };
                                  setReturnHour(value);
                                }}
                                value={hours.find(
                                  (e) => e.value === returnHours
                                )}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.form>
                  </div>
                  <div className="right">
                    <div className="map">
                      <Map
                        style={{ width: "100%", height: "100%" }}
                        defaultCenter={center}
                        defaultZoom={7}
                        gestureHandling={"greedy"}
                        disableDefaultUI={true}
                      >
                        {originAddress && (
                          <Marker
                            position={originAddress}
                            clickable={true}
                            onClick={() => alert("marker was clicked!")}
                            title={"clickable google.maps.Marker"}
                          />
                        )}
                        {destinationAddress && (
                          <Marker
                            position={destinationAddress}
                            clickable={true}
                          />
                        )}
                      </Map>
                      <Directions
                        origin={originAddress}
                        destination={destinationAddress}
                      />
                      <button
                        type="submit"
                        aria-label="Seleccionar vehiculo"
                        className="btn-selectec-vehicle"
                        onClick={() => {
                          if (!departureHour)
                            return customToast("error", "Seleccione una hora");
                          if (!departureDate)
                            return customToast("error", "Seleccione una fecha");
                          if (!returnDate)
                            return customToast("error", "Seleccione una fecha");
                          if (trip_type == 2 && !returnHours)
                            return customToast("error", "Seleccione una hora de regreso");
                          if (!originTrip)
                            return customToast("error", "Seleccione direccion de origen");
                          if (!destination)
                            return customToast("error", "Seleccione direccion de destino");
                          setStep(2);
                        }}
                      >
                        {translate("selectVehicle")}
                      </button>
                    </div>
                  </div>
                </div>
              </APIProvider>
            )}
            {step === 2 && <Vehicle setStep={setStep} />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Booking;

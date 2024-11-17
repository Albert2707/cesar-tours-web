import { useState } from "react";
import useTranslate from "../../hooks/translations/Translate";
import "./Booking.scss";
import Select from "react-select";
import { generateTimeOptions } from "../../utils/functions/functions";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Directions } from "./components/directions/Directions";
import { AutocompleteCustom } from "./components/autoComplete/AutoComplete";
import Vehicle from "./components/steps/Vehicle";
import { Toaster, toast } from "react-hot-toast";
import DatePicker, { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale/en-US";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { useIdiom } from "../../context/idiomContext";
import { IdiomTypes } from "../../context/idiomTypes";
import { useBookingStore } from "../../hooks/booking/useBookingStore";
// import { Geo } from "../../models/reviewCardType";

// const debounce = (func, delay) => {
//   let timeoutId: NodeJS.Timeout;
//   return (...args) => {
//     if (timeoutId) clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func.apply(null, args);
//     }, delay);
//   };
// };
// const { VITE_GOOGLE_API_KEY } = import.meta.env;
const center = { lat: 18.6652932, lng: -71.4493516 };

// interface Inputs {
//   trip_type?: number;
//   passengerNo?: number;
//   bagsNo?: number;
//   hour?: string;
// }

interface TripType {
  value: number;
  label: string;
}

const Booking = () => {
  registerLocale("en", enUS);
  registerLocale("es", es);
  const { idiom } = useIdiom() as IdiomTypes;
  const { translate } = useTranslate();
  const [step, setStep] = useState(1);
  const [originAddress, setOriginAddress] = useState<any>(null);
  const { passengerNo,departureDate,departureHour, bagsNo, trip_type, setDepartureHour,setTripType,setDepartureDate,setNoPassenger,setBagsNo} = useBookingStore();
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
  // const [originPlace, setOriginPlace] =
  //   useState<google.maps.places.PlaceResult | null>(null);
  // const [destinationPlace, setDestinationPlace] =
  //   useState<google.maps.places.PlaceResult | null>(null);
  const tripType: TripType[] = [
    { value: 1, label: translate("one_way") },
    { value: 2, label: translate("round_trip") },
  ];

  const handlePlaceSelect = (
    place: google.maps.places.PlaceResult | null,
    isOrigin: boolean
  ) => {
    if (isOrigin) {
      setOriginAddress({
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      });
    } else {
      setDestinationAddress({
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      });
    }
  };
  return (
    <section className="booking" id="booking">
      <Toaster />
      <div className="wrapper">
        <h2>{translate("booking_prompt")}</h2>
        <div className="booking-container">
          <div className="steps">
            <div className="step done">1</div>
            <div className="steps-progress">
              <div
                className={` progress ${step === 2 || step === 3 ? "done" : ""}`}
              ></div>
            </div>
            <div className={` step ${step === 2 || step === 3 ? "done" : ""}`}>
              2
            </div>
            <span className="steps-progress">
              <div className={` progress ${step === 3 ? "done" : ""}`}></div>
            </span>
            <div className={` step ${step === 3 ? "done" : ""}`}>3</div>
          </div>
          {step === 1 && (
            <APIProvider apiKey={""}>
              <div className="container">
                <div className="left">
                  <form action="" className="booking-form">
                    <div className="form-item">
                      <label htmlFor="address">
                        {translate("origin_address")}
                      </label>
                      <AutocompleteCustom
                        onPlaceSelect={(place) =>
                          handlePlaceSelect(place, true)
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
                          handlePlaceSelect(place, false)
                        }
                        isOrigin={false}
                      />
                    </div>
                    {/* Trip type/ tipo de viaje */}
                    <div className="form-item">
                      <label htmlFor="tripType">{translate("trip_type")}</label>
                      <Select
                        options={tripType}
                        value={tripType.find((e) => e.value === trip_type)}
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
                            boxShadow: "none", // Remueve o cambia el borde en foco
                            "&:hover": {
                              borderColor: "none", // Color del borde en hover
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
                              ? "rgba(242, 75, 15, 0.1);"
                              : "transparent", // Cambia el color de fondo en hover
                            color: state.isFocused ? "orange" : "inherit", // Cambia el color del texto en hover
                            "&:active": {
                              backgroundColor: "rgba(242, 75, 15, 0.1)", // Color de fondo al hacer clic
                            },
                          }),
                          indicatorSeparator: (styles) => ({
                            ...styles,
                            display: "none",
                          }),
                          dropdownIndicator: (styles) => ({
                            ...styles,
                            display: "none",
                          }),
                          valueContainer: (baseStyles) => ({
                            ...baseStyles,
                            padding: "0", // Remueve padding para centralizar mejor el texto
                            margin: "0 8px", // Ajusta el margen para que el texto esté centrado
                          }),
                          singleValue: (baseStyles) => ({
                            ...baseStyles,
                            margin: "0", // Remueve margen adicional si lo hay
                            paddingLeft: "0", // Asegura que el texto esté centrado en el control
                          }),
                        }}
                        placeholder={translate("travelType")}
                        onChange={(e) => {
                          const { value } = e as TripType;
                          setTripType(value);
                        }}
                        isSearchable={false}
                      />
                    </div>
                    {/*baggageNo, passengerNo*/}
                    <div className="form-item">
                      <div className="more-info">
                        <div className="passengerNo">
                          <label htmlFor="passengerNo">
                            {translate("num_passengers")}
                          </label>
                          <Select
                            options={noPassengers}
                            value={noPassengers.find(
                              (e) => e.value === passengerNo
                            )}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                backgroundColor: "transparent",
                                borderRadius: "10px 0px 0px 10px",
                                display: "flex",
                                height: "47px",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "12px",
                                borderColor: "rgba(51, 55, 64, 0.3)",
                                boxShadow: "none", // Remueve o cambia el borde en foco
                                "&:hover": {
                                  borderColor: "none", // Color del borde en hover
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
                                  ? "rgba(242, 75, 15, 0.1);"
                                  : "transparent", // Cambia el color de fondo en hover
                                color: state.isFocused ? "orange" : "inherit", // Cambia el color del texto en hover
                                "&:active": {
                                  backgroundColor: "rgba(242, 75, 15, 0.1)", // Color de fondo al hacer clic
                                },
                              }),
                              indicatorSeparator: (styles) => ({
                                ...styles,
                                display: "none",
                              }),
                              dropdownIndicator: (styles) => ({
                                ...styles,
                                display: "none",
                              }),
                              valueContainer: (baseStyles) => ({
                                ...baseStyles,
                                padding: "0", // Remueve padding para centralizar mejor el texto
                                margin: "0 8px", // Ajusta el margen para que el texto esté centrado
                              }),
                              singleValue: (baseStyles) => ({
                                ...baseStyles,
                                margin: "0", // Remueve margen adicional si lo hay
                                paddingLeft: "0", // Asegura que el texto esté centrado en el control
                              }),
                            }}
                            placeholder={translate("travelType")}
                            onChange={(e) => {
                              const {value} = e as {value:number}
                              setNoPassenger(value)
                            }}
                            menuPortalTarget={document.body}
                            menuPlacement="auto"
                            menuPosition="fixed"
                            isSearchable={false}
                          />
                        </div>
                        <div className="baggageNo">
                          <label htmlFor="baggageNo">
                            {translate("num_bags")}
                          </label>
                          <Select
                            options={noBags}
                            value={noBags.find(
                              (e) => e.value ===bagsNo
                            )}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                backgroundColor: "transparent",
                                borderRadius: " 0 10px 10px 0",
                                display: "flex",
                                height: "47px",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "12px",
                                borderColor: "rgba(51, 55, 64, 0.3)",
                                boxShadow: "none", // Remueve o cambia el borde en foco
                                "&:hover": {
                                  borderColor: "none", // Color del borde en hover
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
                                  ? "rgba(242, 75, 15, 0.1);"
                                  : "transparent", // Cambia el color de fondo en hover
                                color: state.isFocused ? "orange" : "inherit", // Cambia el color del texto en hover
                                "&:active": {
                                  backgroundColor: "rgba(242, 75, 15, 0.1)", // Color de fondo al hacer clic
                                },
                              }),
                              indicatorSeparator: (styles) => ({
                                ...styles,
                                display: "none",
                              }),
                              dropdownIndicator: (styles) => ({
                                ...styles,
                                display: "none",
                              }),
                              valueContainer: (baseStyles) => ({
                                ...baseStyles,
                                padding: "0", // Remueve padding para centralizar mejor el texto
                                margin: "0 8px", // Ajusta el margen para que el texto esté centrado
                              }),
                              singleValue: (baseStyles) => ({
                                ...baseStyles,
                                margin: "0", // Remueve margen adicional si lo hay
                                paddingLeft: "0", // Asegura que el texto esté centrado en el control
                              }),
                            }}
                            placeholder={translate("travelType")}
                            onChange={(e) => {
                              const {value} = e as {value:number}
                              setBagsNo(value)
                            }}
                            menuPortalTarget={document.body}
                            menuPlacement="auto"
                            menuPosition="fixed"
                            isSearchable={false}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Departure date/ fecha de salida */}
                    <div className="form-item">
                      <label htmlFor="outDate">
                        {translate("departure_date")}
                      </label>
                      <DatePicker
                        className="datePicker"
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date as Date)}
                        locale={idiom}
                        dateFormat={idiom === "es" ? "dd/MM/yyyy" : "MM/dd/yyy"}
                      />
                      {/* <input type="date" id="outDate" /> */}
                    </div>
                    {/* Departure hour / hora de partida */}
                    <div className="form-item">
                      <label htmlFor="outHour">
                        {translate("departure_time")}
                      </label>
                      <Select
                        options={hours}
                        value={hours.find((e) => e.value === departureHour)}
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
                            boxShadow: "none", // Remueve o cambia el borde en foco
                            "&:hover": {
                              borderColor: "none", // Color del borde en hover
                            },
                          }),
                          // input: (baseStyles) => ({
                          //   ...baseStyles,
                          //   outline: "transparent",
                          // }),
                          menu: (baseStyles) => ({
                            ...baseStyles,
                            borderRadius: "10px",
                            fontSize: "12px",
                            zIndex: "999",
                            backgroundColor: "#f2f2f2",
                            fontWeight: 600,
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: state.isFocused
                              ? "rgba(242, 75, 15, 0.1);"
                              : "transparent", // Cambia el color de fondo en hover
                            color: state.isFocused ? "orange" : "inherit", // Cambia el color del texto en hover
                            "&:active": {
                              backgroundColor: "rgba(242, 75, 15, 0.1)", // Color de fondo al hacer clic
                            },
                          }),
                          indicatorSeparator: (styles) => ({
                            ...styles,
                            display: "none",
                          }),
                          dropdownIndicator: (styles) => ({
                            ...styles,
                            display: "none",
                          }),
                          valueContainer: (baseStyles) => ({
                            ...baseStyles,
                            padding: "0", // Remueve padding para centralizar mejor el texto
                            margin: "0 8px", // Ajusta el margen para que el texto esté centrado
                          }),
                          singleValue: (baseStyles) => ({
                            ...baseStyles,
                            margin: "0", // Remueve margen adicional si lo hay
                            paddingLeft: "0", // Asegura que el texto esté centrado en el control
                          }),
                        }}
                        onChange={(e) => {
                          const {value} = e as {value:string}
                          setDepartureHour(value)
                        }}
                        placeholder={translate("time")}
                        isSearchable={false}
                        menuPortalTarget={document.body}
                        menuPlacement="auto"
                        menuPosition="fixed"
                      />
                    </div>
                  </form>
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
                          // onClick={() => alert("marker was clicked!")}
                          // title={"clickable google.maps.Marker"}
                        />
                      )}
                    </Map>
                    <Directions
                      origin={originAddress}
                      destination={destinationAddress}
                    />
                    <button
                      type="submit"
                      arial-label="clear"
                      className="btn-selectec-vehicle"
                      onClick={() => {
                        if (!trip_type)
                          return toast.error("Seleccione un tipo de viaje");
                        if (!passengerNo)
                          return toast.error(
                            "Seleccione un número de pasajeros"
                          );
                        if (!departureHour)
                          return toast.error("Seleccione una hora");
                        // if(!values.bagsNo) return toast.error("Seleccione un número de bolsas");
                        // if(!originAddress) return toast.error("Debe completar todos los campos")
                        // if(!destinationAddress) return toast.error("Debe completar todos los campos")
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
          {step === 3 && (
            <>
              <button
                type="button"
                arial-label="clear"
                onClick={() => {
                  setStep(2);
                }}
              >
                {translate("volver")}
              </button>
              <button
                type="button"
                arial-label="clear"
                onClick={() => {
                  alert("Llegamos");
                }}
              >
                {translate("Completar")}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;

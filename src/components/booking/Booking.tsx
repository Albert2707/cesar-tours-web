import { useEffect, useRef, useState } from "react";
import Map, { Ref } from "./components/map/Map";
import useTranslate from "../../hooks/Translate";
import "./Booking.scss";
import { useIdiom } from "../../context/idiomContext";
import { IdiomTypes } from "../../context/idiomTypes";
import Select from "react-select";
import { generateTimeOptions } from "../../utils/functions";
const debounce = (func, delay) => {
  let timeoutId: NodeJS.Timeout;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const Booking = () => {
  const inputRef = useRef<any>(null);
  const { translate } = useTranslate();
  const { idiom } = useIdiom() as IdiomTypes;
  const inputDesRef = useRef<any>(null);
  const hours = generateTimeOptions();
  const mapRef = useRef<Ref>(null); // Tipado de `mapRef`
  const [isLoaded, setIsloaded] = useState(false);
  const [duration, setDuration] = useState<string>("---");
  const [distance, setDistance] = useState<string>("---");
  const [destination, setDestination] = useState<any>(null);
  const [formattedDestination, setFormattedDestination] = useState<string>("");
  const [formattedOrigin, setFormattedOrigin] = useState<string>("");
  const [origin, setOrigin] = useState<any>(null);
  const tripType = [
    { value: 1, label: translate("one_way") },
    { value: 2, label: translate("round_trip") },
  ];
  // Función para manejar la selección de origen
  const handleOriginPlaceChanged = () => {
    const autoComplete = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autoComplete.addListener(
      "place_changed",
      debounce(() => {
        const place = autoComplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          alert("This location is not available");
        } else if (mapRef.current) {
          setFormattedOrigin(place.formatted_address as string);
          const newOrigin = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setOrigin(newOrigin);
        }
      }, 300)
    ); // 300 ms de debounce
  };

  // Función para manejar la selección de destino
  const handleDestinationPlaceChanged = () => {
    const autoComplete = new window.google.maps.places.Autocomplete(
      inputDesRef.current
    );
    autoComplete.addListener(
      "place_changed",
      debounce(() => {
        const place = autoComplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          alert("This location is not available");
        } else if (mapRef.current) {
          setFormattedDestination(place.formatted_address as string);
          const newDestination = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setDestination(newDestination);
        }
      }, 300)
    ); // 300 ms de debounce
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      handleOriginPlaceChanged();
      handleDestinationPlaceChanged();
    }
  }, [isLoaded]);

  function traducirDuracion(str: string) {
    if (idiom === "es") {
      return str
        .replace(/(hours|hour)/, "horas")
        .replace(/(mins|min)/, "minutos");
    }
    return str;
  }

  return (
    <section className="booking" id="booking">
      <div className="wrapper">
        <h2>{translate("booking_prompt")}</h2>
        <div className="booking-container">
          <div className="steps">
            <div className="step done">1</div>
            <div className="steps-progress">
              <div className="progress"></div>
            </div>
            <div className="step">2</div>
            <span className="steps-progress"></span>
            <div className="step">3</div>
          </div>
          <div className="container">
            <div className="left">
              <form action="" className="booking-form">
                <div className="form-item">
                  <label htmlFor="address">{translate("origin_address")}</label>
                  <input
                    type="text"
                    ref={inputRef}
                    id="address"
                    placeholder={translate("origin")}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="addressDestination">
                    {translate("destination_address")}
                  </label>
                  <input
                    type="text"
                    ref={inputDesRef}
                    id="addressDestination"
                    placeholder={translate("destination")}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="tripType">{translate("trip_type")}</label>
                  <Select
                    options={tripType}
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
                    isSearchable={false}
                  />
                </div>
                <div className="form-item">
                  <div className="more-info">
                    <div className="passengerNo">
                      <label htmlFor="passengerNo">
                        {translate("num_passengers")}
                      </label>
                      <input id="passengerNo" type="text" inputMode="numeric" pattern="[0-9]+" onChange={(e) => {
                        // e.target.validity.patternMismatch;
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }} />
                    </div>
                    <div className="baggageNo">
                      <label htmlFor="baggageNo">{translate("num_bags")}</label>
                      <input id="baggageNo" type="text" inputMode="numeric" pattern="[0-9]+" onChange={(e) => {
                        // e.target.validity.patternMismatch;
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }} />
                    </div>
                  </div>
                </div>
                <div className="form-item">
                  <label htmlFor="outDate">{translate("departure_date")}</label>
                  <input type="date" id="outDate" />
                </div>
                <div className="form-item">
                  <label htmlFor="outHour">{translate("departure_time")}</label>
                  <Select
                    options={hours}
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
                  ref={mapRef}
                  setIsloaded={setIsloaded}
                  setDuration={setDuration}
                  setDistance={setDistance}
                  destination={destination}
                  origin={origin}
                  formattedDestination={formattedDestination}
                  formattedOrigin={formattedOrigin}
                />
                <div className="location-info">
                  <div className="distance">
                    <span>{translate("distance")}</span>
                    <span> {distance} </span>
                  </div>
                  <div className="time">
                    <span>{translate("time_trip")}</span>
                    <span>{traducirDuracion(duration)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOrigin(null);
                    setDestination(null);
                    setFormattedOrigin("");
                    setFormattedDestination("");
                    if (mapRef.current) {
                      mapRef.current.setDirections(null);
                    }
                  }}
                >
                  {translate("selectVehicle")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;

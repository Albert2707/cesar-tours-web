import { useEffect, useRef, useState } from "react";
import Map, { Ref } from "./components/map/Map";
import useTranslate from "../../hooks/Translate";
import "./Booking.scss";
import { useIdiom } from "../../context/idiomContext";
import { IdiomTypes } from "../../context/idiomTypes";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const Booking = () => {
  const inputRef = useRef<any>(null);
  const { idiom } = useIdiom() as IdiomTypes;
  const inputDesRef = useRef<any>(null);
  const mapRef = useRef<Ref>(null); // Tipado de `mapRef`
  const [isLoaded, setIsloaded] = useState(false);
  const [duration, setDuration] = useState<string>("---");
  const [distance, setDistance] = useState<string>("---");
  const [destination, setDestination] = useState<any>(null);
  const [formattedDestination, setFormattedDestination] = useState<string>("");
  const [formattedOrigin, setFormattedOrigin] = useState<string>("");
  const [origin, setOrigin] = useState<any>(null);

  // Función para manejar la selección de origen
  const handleOriginPlaceChanged = () => {
    const autoComplete = new window.google.maps.places.Autocomplete(inputRef.current);
    autoComplete.addListener("place_changed", debounce(() => {
      const place = autoComplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        alert("This location is not available");
      } else if (mapRef.current) {
        setFormattedOrigin(place.formatted_address as string)
        const newOrigin = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setOrigin(newOrigin);
      }
    }, 300)); // 300 ms de debounce
  };

  // Función para manejar la selección de destino
  const handleDestinationPlaceChanged = () => {
    const autoComplete = new window.google.maps.places.Autocomplete(inputDesRef.current);
    autoComplete.addListener("place_changed", debounce(() => {
      const place = autoComplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        alert("This location is not available");
      } else if (mapRef.current) {
        setFormattedDestination(place.formatted_address as string)
        const newDestination = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setDestination(newDestination);
      }
    }, 300)); // 300 ms de debounce
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      handleOriginPlaceChanged();
      handleDestinationPlaceChanged();
    }
  }, [isLoaded]);

  const { translate } = useTranslate();

  function traducirDuracion(str: string) {
    if (idiom === "es") {
      return str.replace(/(hours|hour)/, "horas").replace(/(mins|min)/, "minutos");
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
                    placeholder="Ingresa la dirección de origen"
                  />
                </div>
                <div className="form-item">

                  <label htmlFor="addressDestination">{translate("destination_address")}</label>
                  <input
                    type="text"
                    ref={inputDesRef}
                    id="addressDestination"
                    placeholder="Ingresa la dirección de destino"
                  />
                </div>
                <div className="form-item">

                  <label htmlFor="tripType">{translate("trip_type")}</label>
                  <select name="" id="tripType">
                    <option value="1">{translate("one_way")}</option>
                    <option value="2">{translate("round_trip")}</option>
                  </select>
                </div>
                <div className="form-item">
                  <div className="more-info">
                    <div className="passengerNo">
                      <label htmlFor="passengerNo">{translate("num_passengers")}</label>
                      <input id="passengerNo" type="number" />
                    </div>
                    <div className="baggageNo">
                      <label htmlFor="baggageNo">{translate("num_bags")}</label>
                      <input id="baggageNo" type="number" />
                    </div>
                  </div>
                </div>
                <div className="form-item">

                  <label htmlFor="outDate">{translate("departure_date")}</label>
                  <input type="date" id="outDate" />
                </div>
                <div className="form-item">

                  <label htmlFor="outHour">{translate("departure_time")}</label>
                  <select id="outHour">
                    <option value="">{translate("time")}</option>
                    {/* Renderiza las opciones de tiempo */}
                  </select>
                </div>
              </form>
            </div>
            <div className="right">
              <div className="map">
                <Map ref={mapRef} setIsloaded={setIsloaded} setDuration={setDuration} setDistance={setDistance} destination={destination} origin={origin} formattedDestination={formattedDestination} formattedOrigin={formattedOrigin} />
                <div className="location-info">
                  <div className="distance">
                    <span>{translate("distance")}</span>
                    <span> {distance} </span>
                  </div>
                  <div className="time">
                    <span>{translate("time_trip")}</span>
                    <span>
                      {traducirDuracion(duration)}
                    </span>
                  </div>
                </div>
                <button type="button" onClick={() => {
                  setOrigin(null);
                  setDestination(null);
                  setFormattedOrigin("");
                  setFormattedDestination("");
                  if (mapRef.current) {
                    mapRef.current.setDirections(null);
                  }
                }}>{translate("selectVehicle")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;

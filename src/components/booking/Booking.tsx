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
    <section className="booking">
      <div className="wrapper">
        <h2>{translate("booking_prompt")}</h2>
        <div className="steps">
          <div className="step done">1</div>
          <div className="steps-progress">
            <div className="progress"></div>
          </div>
          <div className="step">2</div>
          <span className="steps-progress"></span>
          <div className="step">3</div>
        </div>
        <div className="booking-container">
          <div className="left">
            <form action="" className="booking-form">
              <label htmlFor="address">Dirección de Origen</label>
              <input
                type="text"
                ref={inputRef}
                id="address"
                placeholder="Ingresa la dirección de origen"
              />
              <label htmlFor="addressDestination">Dirección de Destino</label>
              <input
                type="text"
                ref={inputDesRef}
                id="addressDestination"
                placeholder="Ingresa la dirección de destino"
              />
              <label htmlFor="tripType">Tipo de viaje</label>
              <select name="" id="tripType" value="1">
                <option value="1">Ida</option>
                <option value="2">Ida y vuelta</option>
              </select>
              <div className="more-info">
                <div className="passengerNo">
                  <label htmlFor="passengerNo">No. Pasajeros</label>
                  <input id="passengerNo" type="number" />
                </div>
                <div className="baggageNo">
                  <label htmlFor="baggageNo">No. Maletas</label>
                  <input id="baggageNo" type="number" />
                </div>
              </div>
              <label htmlFor="outDate">Fecha de salida</label>
              <input type="date" id="outDate" />
              <label htmlFor="outHour">Hora de salida</label>
              <select id="outHour">
                <option value="">Tiempo</option>
                {/* Renderiza las opciones de tiempo */}
              </select>
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
                  <span>{translate("time")}</span>
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
    </section>
  );
};

export default Booking;

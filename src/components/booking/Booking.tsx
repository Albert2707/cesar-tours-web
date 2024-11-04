// import { APIProvider} from "@vis.gl/react-google-maps";
import "./Booking.scss";
import Map from "./components/map/Map";
// import { Directions } from "./components/directions/Directions";
import useTranslate from "../../hooks/Translate";
import { useEffect, useRef, useState } from "react";

// import MapHandler from "./components/mapHandler/MapHandler";
const Booking = () => {
  const inputRef = useRef<any>(null);
  const inputDesRef = useRef<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      const autoComplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          alert("This location is not available");
        } else {
          mapRef.current.setO({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          console.log(place.geometry.location.lat());
          console.log(place.geometry.location.lng());
        }
      });
    }
  }, [window.google]);

  useEffect(() => {
    if (window.google && window.google.maps) {
      const autoComplete = new window.google.maps.places.Autocomplete(
        inputDesRef.current
      );
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          alert("This location is not available");
        } else {
          mapRef.current.setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          console.log(place.geometry.location.lat());
          console.log(place.geometry.location.lng());
        }
      });
    }
  }, [window.google]);

  const { translate } = useTranslate();
  const times = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const formattedHour = String(hour).padStart(2, "0");
      const formattedMinute = String(minute).padStart(2, "0");
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  // nuevas funcionalidades

  return (
    <section className="booking">
      <div className="wrapper">
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
              <label htmlFor="tripType"> Tipo de viaje</label>

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
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="right">
            <div className="map">
              <Map ref={mapRef} />
              {/* <APIProvider apiKey={VITE_GOOGLE_API_KEY}>
                <Map
                  style={{ width: "100%", height: "100%" }}
                  defaultCenter={{ lat: 18.6652932, lng: -71.4493516 }}
                  defaultZoom={7}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                />
                <Directions />
              </APIProvider> */}
              <button>{translate("selectVehicle")}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;

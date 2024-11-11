import React, { useEffect, useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { AutocompleteCustom } from "./prueba";
import { Directions } from "./components/booking/components/directions/Directions";
import Map from "./components/booking/components/map/Map";
import Booking from "./components/booking/Booking";

const { VITE_GOOGLE_API_KEY } = import.meta.env;
const center = { lat: 18.6652932, lng: -71.4493516 };

function App() {
  const [originPlace, setOriginPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [destinationPlace, setDestinationPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    const { hash } = window.location;
    if (hash) history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
  }, []);

  const handlePlaceSelect = (
    place: google.maps.places.PlaceResult | null,
    isOrigin: boolean
  ) => {
    if (isOrigin) {
      setOriginPlace(place);
    } else {
      setDestinationPlace(place);
    }
  };

  return (
    <>
        {/* <Map/>
         */}
         <Booking/>
        {/* <APIProvider apiKey={VITE_GOOGLE_API_KEY}>
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={center}
            defaultZoom={7}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />
          {originPlace && destinationPlace && (
            <Directions
              origin={originPlace.formatted_address!}
              destination={destinationPlace.formatted_address!}
            />
          )}

          <AutocompleteCustom
            onPlaceSelect={handlePlaceSelect}
            isOrigin={true}
          />
          <AutocompleteCustom
            onPlaceSelect={handlePlaceSelect}
            isOrigin={false}
          />
        </APIProvider> */}
    </>
  );
}

export default App;

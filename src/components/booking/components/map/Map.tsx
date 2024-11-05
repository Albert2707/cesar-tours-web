import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { DirectionsRenderer, GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

const { VITE_GOOGLE_API_KEY } = import.meta.env;
const center = { lat: 18.6652932, lng: -71.4493516 };

interface Props {
  setIsloaded: React.Dispatch<React.SetStateAction<boolean>>;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  setDistance: React.Dispatch<React.SetStateAction<string>>;
  origin: any;
  destination: any;
  formattedDestination: string;
  formattedOrigin: string;
}

export type Ref = {
  isLoaded: boolean;
  setDirections: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | null>>;
};

const Map = forwardRef<Ref, Props>(({ setIsloaded, setDuration, setDistance, origin, destination, formattedOrigin, formattedDestination }, ref) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useImperativeHandle(ref, () => ({
    isLoaded,
    setDirections,
  }));

  useEffect(() => {
    if (isLoaded) setIsloaded(isLoaded);
  }, [isLoaded, setIsloaded]);

  useEffect(() => {
    // Limpia las direcciones si falta origen o destino
    if (!origin || !destination) {
      setDirections(null);
      setDuration("---");
      setDistance("---");
      return;
    }

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin: formattedOrigin,
        destination: formattedDestination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          const leg = result.routes[0].legs[0];
          setDuration(leg.duration ? leg.duration.text : "---");
          setDistance(leg.distance ? leg.distance.text : "---");
        } else {
          console.error(`Error fetching directions: ${status}`);
          setDirections(null);
          setDuration("---");
          setDistance("---");
        }
      }
    );

  }, [origin, destination, formattedDestination, formattedOrigin]);

  return isLoaded ? (
    <GoogleMap mapContainerClassName="map_container" center={center} zoom={7}>
      {origin && <MarkerF position={origin} label={"A"} />}
      {destination && <MarkerF position={destination} label={"B"} />}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ) : (
    <></>
  );
});

export default Map;

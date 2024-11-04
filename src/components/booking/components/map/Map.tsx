import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
const { VITE_GOOGLE_API_KEY } = import.meta.env;
const center = { lat: 18.6652932, lng: -71.4493516 };

const Map = forwardRef((_, ref) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  const [origin, setO] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);

  const [map, setMap] = useState(null);
  useImperativeHandle(ref, () => {
    return {
      setO,
      setDestination,
    };
  });
  //   const center = { lat: 18.6652932, lng: -71.4493516 };
  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds({
      lat: 28.0289837,
      lng: 1.6666663,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  //   const [markerPosition, setMarkerPosition] = useState({
  //     lat: 18.3055841,
  //     lng: -69.5880215,
  //   });

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  //   const handelClickOnMap = () => {};
  return isLoaded ? (
    <GoogleMap mapContainerClassName="map_container" center={center} zoom={7}>
      {origin && <MarkerF position={origin} />}
      {destination && <MarkerF position={destination} />}
    </GoogleMap>
  ) : (
    <></>
  );
});

export default React.memo(Map);

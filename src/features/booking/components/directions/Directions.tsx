import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import useTranslate from "@hooks/translations/Translate";
import { IdiomTypes } from "@/context/idiomTypes";
import { useBookingStore } from "@hooks/booking/useBookingStore";
import { useIdiom } from "@hooks/idiom/useIdiom";


export const Directions = () => {
  const { idiom } = useIdiom() as IdiomTypes;
  const { translate } = useTranslate();
  const {
    setDuration,
    setDistance,
    duration,
    origin,
    distance,
    destination,
    setDestination,
    setOrigin,
  } = useBookingStore();
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const routeIndex = 0;

  function traducirDuracion(str: string) {
    if (idiom === "es") {
      return str
        .replace(/(hours|hour)/, "horas")
        .replace(/(mins|min)/, "minutos");
    }
    return str;
  }

  // Initialize directions service
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service and update renderer with new directions
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination)
      return;
    // Clear previous route
    directionsRenderer.setMap(null);
    // Request new directions
    directionsService
      .route({
        origin: { lat: origin.lat ?? 0, lng: origin.lng ?? 0 },
        destination: { lat: destination.lat ?? 0, lng: destination.lng ?? 0 },
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        region: "DO",
      })
      .then((response) => {
        directionsRenderer.setMap(map); // Attach renderer to map
        directionsRenderer.setDirections(response);
        const { routes } = response;
        if (routes) {
          const tripInfo = routes[0]?.legs[0];
          setDuration({
            text: tripInfo?.duration?.text as string,
            value: tripInfo?.duration?.value as number,
          });
          setDistance({
            text: tripInfo?.distance?.text as string,
            value: tripInfo?.distance?.value as number,
          });
        }
        setRoutes(response.routes);
      })
      .catch((error) => console.error("Error fetching directions:", error));

    return () => directionsRenderer.setMap(null); // Clean up on unmount
  }, [
    directionsService,
    directionsRenderer,
    origin,
    destination,
    map,
    setDestination,
    setDistance,
    setDuration,
    setOrigin,
  ]);

  useEffect(() => {
    if (directionsRenderer && routeIndex < routes.length) {
      directionsRenderer.setRouteIndex(routeIndex);
    }
  }, [routeIndex, directionsRenderer, routes.length]);

  return (
    <div className="location-info">
      <div className="distance">
        <span>{translate("distance")}</span>
        {<span> {distance?.text ?? "---"} </span>}
      </div>
      <div className="time">
        <span>{translate("time")}</span>
        {<span>{duration ? traducirDuracion(duration.text) : "---"}</span>}
      </div>
    </div>
  );
};

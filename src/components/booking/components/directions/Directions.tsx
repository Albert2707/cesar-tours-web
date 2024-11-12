import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { FC, useEffect, useState } from "react";
import useTranslate from "../../../../hooks/Translate";
import { useIdiom } from "../../../../context/idiomContext";
import { IdiomTypes } from "../../../../context/idiomTypes";

type DirectionsProps = {
  origin: string;
  destination: string;
};

export const Directions: FC<DirectionsProps> = ({ origin, destination }) => {
  const { idiom } = useIdiom() as IdiomTypes;
  const { translate } = useTranslate();

  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const routeIndex=0;
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  function traducirDuracion(str: string) {
    if (idiom === "es") {
      return str.replace(/(hours|hour)/, "horas").replace(/(mins|min)/, "minutos");
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
    if (!directionsService || !directionsRenderer || !origin || !destination) return;
    // Clear previous route
    directionsRenderer.setMap(null);
    // Request new directions
    directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true
    })
    .then(response => {
      directionsRenderer.setMap(map); // Attach renderer to map
      directionsRenderer.setDirections(response);
      setRoutes(response.routes);
    })
    .catch(error => console.error("Error fetching directions:", error));

    return () => directionsRenderer.setMap(null); // Clean up on unmount
  }, [directionsService, directionsRenderer, origin, destination, map]);

  useEffect(() => {
    if (directionsRenderer && routeIndex < routes.length) {
      directionsRenderer.setRouteIndex(routeIndex);
    }
  }, [routeIndex, directionsRenderer, routes.length]);

  if (!leg) return null;

  return (
    <div className="location-info">
      <div className="distance">
        <span>{translate("distance")}</span>
        <span> {leg.distance?.text || "---"} </span>
      </div>
      <div className="time">
        <span>{translate("time")}</span>
        <span>{leg.duration ? traducirDuracion(leg.duration.text) : "---"}</span>
      </div>
    </div>
  );
};

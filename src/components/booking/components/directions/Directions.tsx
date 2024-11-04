import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { forwardRef, useEffect, useState } from "react";
import useTranslate from "../../../../hooks/Translate";
import { useIdiom } from "../../../../context/idiomContext";
import { IdiomTypes } from "../../../../context/idiomTypes";

export const Directions = forwardRef(() => {
  const { idiom } = useIdiom() as IdiomTypes;
  const map = useMap();
  const { translate } = useTranslate();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const routeIndex =0;
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  function traducirDuracion(str: string) {
    if (idiom === "es") {
      return str.replace("hours", "horas").replace(/(mins|min)/, "minutos");
    }
    return str;
  }

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: "Santo Domingo, Dominican Republic",
        destination: "Samana, Dominican Republic",
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  useEffect(() => {
    if (leg) console.log(leg);
  }, [leg]);

  //   if (!leg) return null;

  return (
    <div className="location-info">
      <div className="distance">
        <span>{translate("distance")}</span>
        <span> {leg ? leg.distance?.text : "---"} </span>
      </div>
      <div className="time">
        <span>{translate("time")}</span>
        <span>
          {" "}
          {leg ? traducirDuracion(leg.duration?.text as string) : "---"}{" "}
        </span>
      </div>
    </div>
  );
});

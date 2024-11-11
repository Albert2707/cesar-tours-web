import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { forwardRef, useEffect, useState } from "react";
import useTranslate from "../../../../hooks/Translate";
import { useIdiom } from "../../../../context/idiomContext";
import { IdiomTypes } from "../../../../context/idiomTypes";

export const Directions = forwardRef(
  ({ origin, destination }: { origin: string; destination: string }) => {
    const { idiom } = useIdiom() as IdiomTypes;
    const map = useMap();
    const { translate } = useTranslate();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] =
      useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] =
      useState<google.maps.DirectionsRenderer | null>(null);
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const routeIndex = 0;
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    function traducirDuracion(str: string) {
      if (idiom === "es") {
        return str.replace("hours", "horas").replace(/(mins|min)/, "minutos");
      }
      return str;
    }

    // Initialize directions service
    useEffect(() => {
      if (!routesLibrary) return;
      setDirectionsService(new routesLibrary.DirectionsService());
    }, [routesLibrary]);

    // Use directions service and update renderer with new directions
    useEffect(() => {
      if (!directionsService || !origin || !destination) return;

      // Remove previous route if directionsRenderer exists
      if (directionsRenderer) {
        directionsRenderer.setMap(null); // Clear previous route
      }
      if (!routesLibrary) return;
      const newDirectionsRenderer = new routesLibrary.DirectionsRenderer({
        map,
      });
      setDirectionsRenderer(newDirectionsRenderer);

      // Request new directions
      directionsService
        .route({
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        })
        .then((response) => {
          newDirectionsRenderer.setDirections(response); // Set new route
          setRoutes(response.routes);
        });

      return () => newDirectionsRenderer.setMap(null); // Clean up on unmount
    }, [directionsService, origin, destination, routesLibrary, map]);

    // Update direction route
    useEffect(() => {
      if (!directionsRenderer) return;
      directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    return (
      <div className="location-info">
        <div className="distance">
          <span>{translate("distance")}</span>
          <span> {leg ? leg.distance?.text : "---"} </span>
        </div>
        <div className="time">
          <span>{translate("time")}</span>
          <span>
            {leg ? traducirDuracion(leg.duration?.text as string) : "---"}
          </span>
        </div>
      </div>
    );
  }
);

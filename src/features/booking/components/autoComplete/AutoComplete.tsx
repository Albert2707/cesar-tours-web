import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import useTranslate from "@/shared/hooks/translations/Translate";
import { useBookingStore } from "@/shared/hooks/booking/useBookingStore";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  isOrigin: boolean;
}

export const AutocompleteCustom = ({ onPlaceSelect, isOrigin }: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");
  const { translate } = useTranslate();
  const {
    destination,
    origin
  } = useBookingStore();
  // Función debounce
  const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
      componentRestrictions: { country: "DO" }
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    const handlePlaceChanged = () => {
      const place = placeAutocomplete.getPlace();
      onPlaceSelect(place);
    };

    // Agregamos debounce al evento de 'place_changed'
    const debouncedHandlePlaceChanged = debounce(handlePlaceChanged, 300);

    placeAutocomplete.addListener("place_changed", debouncedHandlePlaceChanged);

    return () => {
      google.maps.event.clearInstanceListeners(placeAutocomplete);
    };
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <input
      ref={inputRef}
      defaultValue={isOrigin ? origin: destination}
      placeholder={isOrigin ? translate("origin") : translate("destination")}
    />
  );
};

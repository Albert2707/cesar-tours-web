import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { FormEvent, useCallback, useEffect, useState } from "react";

interface Props {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null, isOrigin: boolean) => void;
    isOrigin: boolean;
  }
  
  export const AutocompleteCustom = ({ onPlaceSelect, isOrigin }: Props) => {
    const map = useMap();
    const places = useMapsLibrary("places");
  
    const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken>();
    const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
    const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
    const [predictionResults, setPredictionResults] = useState<Array<google.maps.places.AutocompletePrediction>>([]);
    const [inputValue, setInputValue] = useState<string>("");
  
    useEffect(() => {
      if (!places || !map) return;
      setAutocompleteService(new places.AutocompleteService());
      setPlacesService(new places.PlacesService(map));
      setSessionToken(new places.AutocompleteSessionToken());
      return () => setAutocompleteService(null);
    }, [map, places]);
  
    const fetchPredictions = useCallback(
      async (inputValue: string) => {
        if (!autocompleteService || !inputValue) {
          setPredictionResults([]);
          return;
        }
        const request = { input: inputValue, sessionToken };
        const response = await autocompleteService.getPlacePredictions(request);
        setPredictionResults(response.predictions);
      },
      [autocompleteService, sessionToken]
    );
  
    const onInputChange = useCallback(
      (event: FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement)?.value;
        setInputValue(value);
        fetchPredictions(value);
      },
      [fetchPredictions]
    );
  
    const handleSuggestionClick = useCallback(
      (placeId: string) => {
        if (!places) return;
  
        const detailRequestOptions = {
          placeId,
          fields: ["geometry", "name", "formatted_address"],
          sessionToken,
        };
  
        const detailsRequestCallback = (placeDetails: google.maps.places.PlaceResult | null) => {
          onPlaceSelect(placeDetails, isOrigin);
          setPredictionResults([]);
          setInputValue(placeDetails?.formatted_address ?? "");
          setSessionToken(new places.AutocompleteSessionToken());
        };
  
        placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
      },
      [onPlaceSelect, places, placesService, sessionToken, isOrigin]
    );
  
    return (
      <div className="autocomplete-container">
        <input
          value={inputValue}
          onInput={(event: FormEvent<HTMLInputElement>) => onInputChange(event)}
          placeholder={isOrigin ? "Enter origin" : "Enter destination"}
        />
  
        {predictionResults.length > 0 && (
          <ul className="custom-list">
            {predictionResults.map(({ place_id, description }) => (
              <li key={place_id} className="custom-list-item" onClick={() => handleSuggestionClick(place_id)}>
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
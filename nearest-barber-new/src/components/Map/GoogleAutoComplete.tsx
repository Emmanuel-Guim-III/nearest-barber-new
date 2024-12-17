import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';

type Props = {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  className?: string;
  onFocus?: () => void;
};

export function GoogleAutoComplete({ onPlaceSelect, ...props }: Props) {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className='autocomplete-container !w-full'>
      <input ref={inputRef} {...props} />
    </div>
  );
}

import { useEffect, useState } from 'react';

export type Coordinates = {
  lat: number;
  lng: number;
} | null;

export function useUserLocation() {
  const [location, setLocation] = useState<Coordinates>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          setError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        },
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  }, []);

  return { location, error };
}

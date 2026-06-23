import { useState, useEffect } from 'react';

export interface GeolocationCoords {
  lat: number;
  lng: number;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationCoords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation nie jest obsługiwane przez Twoją przeglądarkę');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(`Błąd geolokacji: ${err.message}`);
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  return { location, error, loading };
};

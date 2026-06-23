import { useState, useCallback } from 'react';
import axios from 'axios';
import { GeolocationCoords } from './useGeolocation';

export interface PlaceResult {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  rating?: number;
  openingHours?: string[];
  type: string;
}

export const useGooglePlaces = () => {
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback(
    (location: GeolocationCoords, radiusKm: number = 5) => {
      setLoading(true);
      setError(null);

      // ponytail: Overpass API dla wyszukiwania "optometrist" (healthcare)
      const radiusM = radiusKm * 1000;
      const bbox = `(${location.lat - radiusKm / 111},${location.lng - radiusKm / 111},${
        location.lat + radiusKm / 111
      },${location.lng + radiusKm / 111})`;

      const query = `
        [bbox:${bbox}];
        (
          node["healthcare"="optometrist"](${bbox});
          way["healthcare"="optometrist"](${bbox});
          node["shop"="optician"](${bbox});
          way["shop"="optician"](${bbox});
        );
        out center;
      `;

      axios
        .post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          timeout: 10000,
        })
        .then((response) => {
          const elements = response.data.elements || [];
          const results: PlaceResult[] = elements
            .filter((el: any) => el.lat && el.lon)
            .map((el: any, idx: number) => {
              const center = el.center || { lat: el.lat, lon: el.lon };
              return {
                id: `${el.id}`,
                name: el.tags?.name || el.tags?.['healthcare:speciality'] || 'Optyka',
                address: [el.tags?.['addr:street'], el.tags?.['addr:city']]
                  .filter(Boolean)
                  .join(', ') || 'Adres nieznany',
                lat: center.lat,
                lng: center.lon,
                phone: el.tags?.['contact:phone'] || el.tags?.phone,
                website: el.tags?.website || el.tags?.['contact:website'],
                type: el.tags?.healthcare || el.tags?.shop || 'healthcare',
              };
            });

          setPlaces(results);
        })
        .catch(() => {
          setError('Błąd wyszukiwania. Spróbuj ponownie.');
        })
        .finally(() => setLoading(false));
    },
    []
  );

  return { places, loading, error, searchPlaces };
};

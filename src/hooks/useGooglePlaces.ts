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

    // ponytail: Overpass API dla wyszukiwania "optometrist" (healthcare + optician shops)
    const radiusM = radiusKm * 1000;
    const bbox = `(${location.lat - radiusKm / 111},${location.lng - radiusKm / 111},${
      location.lat + radiusKm / 111
    },${location.lng + radiusKm / 111})`;

    const query = `
      [bbox:${bbox}];
      (
        node["healthcare"="optometrist"](${bbox});
        way["healthcare"="optometrist"](${bbox});
        node["healthcare"="ophthalmology"](${bbox});
        way["healthcare"="ophthalmology"](${bbox});
        node["shop"="optician"](${bbox});
        way["shop"="optician"](${bbox});
        node["shop"="glasses"](${bbox});
        way["shop"="glasses"](${bbox});
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
              const tags = el.tags || {};
              
              // Build address from available tags
              const address = [
                tags['addr:street'],
                tags['addr:housenumber'],
                tags['addr:postcode'],
                tags['addr:city'],
                tags['addr:town'],
                tags['addr:suburb']
              ]
                .filter(Boolean)
                .join(', ') || tags.name || 'Adres nieznany';

              return {
                id: `${el.id}`,
                name: tags.name || tags['healthcare:speciality'] || tags.shop || 'Optyka',
                address: address,
                lat: center.lat,
                lng: center.lon,
                phone: tags['contact:phone'] || tags.phone,
                website: tags.website || tags['contact:website'],
                type: tags.healthcare || tags.shop || 'healthcare',
              };
            });

          console.log(`Found ${results.length} places`);
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

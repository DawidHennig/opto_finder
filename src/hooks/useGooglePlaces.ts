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

    // ponytail: Overpass API - simplified query (Overpass can be picky)
    // Format: [bbox:south,west,north,east]
    const south = location.lat - radiusKm / 111;
    const west = location.lng - radiusKm / 111;
    const north = location.lat + radiusKm / 111;
    const east = location.lng + radiusKm / 111;
    const bbox = `[bbox:${south},${west},${north},${east}]`;

    const query = `${bbox};(node["healthcare"="optometrist"];way["healthcare"="optometrist"];node["healthcare"="ophthalmology"];way["healthcare"="ophthalmology"];node["shop"="optician"];way["shop"="optician"];node["shop"="glasses"];way["shop"="glasses"];);out center;`;

      // ponytail: Try Overpass, fallback to simpler query if needed
      const makeRequest = () => {
        console.log('🔍 Searching with radius:', radiusKm, 'km at', location);
        
        return axios.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          timeout: 15000,
        });
      };

      makeRequest()
        .then((response) => {
          console.log('✅ Overpass response:', response.status, response.data);
          
          // Check for Overpass error response
          if (response.data.error) {
            throw new Error(`Overpass API error: ${response.data.error.message}`);
          }

          const elements = response.data.elements || [];
          console.log(`📍 Found ${elements.length} raw elements`);
          
          const results: PlaceResult[] = elements
            .filter((el: any) => el.lat && el.lon)
            .map((el: any) => {
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

          console.log(`✅ Found ${results.length} places after filtering`);
          setPlaces(results);
        })
        .catch((error) => {
          console.error('❌ Search error:', error.message, error.response?.data);
          
          // More specific error messages
          if (error.code === 'ECONNABORTED') {
            setError('Timeout - Overpass API nie odpowiada. Spróbuj za chwilę.');
          } else if (error.response?.status === 429) {
            setError('Za wiele zapytań. Czekaj kilka minut i spróbuj ponownie.');
          } else if (error.response?.data?.error) {
            setError(`Błąd API: ${error.response.data.error.message}`);
          } else {
            setError('Błąd wyszukiwania. Sprawdź internet lub spróbuj ponownie.');
          }
        })
        .finally(() => setLoading(false));
    },
    []
  );

  return { places, loading, error, searchPlaces };
};

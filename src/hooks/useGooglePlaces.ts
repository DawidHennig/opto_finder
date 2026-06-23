import { useState, useCallback } from 'react';
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
  placeId: string;
}

export const useGooglePlaces = () => {
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback(
    (location: GeolocationCoords, radius: number = 5000) => {
      setLoading(true);
      setError(null);

      if (!(window as any).google?.maps?.places?.PlacesService) {
        setError('Google Maps Places API nie jest załadowana');
        setLoading(false);
        return;
      }

      const service = new (window as any).google.maps.places.PlacesService(
        document.createElement('div')
      );

      const request = {
        location: new (window as any).google.maps.LatLng(location.lat, location.lng),
        radius: radius,
        keyword: 'optometrysta',
        type: 'health',
      };

      service.nearbySearch(request, (results: any, status: any) => {
        if (status === (window as any).google.maps.places.PlacesServiceStatus.OK) {
          const formattedPlaces = results.map((place: any) => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            phone: place.formatted_phone_number,
            website: place.website,
            rating: place.rating,
            openingHours: place.opening_hours?.weekday_text,
            placeId: place.place_id,
          }));
          setPlaces(formattedPlaces);
        } else if (status !== (window as any).google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          setError(`Błąd wyszukiwania: ${status}`);
        }
        setLoading(false);
      });
    },
    []
  );

  return { places, loading, error, searchPlaces };
};

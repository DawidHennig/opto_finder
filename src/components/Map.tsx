import React, { useEffect, useRef } from 'react';
import { GeolocationCoords } from '../hooks/useGeolocation';
import { PlaceResult } from '../hooks/useGooglePlaces';

interface MapProps {
  center: GeolocationCoords;
  places: PlaceResult[];
  selectedPlace: PlaceResult | null;
  onPlaceClick: (place: PlaceResult) => void;
}

export const Map: React.FC<MapProps> = ({ center, places, selectedPlace, onPlaceClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const userMarker = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const googleMap = new (window as any).google.maps.Map(mapContainer.current, {
      zoom: 13,
      center: { lat: center.lat, lng: center.lng },
      mapTypeControl: true,
      streetViewControl: false,
    });

    map.current = googleMap;

    // Marker dla lokalizacji użytkownika
    userMarker.current = new (window as any).google.maps.Marker({
      position: { lat: center.lat, lng: center.lng },
      map: googleMap,
      title: 'Twoja lokalizacja',
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    });
  }, [center]);

  // Aktualizacja markerów dla miejsc
  useEffect(() => {
    if (!map.current) return;

    // Usunięcie starych markerów
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];

    places.forEach((place) => {
      const marker = new (window as any).google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: map.current,
        title: place.name,
        icon:
          selectedPlace?.id === place.id
            ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            : 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      });

      marker.addListener('click', () => {
        onPlaceClick(place);
      });

      markers.current.push(marker);
    });
  }, [places, selectedPlace, onPlaceClick]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '600px',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  );
};

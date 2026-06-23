import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeolocationCoords } from '../hooks/useGeolocation';
import { PlaceResult } from '../hooks/useGooglePlaces';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const userIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const selectedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapUpdaterProps {
  center: GeolocationCoords;
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], 13);
  }, [center, map]);
  return null;
};

interface MapProps {
  center: GeolocationCoords;
  places: PlaceResult[];
  selectedPlace: PlaceResult | null;
  onPlaceClick: (place: PlaceResult) => void;
}

export const Map: React.FC<MapProps> = ({ center, places, selectedPlace, onPlaceClick }) => {
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: '600px', borderRadius: '8px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} />

      {/* User location marker */}
      <Marker position={[center.lat, center.lng]} icon={userIcon} title="Twoja lokalizacja">
        <Popup>📍 Twoja lokalizacja</Popup>
      </Marker>

      {/* Place markers */}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={selectedPlace?.id === place.id ? selectedIcon : undefined}
          title={place.name}
          eventHandlers={{
            click: () => onPlaceClick(place),
          }}
        >
          <Popup>
            <div style={{ fontSize: '12px' }}>
              <strong>{place.name}</strong>
              <p style={{ margin: '4px 0' }}>{place.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

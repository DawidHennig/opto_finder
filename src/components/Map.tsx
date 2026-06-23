import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { GeolocationCoords } from '../hooks/useGeolocation';
import { PlaceResult } from '../hooks/useGooglePlaces';
import 'leaflet/dist/leaflet.css';

// ponytail: Fix Leaflet icon loading in React - explicit paths
const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom icons for map
const blueIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSI0MSIgdmlld0JveD0iMCAwIDI1IDQxIj48cGF0aCBmaWxsPSIjMjE2OEQzIiBkPSJNMTIuNSAwQzUuNTk2IDAgMCA1LjU5NiAwIDEyLjVjMCA5LjM3NSAxMi41IDI4LjEyNSAxMi41IDI4LjEyNXMyIDIuODEyIDEyLjUgLTI4LjEyNWMwIC02LjkwNCA1LjU5NiAtMTIuNSAtMTIuNSAtMTIuNXoiLz48L3N2Zz4=',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSI0MSIgdmlld0JveD0iMCAwIDI1IDQxIj48cGF0aCBmaWxsPSIjRkY0NDMzIiBkPSJNMTIuNSAwQzUuNTk2IDAgMCA1LjU5NiAwIDEyLjVjMCA5LjM3NSAxMi41IDI4LjEyNSAxMi41IDI4LjEyNXMyIDIuODEyIDEyLjUgLTI4LjEyNWMwIC02LjkwNCA1LjU5NiAtMTIuNSAtMTIuNSAtMTIuNXoiLz48L3N2Zz4=',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSI0MSIgdmlld0JveD0iMCAwIDI1IDQxIj48cGF0aCBmaWxsPSIjRkZCQzAwIiBkPSJNMTIuNSAwQzUuNTk2IDAgMCA1LjU5NiAwIDEyLjVjMCA5LjM3NSAxMi41IDI4LjEyNSAxMi41IDI4LjEyNXMyIDIuODEyIDEyLjUgLTI4LjEyNWMwIC02LjkwNCA1LjU5NiAtMTIuNSAtMTIuNSAtMTIuNXoiLz48L3N2Zz4=',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Set default icon
L.Marker.prototype.options.icon = DefaultIcon;

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

      {/* User location marker - blue */}
      <Marker position={[center.lat, center.lng]} icon={blueIcon} title="Twoja lokalizacja">
        <Popup>📍 Twoja lokalizacja</Popup>
      </Marker>

      {/* Place markers */}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={selectedPlace?.id === place.id ? redIcon : yellowIcon}
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

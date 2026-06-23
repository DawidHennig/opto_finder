import React, { useEffect, useState } from 'react';
import './App.css';
import { Map } from './components/Map';
import { ResultsList } from './components/ResultsList';
import { PlaceDetails } from './components/PlaceDetails';
import { useGeolocation } from './hooks/useGeolocation';
import { useGooglePlaces, PlaceResult } from './hooks/useGooglePlaces';

function App() {
  const { location, error: geoError, loading: geoLoading } = useGeolocation();
  const { places, loading: searchLoading, error: searchError, searchPlaces } = useGooglePlaces();
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [radius, setRadius] = useState(5000); // 5km domyślnie

  // Wyszukiwanie miejsc gdy geolokacja się załaduje
  useEffect(() => {
    if (location) {
      searchPlaces(location, radius);
    }
  }, [location, radius, searchPlaces]);

  // ponytail: Google Maps script loader - inline, nie lib, zaoszczędza HTTP request
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Brak REACT_APP_GOOGLE_MAPS_API_KEY w .env.local');
      return;
    }

    if ((window as any).google?.maps) {
      return; // Script już załadowany
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>🔍 OptoFinder</h1>
        <p>Znajdź miejsca pracy dla optometrystów w Twojej okolicy</p>
      </header>

      {geoError && <div className="error">{geoError}</div>}
      {searchError && <div className="error">{searchError}</div>}

      {geoLoading && (
        <div className="loading">
          Pobieranie Twojej lokalizacji...
        </div>
      )}

      {location && (
        <div className="controls">
          <label htmlFor="radius">Zasięg wyszukiwania:</label>
          <select
            id="radius"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="radius-select"
          >
            <option value={1000}>1 km</option>
            <option value={2500}>2.5 km</option>
            <option value={5000}>5 km</option>
            <option value={10000}>10 km</option>
            <option value={25000}>25 km</option>
          </select>
          <span className="location-display">
            📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </span>
        </div>
      )}

      {location && (
        <div className="content">
          <div className="map-section">
            <Map
              center={location}
              places={places}
              selectedPlace={selectedPlace}
              onPlaceClick={setSelectedPlace}
            />
          </div>
          <div className="sidebar">
            <ResultsList
              places={places}
              selectedPlace={selectedPlace}
              onPlaceClick={setSelectedPlace}
              loading={searchLoading}
            />
            {selectedPlace && <PlaceDetails place={selectedPlace} />}
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2026 OptoFinder. Powered by Google Maps API</p>
      </footer>
    </div>
  );
}

export default App;

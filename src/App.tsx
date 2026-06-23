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
  const [radius, setRadius] = useState(5); // 5km domyślnie

  // Wyszukiwanie miejsc gdy geolokacja się załaduje
  useEffect(() => {
    if (location) {
      searchPlaces(location, radius);
    }
  }, [location, radius, searchPlaces]);

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
            <option value={1}>1 km</option>
            <option value={2.5}>2.5 km</option>
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={25}>25 km</option>
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
        <p>© 2026 OptoFinder. Powered by OpenStreetMap & Overpass API</p>
      </footer>
    </div>
  );
}

export default App;

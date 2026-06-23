import React from 'react';
import { PlaceResult } from '../hooks/useGooglePlaces';

interface ResultsListProps {
  places: PlaceResult[];
  selectedPlace: PlaceResult | null;
  onPlaceClick: (place: PlaceResult) => void;
  loading: boolean;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  places,
  selectedPlace,
  onPlaceClick,
  loading,
}) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Wyniki ({places.length})</h2>
      {loading && <p style={styles.loading}>Wyszukiwanie...</p>}
      {places.length === 0 && !loading && (
        <p style={styles.noResults}>Brak wyników dla "optometrysta" w Twojej okolicy</p>
      )}
      <div style={styles.list}>
        {places.map((place) => (
          <div
            key={place.id}
            style={{
              ...styles.item,
              ...(selectedPlace?.id === place.id ? styles.itemSelected : {}),
            }}
            onClick={() => onPlaceClick(place)}
          >
            <h3 style={styles.itemTitle}>{place.name}</h3>
            <p style={styles.itemText}>{place.address}</p>
            {place.rating && (
              <p style={styles.itemText}>
                ⭐ {place.rating} | {place.phone ? `📞 ${place.phone}` : ''}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#333',
  },
  loading: {
    fontSize: '14px',
    color: '#999',
    textAlign: 'center',
    padding: '20px',
  },
  noResults: {
    fontSize: '14px',
    color: '#999',
    textAlign: 'center',
    padding: '20px',
  },
  list: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  item: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  itemSelected: {
    backgroundColor: '#e3f2fd',
    borderLeft: '4px solid #007bff',
  },
  itemTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '4px',
    color: '#333',
  },
  itemText: {
    fontSize: '12px',
    color: '#666',
    margin: '2px 0',
  },
};

import React from 'react';
import { PlaceResult } from '../hooks/useGooglePlaces';

interface PlaceDetailsProps {
  place: PlaceResult;
}

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place }) => {
  const mailtoLink = `mailto:info@${place.name.toLowerCase().replace(/\s+/g, '')}?subject=Zapytanie o pracę - optometrysta`;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{place.name}</h3>
      <p style={styles.text}>
        <strong>Adres:</strong> {place.address}
      </p>
      {place.phone && (
        <p style={styles.text}>
          <strong>Telefon:</strong>{' '}
          <a href={`tel:${place.phone}`} style={styles.link}>
            {place.phone}
          </a>
        </p>
      )}
      {place.rating && (
        <p style={styles.text}>
          <strong>Ocena:</strong> {place.rating} ⭐
        </p>
      )}
      {place.website && (
        <p style={styles.text}>
          <strong>Strona:</strong>{' '}
          <a href={place.website} target="_blank" rel="noopener noreferrer" style={styles.link}>
            Otwórz
          </a>
        </p>
      )}
      {place.openingHours && place.openingHours.length > 0 && (
        <div style={styles.hours}>
          <strong>Godziny otwarcia:</strong>
          <ul style={styles.hoursList}>
            {place.openingHours.map((hour, idx) => (
              <li key={idx}>{hour}</li>
            ))}
          </ul>
        </div>
      )}
      <a href={mailtoLink} style={styles.button}>
        📧 Wyślij maila
      </a>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '16px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginTop: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#333',
  },
  text: {
    fontSize: '14px',
    marginBottom: '8px',
    color: '#555',
  },
  link: {
    color: '#0066cc',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  hours: {
    fontSize: '14px',
    marginTop: '12px',
    marginBottom: '12px',
    color: '#555',
  },
  hoursList: {
    marginLeft: '20px',
    marginTop: '8px',
    fontSize: '13px',
  },
  button: {
    display: 'inline-block',
    marginTop: '12px',
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

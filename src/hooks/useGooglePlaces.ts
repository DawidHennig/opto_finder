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

// ponytail: Simple XML parser for Overpass response (no extra deps!)
const parseOverpassXML = (xmlString: string): PlaceResult[] => {
  const results: PlaceResult[] = [];

  // Parse nodes: <node id="..." lat="..." lon="..."><tag k="..." v="..."/></node>
  const nodeRegex = /<node[^>]*id="(\d+)"[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"[^>]*>(.*?)<\/node>/gs;
  const wayRegex = /<way[^>]*id="(\d+)"[^>]*>(.*?)<center[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"[^>]*\/>(.*?)<\/way>/gs;

  let match;

  // Parse nodes
  while ((match = nodeRegex.exec(xmlString)) !== null) {
    const id = match[1];
    const lat = parseFloat(match[2]);
    const lng = parseFloat(match[3]);
    const tagsStr = match[4];

    const tags = parseTagsFromXML(tagsStr);
    const place = createPlaceFromTags(id, lat, lng, tags);
    if (place) results.push(place);
  }

  // Parse ways
  while ((match = wayRegex.exec(xmlString)) !== null) {
    const id = match[1];
    const lat = parseFloat(match[3]);
    const lng = parseFloat(match[4]);
    const tagsStr = match[2] + match[5];

    const tags = parseTagsFromTags(tagsStr);
    const place = createPlaceFromTags(id, lat, lng, tags);
    if (place) results.push(place);
  }

  return results;
};

const parseTagsFromXML = (tagsStr: string): { [key: string]: string } => {
  const tags: { [key: string]: string } = {};
  const tagRegex = /<tag\s+k="([^"]+)"\s+v="([^"]*)"/g;
  let match;

  while ((match = tagRegex.exec(tagsStr)) !== null) {
    tags[match[1]] = match[2];
  }

  return tags;
};

const parseTagsFromTags = (tagsStr: string): { [key: string]: string } => {
  // For way tags which are after center tag
  const tags: { [key: string]: string } = {};
  const tagRegex = /<tag\s+k="([^"]+)"\s+v="([^"]*)"/g;
  let match;

  while ((match = tagRegex.exec(tagsStr)) !== null) {
    tags[match[1]] = match[2];
  }

  return tags;
};

const createPlaceFromTags = (id: string, lat: number, lng: number, tags: { [key: string]: string }): PlaceResult | null => {
  if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;

  const address = [tags['addr:street'], tags['addr:housenumber'], tags['addr:postcode'], tags['addr:city']]
    .filter(Boolean)
    .join(', ') || tags.name || 'Adres nieznany';

  return {
    id: id,
    name: tags.name || tags['healthcare:speciality'] || tags.shop || 'Optyka',
    address: address,
    lat: lat,
    lng: lng,
    phone: tags['contact:phone'] || tags.phone,
    website: tags.website || tags['contact:website'],
    type: tags.healthcare || tags.shop || 'healthcare',
  };
};

export const useGooglePlaces = () => {
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback(
    (location: GeolocationCoords, radiusKm: number = 5) => {
      setLoading(true);
      setError(null);

      // Overpass API bbox format
      const south = location.lat - radiusKm / 111;
      const west = location.lng - radiusKm / 111;
      const north = location.lat + radiusKm / 111;
      const east = location.lng + radiusKm / 111;
      const bbox = `[bbox:${south},${west},${north},${east}]`;

      // Query: search for optometrist, ophthalmology, optician, glasses
      const query = `${bbox};(node["healthcare"="optometrist"];way["healthcare"="optometrist"];node["healthcare"="ophthalmology"];way["healthcare"="ophthalmology"];node["shop"="optician"];way["shop"="optician"];node["shop"="glasses"];way["shop"="glasses"];);out center;`;

      console.log('🔍 Searching Overpass API, radius:', radiusKm, 'km');

      axios
        .post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          timeout: 20000,
        })
        .then((response) => {
          console.log('✅ Overpass response received, parsing...');
          const results = parseOverpassXML(response.data);
          console.log(`✅ Found ${results.length} places`);
          setPlaces(results);
        })
        .catch((error) => {
          console.error('❌ Search error:', error.message);

          if (error.code === 'ECONNABORTED') {
            setError('Timeout - Overpass API nie odpowiada. Spróbuj za chwilę.');
          } else if (error.response?.status === 429) {
            setError('Za wiele zapytań. Czekaj kilka minut.');
          } else if (error.response?.status === 400) {
            setError('Błąd zapytania. Spróbuj zmienić zasięg.');
          } else {
            setError('Błąd wyszukiwania. Sprawdź internet i spróbuj ponownie.');
          }
        })
        .finally(() => setLoading(false));
    },
    []
  );

  return { places, loading, error, searchPlaces };
};

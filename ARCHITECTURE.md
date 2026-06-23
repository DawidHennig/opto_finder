# 🏗️ Architektura aplikacji

Techniczny opis struktury OptoFinder.

## Tech Stack

```
Frontend Layer
├── React 19.2 (UI)
├── TypeScript 4.9 (Type safety)
└── CSS (Vanilla, brak frameworka)

Maps & Location
├── Leaflet (map library)
├── OpenStreetMap (tiles)
├── Overpass API (POI search)
└── Geolocation API (Browser)

Build & Dev
├── Create React App
└── Node.js + npm

Benefit: 100% FREE (no API keys!)
```

## Struktura folderów

```
opto_finder/
├── public/
│   ├── index.html          # Entry HTML
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/         # React komponenty
│   │   ├── Map.tsx         # Mapa Google Maps
│   │   ├── ResultsList.tsx # Lista wyników
│   │   └── PlaceDetails.tsx# Szczegóły miejsca
│   ├── hooks/              # Custom Hooks
│   │   ├── useGeolocation.ts   # Lokalizacja użytkownika
│   │   └── useGooglePlaces.ts  # Places API
│   ├── App.tsx             # Root component
│   ├── App.css             # Globalne style
│   ├── index.tsx           # React root
│   └── react-app-env.d.ts  # Type definitions
├── build/                  # Production build (po npm run build)
├── package.json
├── tsconfig.json
├── .env.local              # Zmienne środowiskowe (ignorowano w git)
├── .env.example            # Template .env
├── .gitignore
├── README.md
├── GOOGLE_CLOUD_SETUP.md
├── DEPLOYMENT.md
├── USER_GUIDE.md
├── ARCHITECTURE.md (ten plik)
└── start.sh                # Quick start script
```

## Flow aplikacji

```
1. User visits app
   ↓
2. App.tsx mounts
   ├─ useGeolocation() hook triggers
   │  └─ Browser asks permission for location
   │     └─ Returns lat/lng
   │
   ├─ Google Maps Script loads (async)
   │  └─ window.google.maps available
   │
   └─ Map component mounts
      └─ Creates Google Map instance

3. Location obtained
   ↓
4. useGooglePlaces() hook triggers searchPlaces()
   ├─ Gets location + radius from controls
   ├─ Creates PlacesService
   ├─ Calls nearbySearch("optometrysta")
   └─ Returns array of PlaceResult[]

5. Results populate
   ├─ Map gets markers for each place
   ├─ ResultsList gets data
   └─ User can click markers or list items

6. User clicks place
   ├─ setSelectedPlace() updates state
   ├─ Map highlights with red marker
   ├─ PlaceDetails shows on sidebar
   └─ User can click "Wyślij maila" → mailto:

7. (Optional) User changes radius
   ├─ setRadius() updates state
   ├─ useEffect dependency triggers searchPlaces()
   └─ New results load
```

## Komponenty

### App.tsx
**Purpose:** Root component, state management  
**State:**
- `location` - Geolokacja użytkownika (lat/lng)
- `selectedPlace` - Kliknięte miejsce
- `radius` - Zasięg wyszukiwania (km)

**Props passed to children:**
- Map: center, places, selectedPlace, onPlaceClick
- ResultsList: places, selectedPlace, onPlaceClick, loading
- PlaceDetails: place

---

### Map.tsx
**Purpose:** Render Google Map z markerami  
**Props:**
- `center: GeolocationCoords` - Środek mapy (Twoja lokalizacja)
- `places: PlaceResult[]` - Markery do wyświetlenia
- `selectedPlace: PlaceResult | null` - Zaznaczone miejsce (kolor zmienia się na czerwone)
- `onPlaceClick: (place) => void` - Callback gdy kliknięte

**Logic:**
- useEffect: inicjalizuje mapę przy pierwszym renderze
- useEffect: aktualizuje markery gdy `places` się zmienia
- Kolory: 🔵 User = blue, 🟡 Result = yellow, 🔴 Selected = red
- Listener: Kliknięcie markera → onPlaceClick callback

---

### ResultsList.tsx
**Purpose:** Wyświetl listę wyników w sidebar  
**Props:**
- `places: PlaceResult[]` - Lista miejsc
- `selectedPlace: PlaceResult | null` - Zaznaczone
- `onPlaceClick: (place) => void` - Callback
- `loading: boolean` - Pokazuj spinner

**Logic:**
- Mapowanie `places` na karty
- Zaznaczony element: blue bg + left border
- Loading state: "Wyszukiwanie..."
- Empty state: "Brak wyników"

---

### PlaceDetails.tsx
**Purpose:** Pokaż szczegóły klikniętego miejsca  
**Props:**
- `place: PlaceResult` - Dane do wyświetlenia

**Logic:**
- Wyświetla: nazwa, adres, telefon (tel: link), ocena, website (https link), godziny
- Przycisk "Wyślij maila" → `mailto:` link
- Pure functional, brak logiki

---

## Hooks

### useGeolocation.ts
**Returns:**
```typescript
{
  location: { lat, lng } | null
  error: string | null
  loading: boolean
}
```

**Logic:**
- `navigator.geolocation.getCurrentPosition()`
- Async, wykonuje się raz przy mount
- Error handling: brak geolocation, brak zgody, timeout (5s)

---

### useGooglePlaces.ts
**Returns:**
```typescript
{
  places: PlaceResult[]
  loading: boolean
  error: string | null
  searchPlaces: (location, radius) => void
}
```

**Logic:**
- `PlacesService.nearbySearch(request)`
- Request: keyword="optometrysta", type="health"
- Formatuje rezultaty do `PlaceResult[]`
- Error handling: status !== OK

---

## Data Flow (Redux-free)

```
App (state)
├── location, selectedPlace, radius
└── Propaguje do children

Components (pure)
├── Map: render + effects (DOM)
├── ResultsList: render (pure)
└── PlaceDetails: render (pure)

Hooks (logic)
├── useGeolocation: side effect
└── useGooglePlaces: side effect
```

**Ponytail note:** Bez Redux/Zustand, wystarczy useState + useContext nie potrzebny (tylko 3 state properties)

---

## API Endpoints Used

### Overpass API
- **Endpoint:** `https://overpass-api.de/api/interpreter`
- **Method:** POST
- **Query:** OverpassQL (OSM query language)
- **Response:** JSON/XML
- **Rate Limit:** 1,000,000 nodes/month (free tier)

### Request shape (Overpass QL)
```
[bbox:south,west,north,east];
(
  node["healthcare"="optometrist"];
  way["healthcare"="optometrist"];
  node["shop"="optician"];
  way["shop"="optician"];
);
out center;
```

### Response shape (PlaceResult)
```javascript
{
  id: string,           // OSM element ID
  name: string,         // Place name
  address: string,      // addr:street + addr:city
  lat: number,
  lng: number,
  phone?: string,       // contact:phone
  website?: string,     // website tag
  type: string          // healthcare or shop
}
```

---

## Geolocation API

- **Browser API:** `navigator.geolocation.getCurrentPosition()`
- **Requires:** HTTPS (except localhost) + User permission
- **Accuracy:** Zależy od GPS/WiFi, zwykle 10-30m

---

## Performance Optimizations (ponytail)

1. **No server** - Direct Google Maps API, latency reduced
2. **CSS-in-JS inline** - One less HTTP request per component
3. **No build-time optimization** - CRA handles minification
4. **useCallback memoization** - searchPlaces() only recreated if deps change
5. **useRef for DOM** - mapContainer doesn't cause re-render on every change

---

## Security Considerations

1. **API Key restriction** - Set HTTP referrers in Google Cloud Console
2. **No sensitive data** - Location is client-side, not stored
3. **HTTPS required** - Geolocation API enforces HTTPS (except localhost)
4. **CORS** - Google handles CORS for API requests

---

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ⚠️ IE11 - Not supported (no support for modern JS)

---

## Testing Strategy (if added)

Minimal, per ponytail:
- Map mounts without error
- useGeolocation returns valid coords
- useGooglePlaces formats results correctly
- onClick handlers trigger callbacks

NO: Full unit test suite (over-engineering)

---

## Future Improvements (not implemented, ponytail:)

- Filter by rating/type
- Search history
- Favorite places
- Mobile app (React Native)
- Backend for user preferences
- Caching layer (Service Worker)

---

**Last updated:** 2026-06-23

# 🗺️ OpenStreetMap Setup

OptoFinder używa **całkowicie darmowych** źródeł map i danych:
- **Mapy**: OpenStreetMap (Leaflet)
- **Wyszukiwanie**: Overpass API
- **Geolokacja**: Browser Geolocation API

## ✅ Korzyści (vs Google Maps)

| Aspekt | OpenStreetMap | Google Maps |
|--------|---|---|
| Koszt | 💚 **Darmowe** | 💰 Płatny ($$) |
| Limit API | ∞ Brak limitu | 25k/dzień |
| Dane | Otwarte (OSM) | Zamknięte |
| Licencja | ODbL (open) | Proprietary |
| Setup | Brak API Key | API Key wymagany |
| Ponad 10k requests | ✅ OK | ❌ Będą opłaty |

---

## 🚀 Jak działa

### 1. Mapy (Leaflet + OpenStreetMap)
```
User Browser
    ↓
Leaflet.js (library)
    ↓
OpenStreetMap tiles
    ↓
Display map
```

- **Leaflet** - lekka biblioteka (52 KB)
- **OpenStreetMap** - mapy z edytorem społeczności
- **Brak API Key** - publiczne mozaiki kafelków

### 2. Wyszukiwanie (Overpass API)
```
User searches "optometrysta" within 5km
    ↓
Query: healthcare=optometrist OR shop=optician
    ↓
Overpass API (osm3s.de)
    ↓
Return results (XML/JSON)
    ↓
Display on map
```

- **Overpass API** - queryable database OpenStreetMap
- **Free tier** - do 1,000,000 węzłów/miesiąc (wystarczy!)
- **Brak Auth** - public access

### 3. Geolokacja (Browser API)
```
User allows location access
    ↓
navigator.geolocation.getCurrentPosition()
    ↓
Browser returns lat/lng
    ↓
App uses for search center
```

---

## 📊 Rate Limits

### Overpass API
- **Stanowić**: 1,000,000 węzłów/miesiąc
- **Timeout**: 540 sekund (default)
- **Concurrent**: 2 simultaneous queries

Dla aplikacji wyszukiwania optometrystów - **nie stanowi problemu**.

---

## 🔧 Optimizacja

```typescript
// ponytail: Query optimization - OSM bbox
const bbox = `(${lat-km/111},${lng-km/111},${lat+km/111},${lng+km/111})`;

// Szuka tylko:
// - healthcare=optometrist
// - shop=optician
// W specified bounding box
```

---

## 📝 Dane w OpenStreetMap

Wszystkie dane to user-contributed (wiki-style):

- **Nazwa**: `name=*`
- **Telefon**: `contact:phone` lub `phone`
- **Strona**: `website` lub `contact:website`
- **Adres**: `addr:street`, `addr:city`, etc.
- **Godziny**: `opening_hours` (iCal format)

### Jak zaktualizować dane?

1. Wejdź na https://www.openstreetmap.org
2. Zaloguj się (lub stwórz konto)
3. Klikni "Edit"
4. Dodaj/zmień informacje
5. Commit z komentarzem

👉 Twoje zmiany pojawią się w aplikacji po kilku minutach (cache refresh).

---

## 🐛 Troubleshooting

### "Brak wyników"

1. **Dane nie w OSM** - Dodaj je! https://www.openstreetmap.org/edit
2. **Wyłącz ad block** - Może blokować Overpass API
3. **Spróbuj większy radius** - 25 km zamiast 5 km
4. **Czekaj** - Overpass cache mogą być stare (do 15 min)

### "Błąd: Overpass API timeout"

Overpass jest przeciążony. Czekaj kilka minut i spróbuj ponownie.

### "Mapa nie ładuje się"

1. Sprawdź internet (OSM CDN może być offline)
2. Otwórz DevTools (F12) → Network
3. Sprawdzaj czy tile requests dochodza

---

## 📚 Dokumentacja

- **Leaflet**: https://leafletjs.com/
- **OpenStreetMap**: https://www.openstreetmap.org/
- **Overpass API**: https://wiki.openstreetmap.org/wiki/Overpass_API
- **OSM Tags**: https://wiki.openstreetmap.org/wiki/Map_features

---

## 💰 Koszt

| Komponent | Koszt |
|-----------|-------|
| Leaflet | $0 (MIT) |
| OpenStreetMap | $0 (ODbL) |
| Overpass API | $0 (public) |
| Geolocation | $0 (browser) |
| **Total** | **$0** ✨ |

---

**Ekologia:** OpenStreetMap to projekt non-profit wspierany przez oddaną komunię!

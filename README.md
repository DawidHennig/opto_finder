# OptoFinder 🔍

Aplikacja webowa do wyszukiwania miejsc pracy dla optometrystów. Wyświetla wyniki na interaktywnej mapie Google Maps z możliwością podglądu szczegółów i wysłania maila.

## Funktionalności

✅ **Geolokacja** - Automatyczne pobieranie lokalizacji użytkownika  
✅ **Wyszukiwanie na mapie** - Google Places API  
✅ **Interaktywna mapa** - Markery, zoom, szczegóły  
✅ **Lista wyników** - Sortowalna, klikalny podgląd  
✅ **Szczegóły miejsca** - Godziny, telefon, ocena, link do strony  
✅ **Wysyłanie maila** - Przycisk `mailto:` dla zapytań  
✅ **Responsywna** - Działa na mobile i desktop  
✅ **Zasięg wyszukiwania** - Regulowany z dropdown (1-25 km)

## ⚡ Quick Start

**Zaraz? Tylko 3 minuty - bez API Key!**

```bash
npm install
npm start
```

→ Otwiera się http://localhost:3000  
→ Pozwól na dostęp do lokalizacji  
→ Gotowe! 🎉

👉 **Szczegóły:** zobacz `QUICKSTART.md`

---

## Wymagania

- Node.js 14+ i npm
- Brak konieczności API Key (100% darmowe!)
- OpenStreetMap + Overpass API (wolne źródła)

## Wymagania

- Node.js 14+ i npm
- Brak konieczności API Key (100% darmowe!)
- OpenStreetMap + Overpass API (wolne źródła)

## Setup (Pełny)

### 1. Klonowanie / Pobranie
```bash
cd /Users/dawid/fun/opto_finder
npm install
```

### 2. Uruchomienie

**Tryb development:**
```bash
npm start
```
Aplikacja otworzy się na http://localhost:3000

**Tryb production:**
```bash
npm run build
npm install -g serve
serve -s build
```

## Struktura projektu

```
src/
├── components/
│   ├── Map.tsx           - Mapa z markerami
│   ├── ResultsList.tsx   - Lista wyników
│   └── PlaceDetails.tsx  - Szczegóły miejsca
├── hooks/
│   ├── useGeolocation.ts - Hook do pobierania lokalizacji
│   └── useGooglePlaces.ts- Hook do wyszukiwania
├── App.tsx               - Główny komponent
└── App.css               - Style
```

## Notatki

- **100% darmowe** - OpenStreetMap (nie Google Maps)
- **Bez limitów API** - Overpass API dla wyszukiwania
- **Geolokacja**: Wymaga zgody użytkownika
- **Dane** pochodzą z OpenStreetMap (wolne źródło)
- **Performance**: 125 KB JS (gzipped, razem z Leaflet)

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop build/ folder na Netlify
```

### GitHub Pages
Ustaw `homepage` w package.json, zbuduj i push na branch `gh-pages`

## Troubleshooting

**"Brak REACT_APP_GOOGLE_MAPS_API_KEY"**
→ Utwórz `.env.local` z API Key

**"Błąd geolokacji"**
→ Sprawdź zgody przeglądarki (Settings → Privacy → Location)

**Mapa nie ładuje się**
→ Weryfikuj API Key w Cloud Console, sprawdź quotę

**Brak wyników dla "optometrysta"**
→ Spróbuj większy zasięg, niektóre miasta mogą nie mieć danych

## Licencja

MIT

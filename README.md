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

**Zaraz? Tylko 5 minut:**

1. Zdobądź Google Maps API Key: https://console.cloud.google.com → Enable Maps JS API + Places API
2. `cp .env.example .env.local && echo "REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_KEY" >> .env.local`
3. `npm start`
4. Aplikacja otwiera się na http://localhost:3000
5. Pozwól na dostęp do lokalizacji
6. Gotowe! 🎉

👉 **Szczegóły:** zobacz `QUICKSTART.md`

---

## Wymagania

- Node.js 14+ i npm
- **Google Cloud API Key** z włączonymi:
  - Google Maps API
  - Places API

## Setup (Pełny)

### 1. Klonowanie / Pobranie
```bash
cd /Users/dawid/fun/opto_finder
npm install
```

### 2. Konfiguracja API Key

Utwórz plik `.env.local` w root projektu:

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

Gdzie `YOUR_API_KEY_HERE` to Twój klucz z Google Cloud Console.

**Jak uzyskać API Key:**
1. Wejdź na https://console.cloud.google.com
2. Stwórz projekt
3. Włącz: Maps JavaScript API i Places API
4. Wygeneruj API Key w sekcji Credentials
5. Wklej do `.env.local`

### 3. Uruchomienie

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

- **Ponytail**: Bez backendu, bezpośrednio z Google Places API
- **Markery**: Niebieska = Twoja lokalizacja, Żółta = wyniki, Czerwona = zaznaczony
- **Geolokacja**: Wymaga zgody użytkownika
- **CORS**: Google Maps API obsługuje domeny, dodaj swoje w Cloud Console

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

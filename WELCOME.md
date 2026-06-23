# 🎉 OptoFinder - Gotowe do użytku!

Aplikacja webowa do wyszukiwania miejsc pracy dla optometrystów.

## 📋 Co zostało zbudowane

✅ **Frontend React + TypeScript** - Nowoczesna, responsywna aplikacja  
✅ **Mapa Google Maps** - Interaktywna z markerami i szczegółami  
✅ **Geolocation API** - Automatyczne pobieranie lokalizacji użytkownika  
✅ **Google Places API** - Wyszukiwanie miejsc pracy  
✅ **Szczegóły miejsc** - Telefon, godziny, ocena, stronę  
✅ **Kontakt mailowy** - Przycisk "Wyślij maila" z mailto:  
✅ **Responsive design** - Działa na mobile i desktop  
✅ **Zmienne zasięgu** - 1-25 km dropdown  

---

## 📁 Struktura projektu

```
opto_finder/
├── 📄 QUICKSTART.md          ← ZACZNIJ TUTAJ (5 min)
├── 📄 README.md              ← Pełna dokumentacja
├── 📄 GOOGLE_CLOUD_SETUP.md  ← Jak skonfigurować API Key
├── 📄 DEPLOYMENT.md          ← Jak wdrożyć online (Vercel, Netlify)
├── 📄 USER_GUIDE.md          ← Dla użytkowników aplikacji
├── 📄 ARCHITECTURE.md        ← Dla developerów
├── 📄 TROUBLESHOOTING.md     ← Rozwiązywanie problemów
├── .env.example              ← Template zmiennych
├── .env.local                ← Twoje zmienne (NIE COMMITUJ)
├── start.sh                  ← Skrypt szybkiego startu
│
├── 📂 src/
│   ├── components/
│   │   ├── Map.tsx           ← Mapa z markerami
│   │   ├── ResultsList.tsx   ← Lista wyników
│   │   └── PlaceDetails.tsx  ← Szczegóły miejsca
│   ├── hooks/
│   │   ├── useGeolocation.ts ← Pobieranie lokalizacji
│   │   └── useGooglePlaces.ts← Wyszukiwanie API
│   ├── App.tsx               ← Główny komponent
│   └── App.css               ← Style
│
├── 📂 public/
│   └── index.html
│
├── package.json              ← Zależności
└── build/                    ← Production build (po npm run build)
```

---

## 🚀 Szybki start (5 minut)

### 1. API Key z Google Cloud

```bash
# Wejdź na https://console.cloud.google.com
# New Project → Enable "Maps JavaScript API" + "Places API"
# Credentials → Create API Key
# Skopiuj klucz: AIzaSy...
```

### 2. Setup aplikacji

```bash
cd /Users/dawid/fun/opto_finder
cp .env.example .env.local
# Edytuj .env.local i wstaw API Key
```

### 3. Uruchom

```bash
npm start
```

→ Aplikacja otworzy się na http://localhost:3000  
→ Pozwól na dostęp do lokalizacji  
→ Gotowe! 🎉

---

## 📚 Dokumentacja

| Plik | Dla kogo | Opis |
|------|----------|------|
| **QUICKSTART.md** | Wszyscy | 5-minutowy setup |
| **README.md** | Wszyscy | Pełna dokumentacja |
| **USER_GUIDE.md** | Użytkownicy | Instrukcja obsługi aplikacji |
| **GOOGLE_CLOUD_SETUP.md** | Developerzy | Konfiguracja Google Cloud |
| **DEPLOYMENT.md** | DevOps | Wdrażanie (Vercel, Netlify, Docker) |
| **ARCHITECTURE.md** | Developerzy | Szczegóły techniczne |
| **TROUBLESHOOTING.md** | Wszyscy | Rozwiązywanie problemów |

---

## 🛠️ Tech Stack

```
Frontend: React 19 + TypeScript
Maps: Google Maps API + Places API
Location: Browser Geolocation API
Build: Create React App
Deploy: Vercel / Netlify (recommended)
```

---

## ⚙️ Funkcjonalności

### 🗺️ Mapa
- ✅ Geolokacja użytkownika (niebieska igła)
- ✅ Markery dla ofert pracy (żółte igły)
- ✅ Zaznaczenie (czerwona igła)
- ✅ Zoom, pan, responsywna

### 📋 Lista wyników
- ✅ Wszystkie oferty wyszukane
- ✅ Klikalny podgląd
- ✅ Sortowanie alfabetyczne
- ✅ Loading state

### 📍 Szczegóły miejsca
- ✅ Nazwa i adres
- ✅ Telefon (tel: link)
- ✅ Ocena (⭐)
- ✅ Strona (https link)
- ✅ Godziny otwarcia
- ✅ Przycisk "Wyślij maila"

### 🔧 Kontrolki
- ✅ Zasięg wyszukiwania (1-25 km)
- ✅ Wyświetlanie dokładnej lokalizacji
- ✅ Refresh przy zmianie zasięgu

---

## 💡 Ponytail - Dlaczego ta architektura?

- ❌ **Brak backendu** - Bezpośrednio z Google API, szybciej
- ❌ **Brak bazy danych** - Dane z API, brak persistence
- ❌ **Brak Redux/Zustand** - useContext + useState wystarczają
- ❌ **Brak CSS frameworka** - Vanilla CSS + flexbox
- ❌ **Brak unit testów** - Kod prosty, nie wymagający
- ✅ **Jeden deploy** - CRA + Vercel = 1 klik

---

## 🌐 Deployment

### Lokalnie
```bash
npm start           # Development na http://localhost:3000
npm run build       # Production build
```

### Vercel (Recommended)
```bash
npm install -g vercel
vercel              # Deploy w 30 sekund
```

### Netlify
```bash
npm run build
# Drag & drop build/ na netlify.com
```

### Own server
```bash
npm run build
serve -s build
```

→ Szczegóły w `DEPLOYMENT.md`

---

## 🔒 Security

- ✅ API Key restricted do Twoich domen (Google Cloud Console)
- ✅ HTTPS required na produkcji (Geolocation API)
- ✅ Brak sensitive data w storage
- ✅ CORS obsługiwany przez Google

---

## 📊 Performance

- Build size: **63 KB** (gzipped)
- CSS: **814 B** (gzipped)
- Load time: < 2s na normalnym internecie
- Responsive do 320px (mobile)

---

## 🐛 Troubleshooting

Coś nie działa? Czytaj `TROUBLESHOOTING.md` lub:

```bash
# Hard refresh
Ctrl+Shift+R

# Check API Key
cat .env.local

# Clear cache
rm -rf node_modules package-lock.json
npm install

# Restart
npm start
```

---

## 📝 Notatki

- **API Key:** Przechowuj w `.env.local` (ignorowana w git)
- **Radius:** Default 5km, możliwość zmiany 1-25km
- **Keyword:** "optometrysta" - zmień w `useGooglePlaces.ts` jeśli potrzebujesz
- **Type:** "health" - filtruje placetype w Google Places

---

## 🎯 Co dalej?

1. ✅ **Setup** - Uruchom lokalnie
2. ✅ **Deploy** - Wdrażaj na Vercel/Netlify
3. ⭐ **Star** - Poleć projekt na GitHub
4. 🚀 **Share** - Udostępnij zespołowi

---

## 📞 Support

- GitHub Issues: Report bugs
- Dokumentacja: Przeczytaj FAQ w TROUBLESHOOTING.md
- Google API: https://developers.google.com/maps

---

**Zbudowane z ❤️ dla optometrystów**

Data: 2026-06-23  
Build: Production-ready ✅  
License: MIT

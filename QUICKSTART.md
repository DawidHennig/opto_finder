# ⚡ Quick Start (3 minuty)

## 1. Zainstaluj zależności

```bash
cd /Users/dawid/fun/opto_finder
npm install
```

---

## 2. Uruchom aplikację

```bash
npm start
```

Browser się otworzy automatycznie na `http://localhost:3000`

---

## 3. Pozwól na dostęp do lokalizacji

Aplikacja zapyta: **"Pozwól na dostęp do lokalizacji?"** → Klikni **Allow**

---

## 4. Przeglądaj wyniki!

- 🗺️ Mapa pokazuje Twoją lokalizację (niebieska igła)
- 🟡 Żółte igły = miejsca pracy dla optometrystów
- 📋 Klikaj na wyniki w liście po prawej
- ✉️ Klikaj "Wyślij maila" aby skontaktować się z miejscem

---

## ✨ 100% Darmowe!

Brak API Key, brak limitów, brak kosztów. Używamy:
- **OpenStreetMap** do map
- **Overpass API** do wyszukiwania
- **Browser Geolocation API** do lokalizacji

👉 Szczegóły: `OPENSTREETMAP.md`

---

## Troubleshooting

**"npm install nie działa"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**"Mapa nie ładuje się"**
1. Czekaj 2-3 sekundy (Leaflet się ładuje)
2. Sprawdź internet (OSM CDN)
3. Otwórz DevTools (F12 → Console) i sprawdzaj błędy

**"Brak wyników dla optometrystów"**
- Domyślny zasięg to 50 km - sprawdź listę po prawej
- Jeśli dalej nic, zwiększ do 100-200 km
- Dane pochodzą z OpenStreetMap (crowd-sourced)
- Możesz dodać dane! https://www.openstreetmap.org/edit
- Szuka: optometristów, oftalmologów, sklepów z okularami

---

## Następne kroki

- 📖 `README.md` - pełna dokumentacja
- 🚀 `DEPLOYMENT.md` - wdrażanie online
- 👤 `USER_GUIDE.md` - instrukcja dla użytkowników
- 🗺️ `OPENSTREETMAP.md` - jak działa OSM

---

**Gotowe!** Aplikacja pracuje w pełni. 🎉

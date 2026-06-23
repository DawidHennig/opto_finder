# ⚡ Quick Start (5 minut)

## 1. Pobierz Google Maps API Key

1. Wejdź na: https://console.cloud.google.com
2. "New Project" → Nazwa: `OptoFinder`
3. W search wpisz `Maps JavaScript API` → Enable
4. W search wpisz `Places API` → Enable
5. Idź do "Credentials" → "Create API Key"
6. Skopiuj klucz

> 📖 Szczegóły: patrz `GOOGLE_CLOUD_SETUP.md`

---

## 2. Setup projektu

```bash
cd /Users/dawid/fun/opto_finder

# Skopiuj template .env
cp .env.example .env.local

# Edytuj .env.local i wstaw Twój klucz
# REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSy...
```

Użyj dowolnego edytora (VS Code, nano, etc.):
```bash
nano .env.local
# Paste: REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
# Ctrl+X → Y → Enter (save)
```

---

## 3. Uruchom aplikację

```bash
npm start
```

Browser się otworzy automatycznie na `http://localhost:3000`

Lub ręcznie: otwórz http://localhost:3000

---

## 4. Pozwól na dostęp do lokalizacji

Aplikacja zapyta: "Pozwól na dostęp do lokalizacji?" → **Allow**

---

## 5. Przeglądaj wyniki!

- 🗺️ Mapa pokazuje Twoją lokalizację (niebieska igła)
- 🟡 Żółte igły = miejsca pracy dla optometrystów
- 📋 Klikaj na wyniki w liście po prawej
- ✉️ Klikaj "Wyślij maila" aby skontaktować się z miejscem

---

## Troubleshooting

**"Brak REACT_APP_GOOGLE_MAPS_API_KEY"**
```bash
cat .env.local  # Sprawdź czy jest klucz
# Jeśli pusty lub zawiera YOUR_API_KEY, zamiast rzeczywistego → edit
```

**"Mapa nie ładuje się"**
1. Sprawdź Chrome DevTools (F12 → Console) → czy są błędy?
2. Sprawdź czy API Keys są włączone w Google Cloud
3. Czekaj 30s - nowe klucze mogą chwilę się inicjalizować

**"Brak wyników"**
- Spróbuj zasięg 10km zamiast 5km
- Pewne miasta mogą nie mieć danych w Google Maps

---

## Następne kroki

- 📖 Czytaj `README.md` dla pełnej dokumentacji
- 🚀 Czytaj `DEPLOYMENT.md` do wdrażania online
- 👤 Czytaj `USER_GUIDE.md` do instrukcji dla użytkowników
- 🏗️ Czytaj `ARCHITECTURE.md` do szczegółów technicznych

---

**Gotowe!** Aplikacja jest w pełni działająca. 🎉

# 🔧 Konfiguracja Google Cloud API

## Krok po kroku

### 1. Stwórz projekt w Google Cloud Console

1. Wejdź na https://console.cloud.google.com
2. Klikni "New Project"
3. Nadaj nazwę, np. "OptoFinder"
4. Czekaj na utworzenie (kilka sekund)

### 2. Włącz Maps JavaScript API

1. W panelu wyszukiwania u góry wpisz: **Maps JavaScript API**
2. Klikni wynik
3. Klikni "ENABLE"

### 3. Włącz Places API

1. W panelu wyszukiwania wpisz: **Places API**
2. Klikni wynik
3. Klikni "ENABLE"

### 4. Wygeneruj API Key

1. Po lewej stronie klikni **Credentials**
2. Klikni **Create Credentials** → **API Key**
3. Skopiuj wygenerowany klucz

### 5. Ustaw ograniczenia (opcjonalnie, ale zalecane)

1. Klikni w wygenerowany API Key
2. Przewiń do "Application restrictions"
3. Wybierz: **HTTP referrers (web sites)**
4. Dodaj domeny, na których będzie działać (np. `localhost:3000`, `twoja-domena.com`)
5. Przewiń do "API restrictions"
6. Wybierz: "Restrict key"
7. Zaznacz:
   - ✅ Maps JavaScript API
   - ✅ Places API
8. Klikni "Save"

### 6. Dodaj klucz do projektu

```bash
# W pliku .env.local
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyA...
```

## Quota i limity

- **Free tier**: 28,500 map loads dziennie
- **Places API**: 150 QPS (queries per second)
- Więcej info: https://developers.google.com/maps/billing-and-pricing

## Troubleshooting

**"API key not valid"**
→ Sprawdź czy klucz jest skopiowany całkowicie, czy aplikacja ma dostęp

**"Access Denied"**
→ Sprawdź czy APIs są włączone w projekcie

**"Maps not loading"**
→ Sprawdź czy `HTTP referrers` nie są zbyt restrykcyjne

**"Zero results"**
→ Sprawdź czy Places API jest włączona

## Koszty

Domyślnie Google Cloud nie pobiera opłat jeśli jesteś poniżej limitów free tier.
Ustaw **billing alerts** w Cloud Console, aby być powiadomiony.

---

**Potrzebujesz pomocy?** → Dokumentacja: https://developers.google.com/maps

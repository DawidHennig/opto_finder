# 🔧 Troubleshooting

Rozwiązania dla częstych problemów.

## Problemy przy starcie

### "npm: command not found"

Nie masz zainstalowanego Node.js.

**Rozwiązanie:**
1. Pobierz z https://nodejs.org (LTS version)
2. Zainstaluj
3. Sprawdź: `node --version`

---

### "npm install" nie działa

Możliwe przyczyny:
- Brak internetu
- Problemy z npm registry
- Uprawnienia do folderu

**Rozwiązanie:**
```bash
# Clear cache
npm cache clean --force

# Try again
npm install

# Jeśli dalej nie działa:
rm -rf node_modules package-lock.json
npm install
```

---

## Problemy z Google Maps

### "Brak REACT_APP_GOOGLE_MAPS_API_KEY w .env.local"

Nie ustawiłeś klucza API.

**Rozwiązanie:**
```bash
# Skopiuj template
cp .env.example .env.local

# Edytuj plik i wstaw klucz
nano .env.local
# REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSy...

# Zapisz (Ctrl+X → Y → Enter)

# Restartuj aplikację
npm start
```

---

### "API key not valid" (Console errors)

Klucz jest niepoprawny lub nie zadziała.

**Rozwiązanie:**
1. Sprawdź czy skopiowałeś całe `AIzaSy...`
2. Wejdź na Google Cloud Console
3. Credentials → kliknij API Key
4. Sprawdź czy:
   - ✅ Maps JavaScript API jest enabled
   - ✅ Places API jest enabled
5. Czekaj 30 sekund (nowe klucze chwilę się inicjalizują)
6. Refresh strony (Ctrl+Shift+R - hard refresh)

---

### "Maps not loading" lub biały ekran

Mapa się nie pojawia, ale bez błędu w konsoli.

**Rozwiązanie:**
1. Otwórz DevTools (F12)
2. Idź do "Console" tab
3. Szukaj błędów (czerwone)
4. Jeśli jest błąd dotyczący API → sprawdź API Key
5. Jeśli jest CORS error → sprawdź czy HTTP referrers są skonfigurowane w Google Cloud Console

---

### "Geolocation blocked"

Aplikacja nie ma dostępu do lokalizacji.

**Rozwiązanie:**

**Chrome:**
1. Settings → Privacy and security → Site settings
2. Location
3. Znajdź `localhost:3000`
4. Zmień na "Allow"
5. Refresh strony

**Firefox:**
1. Address bar: type `about:preferences#privacy`
2. Scroll do "Permissions"
3. Kliknij "Settings" obok "Location"
4. Usuń `localhost:3000` (jeśli blocked) lub dodaj (jeśli nie ma)
5. Refresh strony

**Safari:**
1. Preferences → Privacy
2. Zaznacz "Allow privacy-preserving privacy tracking"
3. Refresh strony (Location dialog powinna się pojawić)

---

### "Brak wyników dla 'optometrysta'"

Wyszukiwanie nie zwraca żadnych rezultatów.

**Przyczyny i rozwiązania:**

1. **Zbyt mały zasięg**
   - Spróbuj 10km zamiast 5km
   - Lub 25km

2. **Brak danych w Google Maps**
   - Niektóre miasta/regiony mogą nie mieć kompletnych danych
   - Spróbuj większe miasto

3. **Google API limit**
   - Jeśli masz darmowy tier, być może osiągnąłeś limit
   - Sprawdź Google Cloud Console → Quotas

---

## Problemy z wydajnością

### "Aplikacja się wiesza / ładuje się wolno"

**Rozwiązania:**

1. **Zmniejsz zasięg wyszukiwania**
   - Zamiast 25km spróbuj 5km

2. **Oczyść cache**
   ```bash
   npm start  # Restartuj dev server
   # Lub: Ctrl+Shift+R w przeglądarce (hard refresh)
   ```

3. **Sprawdź Internet**
   - Szybkość internetu
   - Używaj 4G/WiFi (nie 3G)

4. **Zamknij karty**
   - Zbyt dużo otwartych karty = wolniejsza przeglądarka

---

## Problemy z maila

### "Przycisk 'Wyślij maila' nie działa"

**Rozwiązanie:**

1. Upewnij się że masz klienta email skonfigurowanego (Gmail, Outlook, itp.)
2. Kliknąć przycisk otworzy domyślny klient
3. Jeśli nic się nie dzieje:
   - Sprawdź czy JavaScript jest włączony
   - Spróbuj innej przeglądarki
   - Spróbuj ręcznie kliknąć na numer telefonu (powinna się otworzyć aplikacja do rozmów)

---

## Problemy z deploymentem

### "Build nie przechodzi" (npm run build)

```bash
npm run build
```

**Jeśli pokazuje błędy:**

1. **TypeScript errors**
   ```
   error TS2322: Type 'X' is not assignable to type 'Y'
   ```
   - Sprawdź typ zmiennej
   - Spójrz w plik na podanym numerze linii

2. **Module not found**
   ```
   Cannot find module 'X'
   ```
   - Instaluj: `npm install X`

3. **Port 3000 już zajęty**
   ```bash
   # Użyj innego portu
   PORT=3001 npm start
   ```

---

### "Aplikacja pracuje lokalnie ale nie online"

**Przyczyny i rozwiązania:**

1. **API Key restricted do localhost**
   - Google Cloud Console → Credentials → API Key
   - Application restrictions → Add domain
   - Dodaj swoją domenę (np. `opto-finder.vercel.app`)

2. **HTTPS wymagany**
   - Geolocation API wymaga HTTPS na produkcji
   - Vercel/Netlify automatycznie dają HTTPS ✅
   - Own server → skonfiguruj SSL

3. **Build folder nie wdrożony**
   - Upewnij się że deployujesz `build/` folder, nie `src/`

---

## Inne problemy

### "Aplikacja się crashuje po kliknięciu na marker"

**Powinna to być obsługiwana, ale jeśli się nie obsługuje:**

1. Otwórz DevTools (F12)
2. Console tab
3. Szukaj czerwonych błędów
4. Kopiuj błąd i reportuj issue na GitHub

---

### "Interfejs jest zniekształcony / CSS nie ładuje się"

**Rozwiązanie:**

```bash
# Hard refresh CSS
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Lub wyczyść build
rm -rf build
npm run build
```

---

## Emergency Reset

Jeśli nic nie działa i chcesz od nowa:

```bash
# Usuń node_modules i cache
rm -rf node_modules package-lock.json

# Zainstaluj od nowa
npm install

# Upewnij się że .env.local ma klucz
cat .env.local

# Restartuj
npm start
```

---

## Nie znalazłeś odpowiedzi?

1. Szukaj błędu w DevTools Console (F12)
2. Otwórz issue na GitHub: https://github.com/YOUR_USERNAME/opto_finder/issues
3. Podaj:
   - Co robiłeś gdy pojawił się problem
   - Jaki błąd widzisz
   - Co mówi Console (F12)
   - Twój system (Windows/Mac/Linux)

---

**Good luck!** 🚀

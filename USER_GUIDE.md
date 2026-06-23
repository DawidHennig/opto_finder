# 📖 Instrukcja dla użytkownika

Jak używać aplikacji OptoFinder do wyszukiwania miejsc pracy dla optometrystów.

## Start

1. Otwórz aplikację w przeglądarce: http://localhost:3000
2. Aplikacja zapyta o dostęp do lokalizacji → **Zezwól**
3. Czekaj na załadowanie mapy i wyników

## Interfejs

```
┌─────────────────────────────────────────┐
│ OptoFinder  🔍                          │
│ Znajdź miejsca pracy dla optometrystów  │
├─────────────────────────────────────────┤
│ [Zasięg: 5km] 📍 52.2296, 21.0122      │
├─────────────────────────────────────────┤
│                                         │
│  ┌────────────────────┐   ┌──────────┐ │
│  │                    │   │ Wyniki   │ │
│  │      MAPA          │   │ 1. ...   │ │
│  │  (Red = selected)  │   │ 2. ...   │ │
│  │  (Żółta = wynik)   │   │          │ │
│  │  (Niebieska = ty)  │   └──────────┘ │
│  │                    │                 │
│  └────────────────────┘   Szczegóły    │
│                           (po kliknięciu)
└─────────────────────────────────────────┘
```

## Krok po kroku

### 1. Zmień zasięg wyszukiwania

Na górze strony widzisz dropdown `Zasięg wyszukiwania`:
- **1 km** - najbliższe oferty (raczej mało)
- **2.5 km** - kompromis
- **5 km** - domyślnie, polecane
- **10 km** - szersze pole
- **25 km** - całe miasto

Wybór automatycznie aktualizuje wyniki.

### 2. Przeglądaj mapę

Mapa pokazuje:
- 🔵 **Niebieska igła** = Twoja lokalizacja
- 🟡 **Żółte igły** = Oferty pracy
- 🔴 **Czerwona igła** = Zaznaczone miejsce

Możesz:
- ➕ Przybliżać (scroll / pinch)
- ➖ Oddalać
- 🖐️ Przeciągać mapę
- Kliknąć igłę → pokaż szczegóły po prawej

### 3. Przeszukuj listę wyników

Po lewej stronie widzisz listę wszystkich wyników:
```
Wyniki (24)
┌─────────────────────┐
│ 🏥 Optyka ABC       │ ← Kliknij
│ ul. Marszałkowska   │
│ ⭐ 4.8 | 📞 XXX-XXX │
├─────────────────────┤
│ 🏥 Centrum Wzroku   │
│ Al. Jerozolimskie   │
└─────────────────────┘
```

- Klikając na pozycję, mapa centruje się na niej
- Zaznaczone miejsce ma tło niebieskie (blue highlight)

### 4. Przeglądaj szczegóły

Klikając na wynik zobaczysz:
```
┌──────────────────────────────┐
│ Optyka ABC                   │
│ 📍 ul. Marszałkowska 25, ...│
│ 📞 +48-22-123-4567           │
│ ⭐ 4.8                       │
│ 🌐 Otwórz (link)            │
│                              │
│ Godziny otwarcia:            │
│ · Pon: 9:00 – 18:00         │
│ · Wto: 9:00 – 18:00         │
│ · Śro: 9:00 – 18:00         │
│ ...                          │
│ [📧 Wyślij maila]           │
└──────────────────────────────┘
```

### 5. Wyślij maila

Klikając przycisk **📧 Wyślij maila**:
1. Otworzy się Twój domyślny klient poczty
2. Już wypełniona jest:
   - **Do:** info@[nazwa_miejsca]
   - **Temat:** Zapytanie o pracę - optometrysta
3. Dokończ i wyślij swoją wiadomość

## Tips & Tricks

### 🔍 Jak znaleźć najlepsze wyniki?

1. Zacznij od **5 km** - to dobra średnia
2. Spróbuj wcisnąć **⭐ czymkolwiek wysoko oceniane** - to dobrze się prowadzi
3. Jeśli mało wyników, powiększ zasięg na **10 km**
4. Jeśli zbyt dużo, zmniejsz na **2.5 km**

### 📞 Czy mogę zadzwonić?

Tak! Klikając na numer telefonu, otwiera się aplikacja do rozmów.

### 🌐 Czy mogę odwiedzić stronę?

Tak! Klikając na "Otwórz" (jeśli dostępny), otwiera się strona miejsca.

### 📍 Ale moja lokalizacja jest błędna!

1. Sprawdź czy pozwoliłeś aplikacji na dostęp do lokalizacji
   - Chrome: Settings → Privacy → Site settings → Location
2. Spróbuj odświeżyć stronę (F5)
3. Jeśli problem się powtarza, mogą być problemy z GPS

### 🗺️ Mapa nie ładuje się

1. Sprawdź połączenie internetowe
2. Otwórz konsolę przeglądarki (F12) i szukaj błędów
3. Może problem z API Key - skontaktuj się z administratorem

## FAQ

**P: Czy aplikacja pracuje offline?**
O: Nie, potrzebna jest sieć do pobierania danych z Google Maps.

**P: Czy moja lokalizacja jest wysyłana gdziekolwiek?**
O: Nie! Wszystko dzieje się w Twojej przeglądarce. Google otrzymuje tylko zapytania do API.

**P: Czy mogę dodać własne miejsca?**
O: Teraz nie, ale możliwość jest zaplanowana.

**P: Dlaczego niektóre godziny otwarcia są niedostępne?**
O: Google Maps może nie mieć tych informacji dla danego miejsca.

**P: Mogę filtować po ocenie?**
O: Teraz nie, ale możesz ręcznie przeglądać wyniki - sortowane są alfabetycznie.

---

**Potrzebujesz pomocy?** → Otwórz issue na GitHub

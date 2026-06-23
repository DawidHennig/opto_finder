# 🚀 Deployment

Kilka opcji do wdrożenia aplikacji OptoFinder online.

## 1. Vercel (Easiest - Recommended)

Vercel to platforma spe specialista do React, automatyzuje deploy.

```bash
# Zainstaluj Vercel CLI
npm install -g vercel

# Deployuj
vercel
```

Podczas pierwszego deployu Vercel zapyta:
- Projekt czy nowy? → `y` (new project)
- Nazwa? → `opto_finder`
- Framework? → Autodetect (React)
- Build command? → `npm run build`
- Deployment? → Select suggested settings

Gotowe! Twoja aplikacja będzie dostępna na `opto-finder.vercel.app` (lub custom domain)

**Konfiguracja zmiennych:**
1. Wejdź na https://vercel.com/dashboard
2. Otwórz projekt `opto_finder`
3. Settings → Environment Variables
4. Dodaj: `REACT_APP_GOOGLE_MAPS_API_KEY` = `YOUR_API_KEY`
5. Deploy automatycznie się restartuje

---

## 2. Netlify

Bezpłatny hosting + CI/CD.

```bash
# Zainstaluj Netlify CLI
npm install -g netlify-cli

# Deployuj
netlify deploy --prod --dir=build
```

Lub bez CLI:
1. Wejdź na https://app.netlify.com
2. "New site from Git" → Połącz GitHub
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy!

**Zmienne środowiskowe:**
1. Site settings → Build & deploy → Environment
2. Dodaj: `REACT_APP_GOOGLE_MAPS_API_KEY`

---

## 3. GitHub Pages (Free, ale bez custom domain easily)

```bash
# Zainstaluj gh-pages
npm install --save-dev gh-pages

# Dodaj do package.json:
# "homepage": "https://YOUR_USERNAME.github.io/opto_finder",

# Deploy
npm run build
npm run deploy
```

Sklonuj tego nie robimy, bo wymagało by zmian w package.json.

---

## 4. Docker + Own Server

Dla bardziej zaawansowanych deploymentów.

### Dockerfile

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
ENV PORT=3000
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

### Build i run

```bash
docker build -t opto-finder .
docker run -p 3000:3000 \
  -e REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY \
  opto-finder
```

---

## 5. Traditional Hosting (Shared Hosting, cPanel, itp.)

1. `npm run build`
2. Wrzuć folder `build/` na serwer (FTP)
3. Upewnij się że `.htaccess` redirect wszystkie requesty do `index.html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Checklist przed deployem

- ✅ `.env.local` zawiera poprawny API Key
- ✅ `npm run build` kompiluje się bez błędów
- ✅ Google Cloud API Keys są skonfigurowane
- ✅ HTTP referrers zawierają nową domenę (jeśli RestrictKey)
- ✅ HTTPS jest włączony (wymagane dla Geolocation API)
- ✅ Testujesz aplikację lokalnie przed deployem

---

## Monitoring i logi

- **Vercel**: Wejdź na dashboard → Deployments → Logs
- **Netlify**: Site overview → Deploys → Logs
- **Docker**: `docker logs <container_id>`

---

## Budget

| Platforma | Koszt | Tier |
|-----------|-------|------|
| Vercel | Free | Do 100GB/month |
| Netlify | Free | Do 300min build/month |
| GitHub Pages | Free | Static only |
| Shared Hosting | $3-10/mo | Traditional |
| Docker (AWS/DigitalOcean) | $5-20/mo | VPS |

---

**Potrzebujesz pomocy?** → Otwórz issue na GitHub

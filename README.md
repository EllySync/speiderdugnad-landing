# 🌲 Hervik Dugnad Landing Page

Enkel, profesjonell landing page for speiderdugnad bestillingssystem.

## 📋 Oversikt

- **Formål**: Informere og lede brukere til bestillingssystem på https://speiderdugnad.no
- **Tech Stack**: HTML, CSS, JavaScript, nginx, Docker
- **Språk**: Norsk
- **Design**: Mobile-first, responsive

## 🚀 Komme i gang

### Forutsetninger

- Docker installert
- Docker Compose installert (valgfritt, for lokal testing)

### Lokal testing med Docker Compose

```bash
# Bygg og start containeren
docker-compose up -d

# Åpne i nettleser
http://localhost:8080
```

For å stoppe:
```bash
docker-compose down
```

### Bygg Docker image for produksjon

```bash
# Bygg image
docker build -t speiderdugnad-landing:latest .

# Kjør container
docker run -d -p 80:80 --name speiderdugnad-landing speiderdugnad-landing:latest
```

## 📂 Prosjektstruktur

```
speiderdugnad-landing/
├── Dockerfile                 # Production Docker image
├── docker-compose.yml         # Local development setup
├── nginx.conf                 # nginx configuration
├── public/
│   ├── index.html            # Main HTML file
│   ├── css/
│   │   └── styles.css        # All styles
│   ├── js/
│   │   └── main.js          # All JavaScript
│   └── images/               # Product images and logo
└── README.md
```

## ✨ Funksjoner

### Implementert
- ✅ Sticky header med smooth scroll navigation
- ✅ Hero section med CTA
- ✅ "Hvordan fungerer det" (4 steg)
- ✅ Produktoversikt (5 produkter)
- ✅ Om Hervik Dugnad
- ✅ FAQ accordion
- ✅ Kontaktskjema (mailto)
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Mobile hamburger menu
- ✅ Performance optimizations (gzip, caching)

### Interaktivitet (Vanilla JavaScript)
- Smooth scroll navigation
- Mobile menu toggle
- Sticky header on scroll
- FAQ accordion
- Contact form (mailto handler)
- Fade-in animations on scroll

## 🎨 Design System

### Farger
- **Primary Green**: `#2c5f2d` (speider-grønn)
- **Light Green**: `#e8f5e9` (bakgrunn)
- **Accent Red**: `#d32f2f` (Hervik-rød)
- **Text Dark**: `#333333`
- **Text Light**: `#666666`

### Breakpoints
- Mobile: `0-767px`
- Tablet: `768px-1023px`
- Desktop: `1024px+`
- Wide: `1280px+`

## 🔧 Konfigurasjon

### nginx
- Gzip compression for tekst og bilder
- 30-dagers caching for statiske filer
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)

### E-post
- Kontaktskjema bruker: `post@speiderdugnad.no`
- Mailto-link åpner brukerens e-postklient

## 🚀 Deployment

### Deploy til produksjonsserver

1. **Bygg image på server:**
```bash
docker build -t speiderdugnad-landing:latest .
```

2. **Kjør container:**
```bash
docker run -d \
  --name speiderdugnad-landing \
  --restart unless-stopped \
  -p 80:80 \
  speiderdugnad-landing:latest
```

3. **Med SSL/HTTPS (anbefalt):**
Bruk nginx reverse proxy med Let's Encrypt eller Traefik for SSL termination.

### Environment-variabler
Ingen environment-variabler kreves (ren statisk side).

## ⚡ Performance

### Mål
- Page load: <2s
- Lighthouse score: >90
- First Contentful Paint: <1.5s

### Optimalisering
- [x] Gzip compression
- [x] Asset caching (30 dager)
- [x] Minified CSS/JS (kan forbedres)
- [ ] **TODO: Optimaliser produktbilder** (nåværende: 400-600KB, mål: <100KB)

### Bildoptimalisering (TODO)
Produktbildene er for store. Komprimer med:

```bash
# Eksempel med ImageMagick
for img in public/images/dugnadspakke-*.png; do
  convert "$img" -resize 800x800 -quality 85 -strip "$img"
done

# Eller bruk online verktøy som:
# - TinyPNG.com
# - Squoosh.app
# - ImageOptim (Mac)
```

## 🧪 Testing

### Manuell testing
- [ ] Chrome (desktop + mobile)
- [ ] Firefox
- [ ] Safari (desktop + mobile)
- [ ] Edge

### Sjekkliste
- [ ] Alle lenker fungerer
- [ ] Smooth scroll fungerer
- [ ] Mobile menu fungerer
- [ ] FAQ accordion fungerer
- [ ] Kontaktskjema åpner e-postklient
- [ ] Responsivt design på alle enheter
- [ ] Bilder laster korrekt
- [ ] Ingen console errors

### Verktøy
- **HTML Validation**: [W3C Validator](https://validator.w3.org/)
- **Performance**: [Google PageSpeed Insights](https://pagespeed.web.dev/)
- **Mobile Testing**: Chrome DevTools device emulation

## 📊 Analytics (Fremtidig)

Ingen analytics implementert per nå. For å legge til:

### Google Analytics
Legg til i `<head>` i `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible (Privacy-vennlig)
```html
<script defer data-domain="speiderdugnad.no" src="https://plausible.io/js/script.js"></script>
```

## 🔐 Sikkerhet

### Implementert
- Security headers via nginx
- Ingen sensitive data lagres
- Ingen backend/database
- Ingen cookies

### HTTPS
Bruk Let's Encrypt for gratis SSL:
```bash
certbot --nginx -d speiderdugnad.no -d www.speiderdugnad.no
```

## 📝 Vedlikehold

### Oppdatere innhold
1. Rediger `public/index.html` for tekst
2. Rediger `public/css/styles.css` for styling
3. Bygg ny Docker image
4. Deploy

### Legge til nye produkter
1. Legg til produktbilde i `public/images/`
2. Legg til produktkort i HTML (section `#products`)
3. Bygg og deploy

## 🐛 Kjente problemer / TODO

- [ ] **Optimaliser produktbilder** (nåværende størrelse: 400-600KB)
- [ ] Legg til favicon.ico
- [ ] Vurder lazy loading for produktbilder
- [ ] Minifiser CSS/JS for produksjon
- [ ] Legg til 404-side

## 📞 Kontakt

- **E-post**: post@speiderdugnad.no
- **Domene**: https://speiderdugnad.no

## 📄 Lisens

Proprietær - Hervik Dugnad Bestillingssystem © 2025
# speiderdugnad-landing

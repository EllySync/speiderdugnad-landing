# 📋 SPEC: Landing Page for Hervik Dugnad Bestillingssystem

## 🎯 Prosjektsammendrag
**Hva:** Enkel, profesjonell landing page for https://speiderdugnad.no  
**Formål:** Forklare tjenesten, vise produkter, og lede brukere til bestillingssystem  
**Målgruppe:** Norske familier (25-65 år) som vil støtte speidere  
**Språk:** Kun norsk (ingen toggle)  
**Tone:** Varm, tillitsskapende, lokalt forankret, moderne

---

## 📐 Struktur & Innhold

### **1. HEADER** (Sticky)
```
┌─────────────────────────────────────┐
│ [🌲 Logo] Hervik Dugnad             │
│                      [Kontakt oss]  │
└─────────────────────────────────────┘
```

**Elementer:**
- Logo (venstre): Bruk `/images/mistletoe.svg` eller ren tekst "Hervik Dugnad"
- Navigasjon (høyre): 
  - "Hvordan fungerer det" (smooth scroll til #how-it-works)
  - "Produkter" (smooth scroll til #products)
  - "Kontakt oss" (smooth scroll til #contact)
- Sticky: Ja (følger bruker ved scroll)
- Mobilmeny: Hamburger-ikon (<768px)

---

### **2. HERO-SEKSJON**
```
┌─────────────────────────────────────┐
│         [HERO-BILDE]                │
│  Stor overskrift                    │
│  Kort underoverskrift               │
│  [CTA-knapp] [Sekundær lenke]      │
└─────────────────────────────────────┘
```

**Innhold:**
- **H1:** "Støtt speiderne – bestill Norges beste syltetøy og saft!"
- **Undertekst:** "Enkelt, trygt og direkte til din dør. Alle overskudd går til lokale speidere."
- **CTA-knapp (primær):**  
  ```html
  <a href="https://speiderdugnad.no" class="btn-primary">
    Start bestilling →
  </a>
  ```
- **Sekundær lenke:**  
  ```html
  <a href="#how-it-works" class="btn-secondary">
    Hvordan fungerer det?
  </a>
  ```

**Visuelt:**
- Bakgrunnsbilde: Naturmotiv (skog/bær) ELLER produktbilde
- Alternativ: Gradient overlay (#2c5f2d → #e8f5e9)
- Høyde: 80vh (desktop), 60vh (mobil)

---

### **3. "HVORDAN FUNGERER DET"** (#how-it-works)
```
┌─────────────────────────────────────┐
│    Slik fungerer det                │
│                                     │
│  [1]        [2]        [3]     [4] │
│  Velg     Velg      Fyll inn  Lever│
│ produkter speider    adresse   varer│
└─────────────────────────────────────┘
```

**4 steg (horisontal layout desktop, vertikal mobil):**

1. **Velg produkter**  
   📦 Ikon: Handlekurv  
   Tekst: "Bla gjennom Hervik-pakker og legg i handlekurv"

2. **Velg speider**  
   🎖️ Ikon: Stjerne/Speider-logo  
   Tekst: "Finn din favoritt-speider eller legg til ny"

3. **Fyll inn adresse**  
   📍 Ikon: Pin-location  
   Tekst: "Oppgi leveringsadresse og kontaktinfo"

4. **Speideren leverer**  
   ✅ Ikon: Checkmark/Pakke  
   Tekst: "Speideren kontakter deg og leverer varene – betal ved levering"

**Design:**
- Hvert steg: Hvit kort med skygge
- Nummerering: Sirkel med #2c5f2d bakgrunn
- Pil mellom steg (desktop): `→` eller CSS-line

---

### **4. PRODUKTOVERSIKT** (#products)
```
┌─────────────────────────────────────┐
│         Våre produkter              │
│                                     │
│  [Bilde] [Bilde] [Bilde] [Bilde]   │
│  Pakke 1 Pakke 2 Pakke 3 Pakke 4   │
│  199 kr  249 kr  299 kr  349 kr    │
└─────────────────────────────────────┘
```

**Innhold:**
- **H2:** "Våre produkter"
- **Undertekst:** "Alle produkter er fra Hervik – norsk kvalitet siden 1920"

**5 produktkort (grid layout):**
- Bilde av produktet (placeholder eller faktiske bilder)
- Navn: "Pakke 1: Syltetøypakken"
- Kort beskrivelse: "5 glass Hervik syltetøy"
- Pris: "199 kr"
- Design: Card med hover-effekt (litt løft)

**Bilder:**
- Hvis du har: Bruk faktiske produktbilder
- Hvis ikke: Placeholder (`https://via.placeholder.com/300x300/2c5f2d/ffffff?text=Pakke+1`)

**Under produktene:**
```html
<a href="https://speiderdugnad.no" class="btn-primary">
  Se alle produkter og bestill →
</a>
```

---

### **5. OM HERVIK DUGNAD** (#about)
```
┌─────────────────────────────────────┐
│       Om Hervik Dugnad              │
│                                     │
│  [Tekst i 2-3 korte avsnitt]       │
│  [Eventuelt bilde av speidere]     │
└─────────────────────────────────────┘
```

**Innhold (forslag):**

**Avsnitt 1:**  
"Siden 1920 har Hervik levert syltetøy, saft og gelé av høyeste kvalitet til norske hjem. Produktene lages med omsorg og naturlige ingredienser."

**Avsnitt 2:**  
"Hervik Dugnad-ordningen lar speidere samle inn penger til aktiviteter ved å selge Hervik-produkter. Tidligere måtte speiderne gå dør-til-dør – nå kan du enkelt bestille online!"

**Avsnitt 3:**  
"Alle overskudd går direkte til speideren du velger. Takk for at du støtter norske speidere! 🎖️"

**Layout:**
- 2-kolonne (desktop): Tekst venstre, bilde høyre
- 1-kolonne (mobil): Tekst øverst, bilde under

---

### **6. FAQ (Valgfritt, men anbefalt)**
```
┌─────────────────────────────────────┐
│    Ofte stilte spørsmål             │
│                                     │
│  ▼ Hvordan betaler jeg?             │
│  ▼ Kan jeg velge leveringstid?      │
│  ▼ Hva hvis speideren ikke finnes?  │
└─────────────────────────────────────┘
```

**3-5 spørsmål (accordion/expandable):**

1. **Hvordan betaler jeg?**  
   "Du betaler direkte til speideren ved levering – enten kontant eller Vipps."

2. **Kan jeg velge leveringstid?**  
   "Speideren kontakter deg etter bestilling for å avtale levering."

3. **Hva hvis speideren ikke finnes i listen?**  
   "Du kan legge til en ny speider ved å oppgi e-postadressen til speiderens forelder/foresatt."

4. **Er det trygt å bestille?**  
   "Ja! All informasjon behandles konfidensielt, og ingen betalingsinfo lagres."

5. **Kan jeg kansellere bestillingen?**  
   "Kontakt speideren direkte via e-posten du fikk i bekreftelsen."

---

### **7. KONTAKT** (#contact)
```
┌─────────────────────────────────────┐
│         Har du spørsmål?            │
│                                     │
│  [Navn]                             │
│  [E-post]                           │
│  [Melding]                          │
│  [Send melding]                     │
└─────────────────────────────────────┘
```

**Kontaktskjema (enkelt):**
```html
<form id="contact-form">
  <input type="text" name="name" placeholder="Navn" required>
  <input type="email" name="email" placeholder="E-post" required>
  <textarea name="message" placeholder="Melding" rows="5" required></textarea>
  <button type="submit">Send melding</button>
</form>
```

**Funksjonalitet:**
- **Alternativ 1 (enklest):** `mailto:kontakt@speiderdugnad.no`
- **Alternativ 2 (bedre):** JavaScript sender via backend/API
- **Alternativ 3 (fremtid):** Formspree.io (gratis form-handling)

**Under skjema:**
```
📧 E-post: kontakt@speiderdugnad.no
📍 Adresse: [Hvis relevant]
```

---

### **8. FOOTER**
```
┌─────────────────────────────────────┐
│  Hervik Dugnad Bestillingssystem    │
│  © 2025 - Laget med ❤️ for speiderne│
│                                     │
│  [Personvern] [Vilkår] [Kontakt]   │
└─────────────────────────────────────┘
```

**Innhold:**
- Copyright: "© 2025 Hervik Dugnad"
- Lenker (hvis relevant):
  - Personvernerklæring (hvis GDPR-krav)
  - Vilkår for bruk
  - Kontakt
- Sosiale medier (valgfritt): Facebook, Instagram

---

## 🎨 Design-system

### **Farger**
```css
:root {
  /* Primary Colors */
  --primary-green: #2c5f2d;    /* Scout green - knapper, overskrifter */
  --light-green: #e8f5e9;      /* Bakgrunn seksjoner */
  --accent-red: #d32f2f;       /* Hervik jam red - aksentar */
  
  /* Neutrals */
  --text-dark: #333333;        /* Brødtekst */
  --text-light: #666666;       /* Sekundær tekst */
  --background: #ffffff;       /* Hovedbakgrunn */
  --border: #e0e0e0;          /* Borders */
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.15);
  --shadow-lg: 0 8px 16px rgba(0,0,0,0.2);
}
```

### **Typografi**
```css
:root {
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  
  /* Font Weights */
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}

/* Headings */
h1 { font-size: var(--text-5xl); font-weight: var(--weight-bold); }
h2 { font-size: var(--text-3xl); font-weight: var(--weight-bold); }
h3 { font-size: var(--text-2xl); font-weight: var(--weight-semibold); }
p  { font-size: var(--text-base); line-height: 1.6; }
```

### **Knapper**
```css
.btn-primary {
  background: var(--primary-green);
  color: white;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: var(--weight-semibold);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-green);
  border: 2px solid var(--primary-green);
  padding: 12px 30px;
  border-radius: 8px;
}
```

### **Spacing**
```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
}

section {
  padding: var(--space-16) var(--space-4);
}
```

---

## 📱 Responsivt Design

### **Breakpoints**
```css
/* Mobile first approach */
:root {
  --mobile: 0px;
  --tablet: 768px;
  --desktop: 1024px;
  --wide: 1280px;
}

/* Usage */
@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}
```

### **Layout Endringer**

**Mobil (<768px):**
- Header: Hamburger-meny
- Hero: H1 reduseres til text-3xl
- Steg: Vertikal stack
- Produkter: 1 kolonne
- Footer: Stack links

**Tablet (768px-1023px):**
- Header: Full navigasjon
- Steg: 2x2 grid
- Produkter: 2 kolonner

**Desktop (1024px+):**
- Max-width: 1200px (sentrert)
- Steg: 4 kolonner horisontal
- Produkter: 4-5 kolonner grid

---

## ⚡ JavaScript-funksjonalitet

### **1. Smooth Scroll**
```javascript
// Smooth scroll til seksjoner
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

### **2. Sticky Header**
```javascript
// Legg til klasse når bruker scroller
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
```

### **3. Mobile Menu Toggle**
```javascript
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});
```

### **4. FAQ Accordion**
```javascript
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    answer.classList.toggle('open');
  });
});
```

### **5. Kontaktskjema**
```javascript
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  
  // Send til backend eller bruk mailto
  window.location.href = `mailto:kontakt@speiderdugnad.no?subject=Kontakt fra landing page&body=${formData.get('message')}`;
  
  // Alternativ: Fetch til API
  // const response = await fetch('/api/contact', { method: 'POST', body: formData });
});
```

---

## 🔧 Integrasjoner

### **1. Google Analytics (Anbefalt)**
```html
<!-- I <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Event tracking:**
```javascript
// Track CTA clicks
document.querySelector('.btn-primary').addEventListener('click', () => {
  gtag('event', 'click', {
    'event_category': 'CTA',
    'event_label': 'Start bestilling'
  });
});
```

### **2. Plausible (Privacy-vennlig alternativ)**
```html
<script defer data-domain="speiderdugnad.no" src="https://plausible.io/js/script.js"></script>
```

### **3. Meta Tags (SEO)**
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Støtt speiderne – bestill Hervik syltetøy, saft og gelé online. Enkelt, trygt og direkte til din dør.">
  <meta name="keywords" content="hervik, speider, dugnad, syltetøy, saft, bestilling">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Hervik Dugnad - Støtt speiderne">
  <meta property="og:description" content="Bestill Norges beste syltetøy og støtt lokale speidere">
  <meta property="og:image" content="https://speiderdugnad.no/images/og-image.jpg">
  <meta property="og:url" content="https://speiderdugnad.no">
  
  <title>Hervik Dugnad - Støtt speiderne</title>
</head>
```

---

## 📂 Filstruktur

```
/var/www/landing/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   ├── mistletoe.svg (logo)
│   ├── hero-bg.jpg
│   ├── product-1.jpg
│   ├── product-2.jpg
│   └── ...
└── favicon.ico
```

---

## 🚀 Nginx Konfigurasjon

```nginx
server {
    listen 80;
    server_name speiderdugnad.no www.speiderdugnad.no;

    root /var/www/landing;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

---

## ✅ Sjekkliste før lansering

### **Innhold**
- [ ] Alle tekster er skrevet og godkjent
- [ ] Produktbilder er tilgjengelige (eller placeholders)
- [ ] Kontakt-e-post er riktig
- [ ] CTA-lenke peker til https://speiderdugnad.no

### **Design**
- [ ] Responsivt design testet (mobil, tablet, desktop)
- [ ] Alle knapper har hover-effekter
- [ ] Fonter laster korrekt
- [ ] Farger matcher brand

### **Teknisk**
- [ ] HTML validert (W3C validator)
- [ ] CSS validert
- [ ] JavaScript fungerer uten feil
- [ ] Smooth scroll fungerer
- [ ] Mobile menu fungerer
- [ ] FAQ accordion fungerer
- [ ] Kontaktskjema fungerer

### **SEO & Ytelse**
- [ ] Meta tags er korrekt
- [ ] Open Graph tags for sosiale medier
- [ ] Favicon er lastet opp
- [ ] Bilder er optimalisert (<100KB per bilde)
- [ ] Google Analytics er konfigurert
- [ ] Page speed score >90 (Google PageSpeed Insights)

### **Testing**
- [ ] Testet i Chrome, Firefox, Safari
- [ ] Testet på iPhone og Android
- [ ] Alle lenker fungerer
- [ ] Ingen 404-errors
- [ ] Kontaktskjema sender korrekt

---

## 📊 Success Metrics

**Mål å tracke (etter lansering):**
1. **Conversion rate:** % som klikker "Start bestilling"
2. **Bounce rate:** % som forlater uten interaksjon (<40% er bra)
3. **Avg. time on page:** >60 sekunder er bra
4. **Scroll depth:** % som scroller til produkter
5. **Mobile vs desktop:** Hvilken enhet brukes mest?

---

## 🎯 Neste steg

1. **Lag HTML/CSS/JS filer** basert på denne spec
2. **Test** på lokal maskin
3. **Juster** design/innhold
4. **Deploy** til nginx-server
5. **Test** live versjon
6. **Launch!** 🚀

---

## 📝 Notater

- Landing page skal være enkel og fokusert på å lede brukere til hovedsystemet
- Ingen kompleks funksjonalitet - kun informasjon og CTA
- Mobile-first approach er kritisk (mange bruker mobil)
- Tonen skal være varm og lokal, ikke corporate
- Fokus på speiderne og støtte til lokalmiljøet
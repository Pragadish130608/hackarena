# VALIKATTI

> **One Place. Every Scheme. Explained Your Way.**

VALIKATTI (வழிகாட்டி — "guide" in Tamil) is a safe, multilingual government-scheme discovery and guidance platform designed for first-time women internet users and people with low digital literacy.

---

## 🎯 Core Concept

The user does **not** need to know the name of a government scheme.

```
User's real-life need
  → Voice or text
  → Understand the need
  → Find relevant government schemes
  → Explain in the user's preferred language
  → Eligibility / Benefits / Documents
  → Guide the application process
  → Send user to verified official portal
```

VALIKATTI is a **Need-to-Service Navigator**, not just a chatbot.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Install dependencies
```bash
cd valikatti
npm install
```

### Start development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

---

## 🗂️ Project Structure

```
valikatti/
├── public/
│   └── favicon.svg               # Brand SVG favicon
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx         # Sticky nav with mobile drawer
│   │   │   ├── Footer.jsx         # Brand footer with disclaimer
│   │   │   └── PageLayout.jsx     # Flex-column shell for all pages
│   │   └── ui/
│   │       ├── Badge.jsx          # Small label chips
│   │       ├── Button.jsx         # Polymorphic button (all variants)
│   │       ├── Card.jsx           # Composable card with Header/Body/Footer
│   │       ├── LanguagePicker.jsx # Language dropdown (8 languages)
│   │       ├── Logo.jsx           # SVG wordmark logo
│   │       └── Modal.jsx          # Accessible bottom-sheet / dialog
│   ├── context/
│   │   └── AppContext.jsx         # Global state (language, mobile menu)
│   ├── data/
│   │   └── schemes.js             # Mock scheme data (DB-ready schema)
│   ├── pages/
│   │   ├── HomePage.jsx           # Hero + life-needs grid + how-it-works
│   │   ├── DiscoverPage.jsx       # Need-to-service navigator results
│   │   ├── SchemesPage.jsx        # Browse all schemes by category
│   │   ├── SchemeDetailPage.jsx   # Full scheme detail + apply modal
│   │   ├── AboutPage.jsx          # Mission & principles
│   │   └── NotFoundPage.jsx       # 404
│   ├── App.jsx                    # Router + route map
│   ├── index.css                  # Global styles + design tokens
│   └── main.jsx                   # React DOM entry point
├── index.html                     # Root HTML with fonts + SEO meta
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🛣️ Route Map

| Route             | Page              | Description                          |
|-------------------|-------------------|--------------------------------------|
| `/`               | HomePage          | Hero, life-needs grid, how-it-works  |
| `/discover`       | DiscoverPage      | Need-based or text search results    |
| `/schemes`        | SchemesPage       | Browse all by category               |
| `/schemes/:id`    | SchemeDetailPage  | Full detail with apply modal         |
| `/about`          | AboutPage         | Mission and principles               |
| `/privacy`        | Placeholder       | Phase 2                              |
| `/disclaimer`     | Placeholder       | Phase 2                              |
| `*`               | NotFoundPage      | 404 fallback                         |

---

## 🎨 Design System

| Token          | Value                                        |
|----------------|----------------------------------------------|
| Primary colour | Indigo `#4f46e5`                             |
| Accent colour  | Amber `#f59e0b`                              |
| Background     | Neutral `#fafafa`                            |
| Display font   | Plus Jakarta Sans (700, 800)                 |
| Body font      | Inter (400, 500, 600)                        |
| Min touch area | 48px × 48px                                  |
| Border radius  | Cards 20px, Buttons 12px, Modals 24px        |

---

## 🏗️ Phase 2 Roadmap

- [ ] Connect Node.js / Express API backend
- [ ] PostgreSQL scheme database
- [ ] NLP-based need matching (replace mock filter)
- [ ] Voice input (Web Speech API)
- [ ] Full i18n translations (8 languages)
- [ ] User profiles and saved schemes
- [ ] SMS / WhatsApp share of scheme summaries

---

## 📊 Mock Data

Schemes in `src/data/schemes.js` are shaped to match a future PostgreSQL schema:

```sql
CREATE TABLE schemes (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  tagline          TEXT,
  category         TEXT,
  tags             TEXT[],
  eligibility      TEXT[],
  benefits         TEXT[],
  documents        TEXT[],
  application_steps TEXT[],
  portal_url       TEXT,
  is_active        BOOLEAN DEFAULT TRUE
);
```

---

## 🤝 Principles

- **Safe & Private** — no personal data collected
- **Official Sources Only** — all data from government portals
- **Designed for Everyone** — 48px touch targets, large text, simple language
- **In Your Language** — 8 Indian languages supported (UI ready, translations Phase 2)

---

*VALIKATTI — Built for Bharat.*

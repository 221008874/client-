# PROJECT_MAP — clinic-admin (Client Site)

## TECH_STACK

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | — |
| Bundler | Vite + Rolldown | 8.0.9 |
| Framework | React | 19.2.5 |
| Icons | lucide-react | 1.14.0 |
| Deploy | Vercel (SPA) | — |
| Linter | ESLint 9 + react-hooks plugin | — |

## SYSTEM_FLOW

```
User visits site
       │
       ▼
   ┌───────────┐
   │  Navbar   │  Fixed top nav with scroll detection
   └───────────┘
       │
       ▼
   ┌───────────┐     ┌────────────┐     ┌───────────┐     ┌──────────┐     ┌────────────┐     ┌────────────┐
   │   Hero    │────▶│  Features  │────▶│   About   │────▶│   Trust   │────▶│  Pricing   │────▶│  Download  │
   │  (Banner) │     │  (Grid)    │     │ (Arch/UI) │     │ (Stats)   │     │ (Plans)    │     │  (CTA)     │
   └───────────┘     └────────────┘     └───────────┘     └──────────┘     └────────────┘     └────────────┘
                                                                                                   │
                                                                                                   ▼
                                                                                             ┌──────────┐
                                                                                             │  Footer  │
                                                                                             │  + CTA   │
                                                                                             └──────────┘
```

**Scroll Animation**: IntersectionObserver via `useScrollAnimation` hook — triggers `.visible` class on `.animate-on-scroll` elements.

## ARCHITECTURE

```
clinic-admin/
├── src/
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Layout: Navbar → sections → Footer
│   ├── index.css                 # Global styles, CSS variables, animations
│   ├── components/
│   │   ├── Navbar.jsx            # Fixed top nav with scroll blur, hamburger menu
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Hero.jsx              # Hero banner — mockup UI, stats, CTA
│   │   ├── Hero.css
│   │   ├── Features.jsx          # Feature grid (8 cards)
│   │   ├── Features.css
│   │   ├── About.jsx             # Architecture diagram, pillars
│   │   ├── About.css
│   │   ├── Trust.jsx             # Stats band, testimonial card
│   │   ├── Trust.css
│   │   ├── Pricing.jsx           # 3-tier pricing (monthly/annual toggle)
│   │   ├── Pricing.css
│   │   ├── Download.jsx          # Download CTA, requirements, includes list
│   │   ├── Download.css
│   │   ├── Footer.jsx            # CTA section + footer with links
│   │   └── Footer.css
│   ├── animation/
│   │   └── Usescrollanimation.js  # IntersectionObserver scroll reveal hook
│   └── assets/
│       ├── hero.png
│       ├── logo.png
│       ├── react.svg
│       └── vite.svg
├── public/
├── index.html
├── vite.config.js
├── eslint.config.js
├── vercel.json
└── .env.example
```

## ORPHANS & PENDING

| Item | Status |
|---|---|
| `src/assets/hero.png`, `react.svg`, `vite.svg` | Unused — can be deleted |
| `src/App.css` | Contains old boilerplate styles — not imported anymore |
| `PROJECT_CONTEXT.md` | Needs review — may be outdated |

## CHANGE LOG

| Date | Change | Files |
|---|---|---|
| 2026-05-10 | Fixed App.jsx to import actual landing page components instead of non-existent admin dashboard | `App.jsx` |
| 2026-05-10 | Wrote Hero.jsx content (was empty) | `pages/Hero.jsx` |
| 2026-05-10 | Wrote Features.css (was empty) | `pages/Features.css` |
| 2026-05-10 | Renamed Navbar.js → Navbar.jsx (JSX needed .jsx extension) | `components/Navbar.jsx` |
| 2026-05-10 | Integrated useScrollAnimation hook | `App.jsx` |

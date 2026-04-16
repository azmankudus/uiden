<div align="center">

# 🌬️ Kentut SuperApp

**A unified enterprise superapp gateway — 100 apps, one launchpad.**

Built with the modern SolidStart + Vinxi + Tailwind CSS v4 stack, Kentut SuperApp is a **design sandbox** for prototyping and reviewing enterprise application UIs. Every app is self-contained and extractable.

[![SolidStart](https://img.shields.io/badge/SolidStart-1.x-2C4F7C?style=flat-square&logo=solid&logoColor=white)](https://start.solidjs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vinxi](https://img.shields.io/badge/Vinxi-0.5-E76F51?style=flat-square)](https://vinxi.vercel.app)
[![Bun](https://img.shields.io/badge/Runtime-Bun-000?style=flat-square&logo=bun&logoColor=white)](https://bun.sh)
[![Node](https://img.shields.io/badge/Node-%3E%3D22-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)
[![Tests](https://img.shields.io/badge/Playwright-93%20tests-brightgreen?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev)

[🚀 Quick Start](#-quick-start) · [🎭 Demo](#-demo-accounts) · [🏗️ Architecture](#-architecture) · [📁 Structure](#-project-structure) · [⚠️ Gotchas](#-gotchas)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **100 App Catalog** | Golden-angle color generation for maximum visual separation |
| 🔐 **Role-Based Access** | 4 demo roles with different app counts (10/20/30/100) |
| 🌗 **Dark / Light Theme** | System-aware toggle with CSS variable overrides |
| 🎭 **Personalization** | Color themes, bg patterns, font size, compact mode, language |
| 🔍 **Cmd+K Search** | Instant search across all apps and pages |
| 📱 **Collapsible SideNav** | Tree navigation with auto-expand, disabled items, icon-only mode |
| 👥 **User Management** | CRUD users, role/permission mapping, per-user app access toggle |
| 🧩 **3-Layer Architecture** | Shell (reusable kit) → Gateway (catalog) → Apps (per-app designs) |
| ♻️ **Old Route Redirects** | `/login/*` → `/user/login/*`, `/user-settings` → `/user/settings` |

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/azmankudus/uiden.git && cd uiden

# Install (requires bun)
bun install

# Dev server → http://localhost:3000
bun run dev

# Production build
bun run build

# Preview production build
bun run preview
```

> **Prerequisites:** [Node.js](https://nodejs.org) >= 22 · [bun](https://bun.sh) runtime

---

## 🎭 Demo Accounts

| Username | Password | Role | Apps | Best For |
|----------|----------|------|------|----------|
| `admin` | `admin` | Administrator | 100 | Full access testing |
| `director` | `director` | Director | 30 | Mid-range preview |
| `manager` | `manager` | Manager | 20 | Limited access view |
| `staff` | `staff` | Staff | 10 | Minimal access view |

Sessions persist in `sessionStorage` — browser-lifetime only. No real backend.

---

## 🏗️ Architecture

### Three-Layer Design

```
┌─────────────────────────────────────────────────┐
│  src/shell/     Reusable UI Kit                 │
│  Layouts, Components, Context, Icons, Utils     │
│  → Copy to any real project                     │
├─────────────────────────────────────────────────┤
│  src/gateway/   Superapp Catalog                │
│  100-app registry, TopBar, Filtered Apps         │
│  → Superapp-specific concerns                   │
├─────────────────────────────────────────────────┤
│  src/apps/      Per-App Designs                  │
│  Branding, Nav Tree, Pages                       │
│  → Each app is self-contained & extractable      │
└─────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [SolidStart](https://start.solidjs.com) 1.x — file-based routing, SSR |
| Build | [Vinxi](https://vinxi.vercel.app) 0.5 — Vite-powered bundler |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 — `@theme` tokens, no config file |
| Icons | [@iconify/utils](https://iconify.design) + [Lucide](https://lucide.dev) — build-time inline SVG |
| Routing | File-based in `src/routes/` with `[app]` dynamic segments |
| Runtime | [bun](https://bun.sh) with Node.js >= 22 |

### Routes

| Path | Auth | Description |
|------|------|-------------|
| `/` | No | Gateway landing — brand hero + Login CTA |
| `/landing` | Yes | App selection grid with search/filter |
| `/user/login` | No | Login form with auth method buttons |
| `/user/login/forgot-password` | No | Password reset flow |
| `/user/login/register` | No | New account registration |
| `/user/settings` | Yes | 5-tab settings (Account, Profile, Personalization, Notifications, Security) |
| `/user/management` | Yes | User CRUD, roles/permissions, app access mapping |
| `/[app]/public/*` | No | Dynamic public app routes |
| `/[app]/private/*` | Yes | Dynamic private app routes with auth guard |

---

## 📁 Project Structure

```
src/
├── app.tsx                                  # Root: Theme > Personalization > Auth > Router
├── app.css                                  # Tailwind @theme tokens, animations, compact mode
│
├── shell/                                   # 🧩 Reusable UI Kit
│   ├── components/
│   │   ├── SideNav.tsx                      # Collapsible tree nav
│   │   ├── UserActions.tsx                  # App launcher, help, theme, profile
│   │   ├── SearchBar.tsx                    # Cmd+K search dialog
│   │   └── PublicNav.tsx                    # Public top navigation
│   ├── layouts/
│   │   ├── PrivateLayout.tsx                # Header + SideNav + main
│   │   └── PublicLayout.tsx                 # PublicNav + main
│   ├── context/
│   │   ├── auth.tsx                         # AuthProvider, 4 dummy users, sessionStorage
│   │   ├── theme.tsx                        # Dark/light toggle, localStorage
│   │   └── personalization.tsx              # Color, bg, language, font, compact
│   └── lib/
│       ├── app-icon.tsx                     # SSR-safe inline SVG component
│       ├── icons.ts                         # Lucide subset extraction
│       └── utils.ts                         # slugify(), appColor()
│
├── gateway/                                 # 🌐 Superapp Catalog
│   ├── components/
│   │   └── TopBar.tsx                       # Branding + UserActions
│   └── lib/
│       ├── apps.ts                          # 100-app registry, appColor()
│       └── filtered-apps.ts                 # createFilteredApps()
│
├── apps/                                    # 📦 Per-App Designs
│   ├── types.ts                             # AppConfig interface
│   ├── registry.ts                          # Slug → config mapping
│   └── ayam-goreng/                         # Sample app
│       ├── config.ts                        # Branding, nav tree, search data
│       ├── public/                          # Landing, About, Help, Contact
│       └── private/                         # Dashboard, Modules, Analytics, Admin
│
└── routes/                                  # 🛤️ File-Based Routing
    ├── index.tsx                            # / → Gateway landing
    ├── landing.tsx                          # /landing → App grid
    ├── login/                               # /login/* → Redirect stubs → /user/login/*
    ├── user-settings.tsx                    # /user-settings → Redirect → /user/settings
    ├── user/
    │   ├── login/                           # /user/login/* → Login, Forgot Password, Register
    │   ├── settings/                        # /user/settings → 5-tab settings
    │   └── management/                      # /user/management → User CRUD + App access
    └── [app]/                               # /ayam-goreng/* → Dynamic app routes
        ├── public/                          # Public pages
        └── private/                         # Private pages (auth-guarded)

tests/
├── e2e.py                                   # 45 gateway tests (Playwright Python)
└── e2e_sample.py                            # 48 ayam-goreng tests
```

---

## 🧪 Testing

```bash
# Run all gateway tests (45 tests)
python3 tests/e2e.py

# Run sample app tests (48 tests)
python3 tests/e2e_sample.py
```

> **Requires:** [Playwright Python](https://playwright.dev/python/) + headless Chromium with `--no-sandbox`

---

## ⚠️ Gotchas

<details>
<summary><strong>🔧 Technical Notes</strong></summary>

- **SolidJS, not React** — `jsxImportSource: "solid-js"`. Use `createSignal`, `createMemo`, `Show`, `For` — not `useState`.
- **Tailwind v4** — uses `@theme` directive in CSS, `@tailwindcss/vite` plugin. No `tailwind.config.js`.
- **Vinxi, not plain Vite** — `vinxi@0.5.11` handles SSR bundling.
- **Icon bundle ~547KB** — full `@iconify-json/lucide/icons.json` imported then subsetted at build time.
- **Lucide renames in v1.2.x** — `help-circle`→`circle-question-mark`, `layout`→`layout-grid`, `sitemap`→`workflow`, etc.
- **Path alias** — `~/*` maps to `./src/*` (tsconfig + SolidStart convention).
- **Playwright strict mode** — scope selectors to `main >>`, `aside >>` etc. to avoid TopBar/SideNav conflicts.
- **SolidJS hydration** — Playwright needs `wait_for_timeout(2000-3000)` after login.

</details>

<details>
<summary><strong>🚫 Known Limitations</strong></summary>

- **No real auth backend** — 4 dummy users, client-side only. No SSO/LDAP/OAuth.
- **No email sending** — forgot password and register pages are UI-only.
- **No server-side persistence** — all data in `sessionStorage`/`localStorage`.
- **Single app designed** — only Ayam Goreng has full pages. Other 99 apps show placeholder tiles.
- **Design sandbox only** — not production-ready. Built for UI review and prototyping.

</details>

---

## 📄 License

[MIT](./LICENSE) — Free for personal and commercial use.

---

<div align="center">

**Built with ☕ and 💨 by the Kentut team**

</div>

# Architecture Design Document

> **Version:** 2.0 · **Updated:** 2026-04-17 · **Status:** Active

## Overview

Kentut SuperApp is a **design sandbox** for prototyping and reviewing enterprise application UIs. It is not a production application — it is a working prototype that lets designers and developers preview all app UIs in one place, with clean folder boundaries so any app's design can be copied into a real standalone repo.

## Three-Layer Architecture

```
┌──────────────────────────────────────────────────────┐
│                   src/shell/                         │
│            Reusable UI Kit (Copy Anywhere)            │
│                                                       │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │  Layouts    │ │  Components  │ │   Context    │  │
│  │  Private    │ │  SideNav     │ │  Auth        │  │
│  │  Public     │ │  SearchBar   │ │  Theme       │  │
│  │             │ │  UserActions │ │  Personalize │  │
│  │             │ │  PublicNav   │ │              │  │
│  └─────────────┘ └──────────────┘ └──────────────┘  │
│  ┌─────────────┐                                     │
│  │    Lib      │  Icons (Iconify/Lucide)             │
│  │  app-icon   │  Utils (slugify, appColor)          │
│  └─────────────┘                                     │
├──────────────────────────────────────────────────────┤
│                  src/gateway/                        │
│            Superapp Catalog                          │
│                                                      │
│  ┌──────────────┐  ┌────────────────────┐           │
│  │   TopBar     │  │  100-App Registry  │           │
│  │  Branding    │  │  apps.ts           │           │
│  │  UserActions │  │  filtered-apps.ts  │           │
│  └──────────────┘  └────────────────────┘           │
├──────────────────────────────────────────────────────┤
│                   src/apps/                          │
│          Per-App Designs (Self-Contained)            │
│                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │ Ayam Goreng │  │ Nasi Padang │  │  (future)  │  │
│  │ config.ts   │  │ config.ts   │  │            │  │
│  │ public/     │  │ public/     │  │            │  │
│  │ private/    │  │ private/    │  │            │  │
│  └─────────────┘  └─────────────┘  └────────────┘  │
└──────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### Shell (`src/shell/`)

The **portable UI kit** — has zero knowledge of specific apps or the superapp catalog. It provides:

| Module | Responsibility |
|--------|---------------|
| `layouts/PrivateLayout.tsx` | Auth-guarded layout: header (brand + search + user-actions) + collapsible SideNav + main content. Accepts config props (name, icon, slug, nav, searchItems). |
| `layouts/PublicLayout.tsx` | Unauthenticated layout: PublicNav + main content. Accepts branding/links/search props. |
| `components/SideNav.tsx` | Collapsible tree navigation. Auto-expands active route. Supports disabled items and icon-only mode. |
| `components/UserActions.tsx` | Header right section: app launcher popup, help popup, theme toggle, profile popup. Uses document click listener for close behavior. |
| `components/SearchBar.tsx` | Cmd+K search dialog. Takes `SearchItem[]` prop. Instant filtering. |
| `components/PublicNav.tsx` | Top navigation for public pages. Takes branding/links/search props. |
| `context/auth.tsx` | Auth state via SolidJS context. 4 dummy users. Session in `sessionStorage`. |
| `context/theme.tsx` | Dark/light toggle. Toggles `html.light` class. Persists in `localStorage`. |
| `context/personalization.tsx` | Color theme (6 options), bg pattern, language, content width, font size, compact mode. Persists in `localStorage` with `kentutsuperapp_` prefix. |
| `lib/app-icon.tsx` | SSR-safe inline SVG rendering via `<span innerHTML>`. |
| `lib/icons.ts` | Lucide icon subset extraction. Only icons in `USED_LUCIDE_ICONS` are bundled. |
| `lib/utils.ts` | `slugify()`, `appColor()` utilities. |

### Gateway (`src/gateway/`)

The **superapp-specific layer** — manages the 100-app catalog and gateway UI:

| Module | Responsibility |
|--------|---------------|
| `components/TopBar.tsx` | Full-width blurred top bar with branding (left) and UserActions (right). |
| `lib/apps.ts` | `APPS` array (100 apps), `AppDef` type, `appColor()` golden-angle color generator. |
| `lib/filtered-apps.ts` | `createFilteredApps()` reactive utility for filtering apps by role count and search query. |

### Apps (`src/apps/`)

**Self-contained per-app designs** — each app is extractable to a standalone repo:

| Module | Responsibility |
|--------|---------------|
| `types.ts` | `AppConfig` interface: name, icon, slug, defaultRoute, nav, search, color. |
| `registry.ts` | Maps slug → app config. `getApp(slug)`, `getAllApps()`. |
| `{name}/config.ts` | Branding, nav tree, search items, color for a specific app. |
| `{name}/public/` | Public page components (landing, about, help, contact). |
| `{name}/private/` | Private page components (dashboard, modules, analytics, admin). |

## Data Flow

```
Browser Request
     │
     ▼
SolidStart Router (file-based, src/routes/)
     │
     ├── Static routes (/ → index.tsx, /landing → landing.tsx, /user/*)
     │
     └── Dynamic routes (/[app]/*)
              │
              ▼
         apps/registry.ts → getApp(slug) → AppConfig
              │
              ├── /public/*  → PublicLayout(app.branding) + app.public/page
              └── /private/* → PrivateLayout(app.nav) + app.private/page
                                  │
                                  ▼
                            Auth guard (auth.tsx)
                            If !isLoggedIn → redirect /user/login
```

## State Management

All state is **client-side only**, no server persistence:

| Context | Storage | Key | Scope |
|---------|---------|-----|-------|
| `AuthProvider` | `sessionStorage` | `kentut_session` | Browser tab lifetime |
| `ThemeProvider` | `localStorage` | `kentutsuperapp_theme` | Persistent |
| `PersonalizationProvider` | `localStorage` | `kentutsuperapp_*` prefix | Persistent |
| User Management data | `localStorage` | `kentutsuperapp_management` | Persistent |
| User Settings data | `localStorage` | `kentutsuperapp_profile` | Persistent |

## Rendering

- **SSR** via SolidStart + Vinxi. Initial HTML rendered server-side with Google Fonts (Sora + DM Sans).
- **Hydration** on client via `entry-client.tsx`. SolidJS signals take over.
- **Icons** are rendered as inline SVG at build time via `@iconify/utils` — no runtime API calls.
- **Theme** applied via CSS custom properties on `<html>` element, overridden by `.light` class.

## Build & Deploy

```
bun run build  →  vinxi build
                    ├── .vinxi/build/ssr/       (server-side bundle)
                    ├── .vinxi/build/client/     (client JS + CSS)
                    └── .vinxi/build/server-fns/ (server functions)

bun run preview → node .output/server/index.mjs   (Nitro server)
```

## Testing

| Suite | File | Tests | Coverage |
|-------|------|-------|----------|
| Gateway | `tests/e2e.py` | 45 | Home, login, register, forgot-password, landing, TopBar, theme, logout, role-based access, old redirects, user management |
| Ayam Goreng | `tests/e2e_sample.py` | 48 | Public pages, private dashboard, sidenav, modules, admin pages, search, auth guard, role access |

All tests use **Playwright Python** with headless Chromium (`--no-sandbox`).

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| File-based routing | SolidStart convention. Dynamic `[app]` segments support N apps without new route files. |
| Props over context for layouts | PrivateLayout takes config props instead of reading from AppCtx. Makes it reusable across apps without coupling. |
| Inline SVG icons (no web components) | `@iconify-icon/solid` uses web components that make API calls. We bundle at build time for zero network requests. |
| sessionStorage for auth | Design sandbox — browser-tab isolation is sufficient. No real backend. |
| localStorage for personalization | Cross-tab persistence for theme/preferences. No sensitive data stored. |
| Golden angle color algorithm | `idx * 137.508 % 360` maximizes hue separation between consecutive apps. |
| Redirect stubs at old routes | Backward compatibility — old `/login/*` and `/user-settings` URLs still work via client-side redirects. |

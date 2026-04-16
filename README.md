# Kentut SuperApp

A unified enterprise gateway built with **SolidStart 1.x**, **Tailwind CSS v4**, and **Vinxi**. Kentut SuperApp provides a single-launchpad experience for 100 enterprise tools with role-based access, dark/light theming, and smooth animations.

## Quick Start

```bash
# Install dependencies (requires bun)
bun install

# Start dev server
bun run dev

# Production build
bun run build

# Preview production build
bun run preview
```

**Requirements:** Node.js >= 22, [bun](https://bun.sh)

## Demo Accounts

| Username   | Password     | Role      | Apps |
|------------|-------------|-----------|------|
| `admin`    | `admin`     | Admin     | 100  |
| `director` | `director`  | Director  | 30   |
| `manager`  | `manager`   | Manager   | 20   |
| `staff`    | `staff`     | Staff     | 10   |

Sessions persist in `sessionStorage` (browser-lifetime only).

## Tech Stack

| Layer        | Technology                                  |
|--------------|---------------------------------------------|
| Framework    | [SolidStart](https://start.solidjs.com) 1.x |
| Build        | [Vinxi](https://vinxi.vercel.app) 0.5       |
| Styling      | [Tailwind CSS](https://tailwindcss.com) v4  |
| Icons        | [@iconify/utils](https://iconify.design) + Lucide |
| Routing      | File-based (`src/routes/`)                  |
| Runtime      | Node.js >= 22                               |
| Package Mgr  | [bun](https://bun.sh)                       |

## Project Structure

```
src/
├── app.css                    # Tailwind @theme, animations, scrollbar styles
├── app.tsx                    # Root: ThemeProvider > AuthProvider > Router > TopBar
├── entry-client.tsx           # Client hydration entry
├── entry-server.tsx           # SSR entry with Google Fonts (Sora + DM Sans)
├── components/
│   ├── AppIcon.tsx            # SSR-safe icon component (inline SVG via @iconify/utils)
│   ├── AuthProvider.tsx       # Auth context, dummy users, sessionStorage persistence
│   ├── ThemeProvider.tsx      # Dark/light toggle, localStorage persistence
│   └── TopBar.tsx             # Full-width blur top bar with branding, launcher, profile
├── lib/
│   ├── apps.ts                # App registry (100 apps), appColor(), AppDef type
│   └── icons.ts               # Lucide icon subset extraction, buildIconSVG()
└── routes/
    ├── index.tsx              # Home: brand hero + Login CTA, redirects if authenticated
    ├── landing.tsx            # App grid: role-filtered tiles, search, welcome message
    └── login/
        ├── index.tsx          # Login form with validation + auth method buttons
        ├── forgot-password.tsx # Reset password request flow
        └── register.tsx       # New account registration form
```

## Architecture

### Icons

All icons use `@iconify/utils` + `@iconify-json/lucide` bundled at build time as inline SVG. No runtime API calls. The `AppIcon` component renders `<span innerHTML="<svg>...</svg>">` via `buildIconSVG()` from `src/lib/icons.ts`.

Only the icons listed in `USED_LUCIDE_ICONS` (in `src/lib/icons.ts`) are extracted from the full Lucide set at build time.

### Theming

Dark mode is the default. The `ThemeProvider` toggles `html.light` class, which overrides CSS custom properties defined in `src/app.css` `@theme` block. Preference persists in `localStorage`.

### Auth

Client-side only with 4 dummy users. The `AuthProvider` uses SolidJS context + `createSignal`. Session data is serialized to `sessionStorage` on login and restored on page load.

### Color Generation

App tile colors use the golden angle algorithm (`idx * 137.508 % 360`) for maximum hue separation across 100 apps.

## Configuration

### Path Aliases

`~/*` maps to `./src/*` (configured in `tsconfig.json` and SolidStart convention).

### Fonts

Google Fonts (Sora for display, DM Sans for body) are loaded via `<link>` tags in `src/entry-server.tsx`.

## Known Limitations

- **No real auth backend** — dummy users only, no SSO/LDAP/OAuth integration
- **No email sending** — forgot password and register pages are UI-only
- **No individual app routes** — all tiles navigate to the landing page
- **No tests** — no test runner, CI, or linting configured
- **Icon bundle size** — ~547KB because full `@iconify-json/lucide/icons.json` is imported then subsetted at build time; tree-shaking cannot eliminate the unused JSON

## License

MIT — see [LICENSE](./LICENSE)

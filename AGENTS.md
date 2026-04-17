# Global Agent Instructions
- **Memory Engine:** OpenViking 0.3.8 (Local RAG)
- **Constraint:** Use the 'viking' MCP tool to fetch context before asking for file reads.
- **Strategy:** Prioritize L0 (Abstract) summaries to minimize context window bloat.

## Commands

- `bun run dev` — dev server (via `vinxi dev`)
- `bun run build` — production build (via `vinxi build`, outputs to `.output/`)
- `bun run preview` — preview production build
- Tests: `python3 tests/run.py` (all tests) or `python3 tests/run.py <suite>` (superapp/auth/apps). Require Playwright Python + headless Chromium with `--no-sandbox`.

## Architecture

- **Framework:** SolidStart 1.x (`@solidjs/start@1.3.2`) with Vinxi (`vinxi@0.5.11`)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin, configured in `app.config.ts`
- **3-layer architecture:**
  - `src/shell/` — Reusable UI kit (layouts, components, context, icons, utils). Copy to any real project.
  - `src/gateway/` — Superapp catalog (27-app registry, TopBar, filtered-apps utility).
  - `src/apps/` — Per-app designs (branding, nav, pages). Each app is self-contained and extractable.
- **Routing:** File-based in `src/routes/`:
  - `/` — Gateway landing (unauthenticated)
  - `/landing` — App selection grid (post-login)
  - `/user/login` — Login (was `/login`, redirect stub preserved)
  - `/user/login/forgot-password` — Password reset (was `/login/forgot-password`)
  - `/user/login/register` — Registration (was `/login/register`)
  - `/user/settings` — User settings with 5 tabs (was `/user-settings`, redirect stub preserved)
  - `/user/management` — User & app management (CRUD users, roles/permissions, app access mapping)
  - `/[app]/public/*` — Dynamic public app routes
  - `/[app]/private/*` — Dynamic private app routes (auth-guarded)
- **Path alias:** `~/*` → `./src/*` (tsconfig paths + SolidStart convention)
- **`jsxImportSource: "solid-js"`** — JSX is Solid, not React.
- **Icons:** `@iconify/utils` + `@iconify-json/lucide` bundled at build time. `AppIcon` component renders inline SVG via `buildIconSVG()` from `src/shell/lib/icons.ts`. All used icons must be listed in `USED_LUCIDE_ICONS` in that file.
- **Auth:** Client-side only with 4 dummy users in `src/shell/context/auth.tsx`. Session in `sessionStorage`.
- **Theme:** Dark/light via `src/shell/context/theme.tsx`, persisted in `localStorage`, toggles `html.light` class.
- **Personalization:** Color theme, bg pattern, language, content width, font size, compact mode via `src/shell/context/personalization.tsx`. Persisted in `localStorage` with `kentutsuperapp_` prefix.

## Key Files

- `src/gateway/lib/apps.ts` — Shared app registry (100 apps), `appColor()`, `AppDef` type
- `src/gateway/lib/filtered-apps.ts` — `createFilteredApps()` utility
- `src/gateway/components/TopBar.tsx` — Gateway top bar (branding + UserActions)
- `src/shell/lib/icons.ts` — Lucide icon subset extraction, `buildIconSVG()`
- `src/shell/lib/app-icon.tsx` — SSR-safe icon component
- `src/shell/lib/utils.ts` — `slugify()`, `appColor()` utility
- `src/shell/context/auth.tsx` — Auth context, dummy users, session persistence
- `src/shell/context/theme.tsx` — Dark/light theme toggle
- `src/shell/context/personalization.tsx` — All personalization options
- `src/shell/components/SideNav.tsx` — Collapsible tree nav, auto-expand active, disabled items
- `src/shell/components/UserActions.tsx` — App launcher, help, theme, profile popups
- `src/shell/components/SearchBar.tsx` — Cmd+K search dialog
- `src/shell/components/PublicNav.tsx` — Public top nav
- `src/shell/layouts/PrivateLayout.tsx` — Header + SideNav + main (takes config props)
- `src/shell/layouts/PublicLayout.tsx` — PublicNav + main
- `src/apps/registry.ts` — Maps slug → app config, `getApp()`, `getAllApps()`
- `src/apps/types.ts` — `AppConfig` interface
- `src/apps/registry.ts` — Maps slug → app config, `getApp()`, `getAllApps()`
- `src/app.css` — Tailwind v4 `@theme` block with all design tokens, animations, scrollbar styles, compact mode

## Gotchas

- **Requires Node >= 22** (engines field in package.json).
- **Package manager is `bun`** — `pnpm-lock.yaml` was removed.
- **Lucide icon renames in v1.2.x:** `help-circle`→`circle-question-mark`, `user-circle`→`circle-user`, `alert-circle`→`circle-alert`, `globe-2`→`globe-lock`, `file-signature`→`signature`, `layout`→`layout-grid`, `sitemap`→`workflow`, `file-edit`→`file-pen`, `code-2`→`file-code`.
- **Icon bundle is ~547KB** because full `@iconify-json/lucide/icons.json` is imported then subsetted — tree-shaking can't eliminate unused JSON.
- **No real auth** — all auth is client-side dummy users. Login/register/forgot-password pages are UI-only.
- **Old route redirects** — `/login/*` and `/user-settings` have redirect stubs that navigate to the new `/user/*` paths.
- **Playwright strict mode** — many selectors like `text=Administrator` match across TopBar, SideNav, and main content. Always scope with `page.locator("main >> ...")`, `page.locator("aside")`, etc.
- **SolidJS hydration delay** — Playwright tests need `wait_for_timeout(2000-3000)` after login for SolidJS hydration.

# Global Agent Instructions
- **Memory Engine:** OpenViking 0.3.8 (Local RAG)
- **Constraint:** Use the 'viking' MCP tool to fetch context before asking for file reads.
- **Strategy:** Prioritize L0 (Abstract) summaries to minimize context window bloat.

## Commands

- `bun run dev` — dev server (via `vinxi dev`)
- `bun run build` — production build (via `vinxi build`, outputs to `.output/`)
- `bun run preview` — preview production build
- No test, lint, or typecheck scripts are configured.

## Architecture

- **Framework:** SolidStart 1.x (`@solidjs/start@1.3.2`) with Vinxi (`vinxi@0.5.11`)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin, configured in `app.config.ts`
- **Routing:** File-based in `src/routes/` — `index.tsx`, `landing.tsx`, `login/index.tsx`, `login/forgot-password.tsx`, `login/register.tsx`
- **Path alias:** `~/*` → `./src/*` (tsconfig paths + SolidStart convention)
- **`jsxImportSource: "solid-js"`** — JSX is Solid, not React.
- **Icons:** `@iconify/utils` + `@iconify-json/lucide` bundled at build time. `AppIcon` component renders inline SVG via `buildIconSVG()` from `src/lib/icons.ts`. All used icons must be listed in `USED_LUCIDE_ICONS` in `src/lib/icons.ts`.
- **Auth:** Client-side only with 4 dummy users in `AuthProvider`. Session in `sessionStorage`.
- **Theme:** Dark/light via `ThemeProvider`, persisted in `localStorage`, toggles `html.light` class.

## Key Files

- `src/lib/apps.ts` — Shared app registry (100 apps), `appColor()`, `AppDef` type
- `src/lib/icons.ts` — Lucide icon subset extraction, `buildIconSVG()`
- `src/components/TopBar.tsx` — Full-width blur top bar: branding, app launcher popup, help/theme/profile
- `src/components/AppIcon.tsx` — SSR-safe icon component
- `src/components/AuthProvider.tsx` — Auth context, dummy users, session persistence
- `src/components/ThemeProvider.tsx` — Dark/light theme toggle
- `src/app.css` — Tailwind v4 `@theme` block with all design tokens, animations, scrollbar styles

## Gotchas

- **Requires Node >= 22** (engines field in package.json).
- **Package manager is `bun`** — `pnpm-lock.yaml` was removed.
- **Lucide icon renames in v1.2.x:** `help-circle`→`circle-question-mark`, `user-circle`→`circle-user`, `alert-circle`→`circle-alert`, `globe-2`→`globe-lock`, `file-signature`→`signature`, `layout`→`layout-grid`, `sitemap`→`workflow`, `file-edit`→`file-pen`, `code-2`→`file-code`.
- **Icon bundle is ~547KB** because full `@iconify-json/lucide/icons.json` is imported then subsetted — tree-shaking can't eliminate unused JSON.
- **`src/components/Nav.tsx` is unused** — superseded by TopBar branding. Safe to delete.
- **No real auth** — all auth is client-side dummy users. Login/register/forgot-password pages are UI-only.

# Global Agent Instructions

## MANDATORY RULES (Zero Tolerance)

These rules are non-negotiable. Every agent MUST follow them on EVERY task. Violations are blocking.

### 1. ZERO Hardcoded Strings in TSX
**Every user-visible text string MUST come from the i18n system.** No exceptions.

```tsx
// ❌ FORBIDDEN — hardcoded string
<h1>Dashboard</h1>
<button>Save Changes</button>
<input placeholder="Filter apps..." />
<th>App Name</th>

// ✅ REQUIRED — use useT()
const t = useT("apps");
<h1>{t().dashboardTitle}</h1>
<button>{t().saveChanges}</button>
<input placeholder={t().filterApps} />
<th>{t().colAppName}</th>
```

This applies to ALL user-visible text: headings, paragraphs, labels, placeholders, button text, table headers, badges, tooltips, error messages, status labels, alt text, title attributes, and modal titles.

### 2. Multilingual Compliance
Every string that appears in EN must also exist in MY (Malay) and CN (Chinese). When adding a new string key:
1. Add to `strings.ts` (English base)
2. Add to `strings_my.ts` (Malay translation)
3. Add to `strings_cn.ts` (Chinese translation)
4. All three files must have the SAME keys

### 3. Section-Based i18n Structure
Strings are organized by section, split by language file:
- `src/lib/{section}/strings.ts` — English (base)
- `src/lib/{section}/strings_my.ts` — Malay
- `src/lib/{section}/strings_cn.ts` — Chinese
- `src/lib/{section}/i18n.ts` — barrel that calls `registerSection()`

Sections: `apps`, `login`, `users`, `setup`, `common`, `[app]`

### 4. Always Verify Before Committing
Before ANY commit, scan changed TSX files for hardcoded strings. If found, fix them FIRST.

---

## Commands

- `bun run dev` — dev server (via `vinxi dev`, routes at `/`)
- `bun run build` — production build (`VINXI_BUILD=1 vinxi build`, outputs to `.output/`)
- `bun run preview` — preview production build
- Tests: `python3 tests/run.py` (all) or `python3 tests/run.py <suite>`

## Architecture

- **Framework:** SolidStart 1.x (`@solidjs/start@1.3.2`) with Vinxi (`vinxi@0.5.11`)
- **Rendering:** CSR with static prerendering (`ssr: false`)
- **Base URL:** ALL environments serve under `/ui` — `server.baseURL: "/ui"` always, `<Router base="/ui">`, `vite.base: "/ui"` only in production builds
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin, configured in `app.config.ts`
- **i18n:** Custom system in `src/lib/common/i18n.tsx` — `LangProvider`, `useLang()`, `useT(section)`, `registerSection()`. Supports EN/MY/CN. Language switcher in TopNav.
- **Auth:** Client-side only with 4 dummy users in `src/lib/common/auth.tsx`. Session in `sessionStorage`.
- **Theme:** Dark/light via `src/lib/common/theme.tsx`, persisted in `localStorage`.

### Folder Structure (Section-Aligned)

```
src/
├── components/common/   # Reusable UI kit (Button, Input, Modal, etc.)
├── lib/
│   ├── common/          # Shared: auth, theme, i18n, branding, icons, auth-guard
│   ├── apps/            # App registry, status-store, filtered-apps, nav, strings
│   ├── login/           # Auth stores, nav, strings
│   ├── users/           # Nav, strings
│   └── setup/           # Nav, strings
├── routes/
│   ├── index.tsx        # Splash → navigates to /apps
│   ├── about.tsx        # Platform about
│   ├── apps/
│   │   ├── index.tsx    # App grid with status overlays
│   │   └── manage/      # Dashboard, Registration, Status sub-routes
│   ├── setup/           # Setup wizard, docs, help
│   ├── login/           # SSO, local, AD/LDAP, forgot, register, manage, users, groups, permissions
│   ├── users/           # Account, profile, security, appearance
│   └── [app]/           # Dynamic per-app: public, private, docs, help, about
├── app.tsx              # Root: LangProvider > ThemeProvider > AuthProvider > Router
└── app.css              # Tailwind v4 @theme with design tokens
```

### Key Paths

| Old (DELETED) | New (CURRENT) |
|---|---|
| `src/shell/*` | `src/lib/common/*` or `src/components/common/*` |
| `src/gateway/*` | `src/lib/apps/*` or `src/routes/apps/*` |
| `src/apps/registry.ts` | `src/lib/apps/apps.ts` |

### Routing

| Route | Purpose |
|---|---|
| `/` | Splash screen, redirects to `/apps` |
| `/apps` | App selection grid (main gateway) |
| `/apps/manage` | Dashboard (app status chart) |
| `/apps/manage/registration` | App CRUD (add/edit/remove) |
| `/apps/manage/status` | App status management |
| `/about` | Platform info |
| `/setup` | First-time setup wizard |
| `/setup/docs` | Documentation |
| `/setup/help` | Help center |
| `/login` | SSO provider selection |
| `/login/local` | Local account login |
| `/login/ad-ldap` | AD/LDAP login |
| `/login/forgot-password` | Password reset |
| `/login/register` | Registration |
| `/login/manage` | Auth provider management |
| `/login/users` | User management |
| `/login/groups` | Group management |
| `/login/permissions` | Permissions matrix |
| `/users/account` | Account info |
| `/users/profile` | Profile details |
| `/users/security` | Security (2FA, sessions) |
| `/users/appearance` | Theme, font, compact, width |
| `/[app]/public` | Per-app public page |
| `/[app]/public/docs` | Per-app docs |
| `/[app]/public/help` | Per-app help |
| `/[app]/public/about` | Per-app about |
| `/[app]/private` | Per-app private dashboard |

## Key Files

- `src/lib/common/i18n.tsx` — `LangProvider`, `useLang()`, `useT(section)`, `registerSection()`, `StringMap`
- `src/lib/common/branding.ts` — `BRAND` object + `ROUTES` constants
- `src/lib/common/auth.tsx` — `AuthProvider`, `useAuth()`
- `src/lib/common/auth-guard.ts` — `useAuthGuard()` with `requireAuth()` and `requireAdmin()`
- `src/lib/common/theme.tsx` — Dark/light theme toggle
- `src/lib/common/icons.ts` — Lucide icon subset (`USED_LUCIDE_ICONS` array)
- `src/lib/apps/apps.ts` — `AppDef` type, `APPS` array, `appColor()`, `getBrandColor()`
- `src/lib/apps/status-store.ts` — `AppStatusStore` with `ManageStatus` type
- `src/lib/apps/nav.ts` — `appManageNav` sidenav config
- `src/lib/apps/filtered-apps.ts` — `createFilteredApps()`
- `src/components/common/TopNav.tsx` — Top nav with context-aware links + language switcher
- `src/components/common/PrivateLayout.tsx` — Header + SideNav + main
- `src/components/common/SideNav.tsx` — Collapsible tree nav with `NavSection[]`
- `src/components/common/Modal.tsx` — Generic modal dialog
- `src/app.css` — Tailwind v4 `@theme` block with all design tokens

## i18n System

### How It Works
1. Each section has `strings.ts` (EN), `strings_my.ts` (MY), `strings_cn.ts` (CN)
2. Each section has `i18n.ts` barrel that imports all 3 and calls `registerSection("name", en, my, cn)`
3. All barrels are imported in `src/app.tsx` to register at startup
4. `LangProvider` wraps the app tree in `app.tsx`
5. Components call `const t = useT("section")` to get reactive merged string map
6. Language persisted in `localStorage` key `uiden_lang`

### Adding a New String
1. Add key to `src/lib/{section}/strings.ts` (English)
2. Add same key to `strings_my.ts` (Malay)
3. Add same key to `strings_cn.ts` (Chinese)
4. Use in component: `const t = useT("section"); ... <p>{t().yourKey}</p>`

### Nav Labels in String Files
Sidenav labels and nav item labels are in `strings.ts` files, NOT hardcoded in nav config. Nav config files (`nav.ts`) reference string keys or use labels from the section's string map.

## Gotchas

- **Requires Node >= 22** (engines field in package.json)
- **Package manager is `bun`** — `pnpm-lock.yaml` was removed
- **Path alias:** `~/*` → `./src/*` — ALWAYS use `~/` imports, never `./` or `../`
- **`jsxImportSource: "solid-js"`** — JSX is Solid, NOT React
- **Icons:** All used icons MUST be listed in `USED_LUCIDE_ICONS` in `src/lib/common/icons.ts`
- **Icon renames:** `help-circle`→`circle-question-mark`, `user-circle`→`circle-user`, `alert-circle`→`circle-alert`, `globe-2`→`globe-lock`, `layout`→`layout-grid`, `sitemap`→`workflow`, `file-edit`→`file-pen`, `code-2`→`file-code`
- **CSR only** — `ssr: false` in `app.config.ts`, avoid `document is not defined` errors
- **No real auth** — all auth is client-side dummy users
- **TopNav nav links** — context-aware: shows `/setup/docs`, `/setup/help`, `/about` on apps grid; shows `/{app}/docs`, `/{app}/help`, `/{app}/about` on app pages. Computed in `app.tsx` `GatewayHeader`.
- **Favicon** stays at root `/favicon.ico` — not affected by `/ui` base
- **`AppStatusStore`** uses `ManageStatus`: `"online" | "error" | "down" | "hide" | "maintenance"` with `maintenanceFrom`/`maintenanceTo` datetime fields

## Agent Documentation Workflow

See `docs/AGENT_WORKFLOW.md` for detailed requirements. All agents MUST document changes before committing.

## Agent Workflow History

**[2025-05-05] i18n + Manage Restructure**
- Rewrote i18n system: section-based strings, split by language file
- Created routes: `/about`, `/setup/docs`, `/setup/help`, `/[app]/public/docs|help|about`
- Restructured `/apps/manage` into Dashboard + Registration + Status sub-routes
- Added language switcher (globe icon) to TopNav
- TopNav nav links moved to right side, context-aware per route

**[2025-04-28] Documentation Workflow Implemented**
- Created `docs/AGENT_WORKFLOW.md` with complete workflow guide
- Created `docs/TEMPLATES/CHANGE_DOCUMENTATION.md` with structured template

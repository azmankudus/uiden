# Route Reference

> **Version:** 2.0 · **Updated:** 2026-04-17

## Route Map

### Gateway Routes

| Route | Auth | File | Description |
|-------|------|------|-------------|
| `/` | No | `src/routes/index.tsx` | Brand hero + Login CTA. Redirects to `/landing` if authenticated. |
| `/landing` | Yes | `src/routes/landing.tsx` | App selection grid with search/filter. Shows role-filtered tiles. Redirects to `/user/login` if not authenticated. |

### User Routes

| Route | Auth | File | Description |
|-------|------|------|-------------|
| `/user/login` | No | `src/routes/user/login/index.tsx` | Login form with validation, auth method buttons. Redirects to `/landing` on success. |
| `/user/login/forgot-password` | No | `src/routes/user/login/forgot-password.tsx` | Email input → simulated reset link. |
| `/user/login/register` | No | `src/routes/user/login/register.tsx` | Registration form (first/last name, email, password). UI-only. |
| `/user/settings` | Yes | `src/routes/user/settings/index.tsx` | 5-tab settings: Account, Profile, Personalization, Notifications, Security. |
| `/user/management` | Yes | `src/routes/user/management/index.tsx` | User CRUD, roles/permissions, app access mapping. 3 tabs: Users, Roles, App Access Map. |

### Dynamic App Routes

All apps use the `[app]` dynamic segment. Currently only `ayam-goreng` has full pages.

| Route Pattern | Auth | File | Description |
|---------------|------|------|-------------|
| `/[app]` | — | `src/routes/[app]/index.tsx` | Redirects to app's `defaultRoute` (e.g. `/ayam-goreng/public`). |
| `/[app]/public` | No | `src/routes/[app]/public/index.tsx` | App landing page. |
| `/[app]/public/about` | No | `src/routes/[app]/public/about.tsx` | About page. |
| `/[app]/public/help` | No | `src/routes/[app]/public/help.tsx` | Help & FAQ page. |
| `/[app]/public/contact` | No | `src/routes/[app]/public/contact.tsx` | Contact form page. |
| `/[app]/private` | Yes | `src/routes/[app]/private/index.tsx` | Dashboard. Redirects to `/user/login` if not authenticated. |
| `/[app]/private/analytics/[slug]` | Yes | `src/routes/[app]/private/analytics/[slug].tsx` | Analytics page by slug. |
| `/[app]/private/modules/[slug]` | Yes | `src/routes/[app]/private/modules/[slug].tsx` | Module detail by slug. |
| `/[app]/private/admin` | Yes | `src/routes/[app]/private/admin/index.tsx` | Admin overview. |
| `/[app]/private/admin/users` | Yes | `src/routes/[app]/private/admin/users.tsx` | Users list. |
| `/[app]/private/admin/roles` | Yes | `src/routes/[app]/private/admin/roles.tsx` | Roles & permissions. |
| `/[app]/private/admin/settings` | Yes | `src/routes/[app]/private/admin/settings.tsx` | Admin settings. |
| `/[app]/private/admin/audit` | Yes | `src/routes/[app]/private/admin/audit.tsx` | Audit log. |

### Redirect Stubs

Old routes preserved for backward compatibility. Each performs a client-side redirect via `navigate()`:

| Old Route | Redirects To | File |
|-----------|-------------|------|
| `/login` | `/user/login` | `src/routes/login/index.tsx` |
| `/login/forgot-password` | `/user/login/forgot-password` | `src/routes/login/forgot-password.tsx` |
| `/login/register` | `/user/login/register` | `src/routes/login/register.tsx` |
| `/user-settings` | `/user/settings` | `src/routes/user-settings.tsx` |

## Auth Guards

Routes that require authentication check `auth.isLoggedIn()` on mount:

- **PrivateLayout** — if not logged in, redirects to `/user/login`
- **User Settings** — if not logged in, redirects to `/user/login`
- **User Management** — if not logged in, redirects to `/user/login`
- **Landing** (`/landing`) — if not logged in, redirects to `/user/login`
- **Home** (`/`) — if logged in, redirects to `/landing`

## Route Resolution for Dynamic Apps

```
Request: /ayam-goreng/private/modules/firewall-guard
                │           │         │
                │           │         └── [slug] = "firewall-guard"
                │           └── matched by src/routes/[app]/private/modules/[slug].tsx
                └── [app] = "ayam-goreng"

Resolution:
1. Router matches [app] = "ayam-goreng"
2. Route file reads getApp("ayam-goreng") from registry
3. Page component loaded from src/apps/ayam-goreng/private/modules/[slug].tsx
4. PrivateLayout wraps with app's nav tree and branding
```

## Adding a New App

1. Create `src/apps/{slug}/config.ts` with branding, nav, search data
2. Register in `src/apps/registry.ts` via `registry.set("{slug}", config)`
3. Create page components in `src/apps/{slug}/public/` and `src/apps/{slug}/private/`
4. Route files in `src/routes/[app]/` already handle any `[app]` value — no new route files needed
5. Add e2e tests in `tests/e2e_{slug}.py`

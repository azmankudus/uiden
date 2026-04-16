# App Design: Ayam Goreng

> **Type:** Sample App · **Status:** Complete · **Slug:** `ayam-goreng`

## Overview

Ayam Goreng is the first fully-designed app in the Kentut SuperApp. It serves as the **reference implementation** for all future apps, demonstrating the complete pattern: public pages, private dashboard, tree navigation, modules, analytics, and admin section.

## Branding

| Property | Value |
|----------|-------|
| Name | Ayam Goreng |
| Icon | `lucide:drumstick` |
| Default Route | `/ayam-goreng/public` |
| Brand Color | Uses global brand color (personalization) |
| Layout | PrivateLayout for private, PublicLayout for public |

## Navigation Tree

```
Ayam Goreng
├── Dashboard                    /ayam-goreng/private
├── Analytics                    (expandable)
│   ├── Revenue Analytics        /ayam-goreng/private/analytics/revenue
│   ├── User Analytics           /ayam-goreng/private/analytics/users
│   └── Performance Analytics    /ayam-goreng/private/analytics/performance
├── Modules                      (expandable)
│   ├── Security                 (expandable)
│   │   ├── Firewall Guard       /ayam-goreng/private/modules/firewall-guard
│   │   └── Threat Detector      /ayam-goreng/private/modules/threat-detector
│   └── Infrastructure           (expandable)
│       ├── Load Balancer        /ayam-goreng/private/modules/load-balancer
│       └── CDN Node             /ayam-goreng/private/modules/cdn-node
├── Administration               (expandable)
│   ├── Overview                 /ayam-goreng/private/admin
│   ├── Users & Groups           /ayam-goreng/private/admin/users
│   ├── Roles & Permissions      /ayam-goreng/private/admin/roles
│   ├── Settings                 /ayam-goreng/private/admin/settings
│   └── Audit Log                /ayam-goreng/private/admin/audit
│   [disabled] Billing           (no route)
│   [disabled] Integrations      (no route)
└── [disabled] Coming Soon       (no route)
```

## Public Pages

### Landing (`/ayam-goreng/public`)
- Hero section with app name, tagline, CTA buttons
- Feature cards grid (4 cards)
- Sign-in button links to `/user/login`

### About (`/ayam-goreng/public/about`)
- Company story, mission, values
- Team member avatars (3 members)
- Statistics (users, uptime, support)

### Help & FAQ (`/ayam-goreng/public/help`)
- FAQ accordion
- Support channels (email, phone, docs)
- Contact info

### Contact (`/ayam-goreng/public/contact`)
- Contact form (name, email, subject, message)
- Send button (simulated)
- Office locations (3 offices)

## Private Pages

### Dashboard (`/ayam-goreng/private`)
- Welcome message with user name
- 4 stat cards (uptime, users, revenue, incidents)
- Recent activity list
- Quick action buttons

### Analytics (`/ayam-goreng/private/analytics/[slug]`)
- Dynamic page by slug: `revenue`, `users`, `performance`
- Each shows chart placeholder, KPI cards, trend indicators
- Unknown slugs show "not found" state

### Modules (`/ayam-goreng/private/modules/[slug]`)
- Dynamic page by slug: `firewall-guard`, `threat-detector`, `load-balancer`, `cdn-node`
- Module status (Active/Inactive), health metrics, description
- Configuration options
- Unknown slugs show "not found" state

### Admin Section

| Page | Content |
|------|---------|
| **Overview** (`/admin`) | Admin cards: Users & Groups, Roles & Permissions, Settings, Audit Log |
| **Users** (`/admin/users`) | User list table with search/filter, user cards |
| **Roles** (`/admin/roles`) | Role cards (Admin, Editor, Viewer, Staff) with permission lists |
| **Settings** (`/admin/settings`) | App settings form (name, URL, email, notifications) |
| **Audit** (`/admin/audit`) | Filterable audit log entries with timestamps and actions |

## Search Data

The SearchBar (`Cmd+K`) indexes these items:

- Dashboard
- Revenue Analytics, User Analytics, Performance Analytics
- Firewall Guard, Threat Detector, Load Balancer, CDN Node
- Admin Overview, Users, Roles, Settings, Audit Log
- Help & FAQ, Contact, About

## Test Coverage

48 Playwright tests in `tests/e2e_sample.py`:

| Category | Tests | Coverage |
|----------|-------|----------|
| Redirect | 1 | `/ayam-goreng` → `/ayam-goreng/public` |
| Public pages | 16 | Landing, Help, Contact, About — headings, content, forms, navigation |
| Search | 3 | Open, results, navigation |
| Private dashboard | 5 | Login, welcome, stats, sidenav, topbar |
| SideNav | 7 | Links, expand, subtree, navigate, collapse |
| Modules | 3 | Heading, status, not-found |
| Admin pages | 9 | Overview, Users, Roles, Settings, Audit — headings, content, filters |
| Auth guard | 1 | Unauthenticated redirects to `/user/login` |
| Role access | 1 | Staff user can access dashboard |
| Private search | 1 | Module results appear |
| Sign-in link | 1 | Points to `/user/login` |

## File Map

```
src/apps/ayam-goreng/
├── config.ts                              # Branding, nav tree, search data
├── public/
│   ├── landing.tsx                        # Hero + features + CTA
│   ├── about.tsx                          # Story + values + team
│   ├── help.tsx                           # FAQ + support channels
│   └── contact.tsx                        # Form + offices
└── private/
    ├── dashboard.tsx                      # Welcome + stats + activity
    ├── analytics/
    │   └── [slug].tsx                     # Revenue/Users/Performance
    ├── modules/
    │   └── [slug].tsx                     # Firewall/Threat/LB/CDN
    └── admin/
        ├── index.tsx                      # Admin overview cards
        ├── users.tsx                      # User list + filter
        ├── roles.tsx                      # Role cards + permissions
        ├── settings.tsx                   # App settings form
        └── audit.tsx                      # Audit log + filters
```

## Pattern for New Apps

To create a new app, follow this pattern:

1. **Config** — Create `src/apps/{slug}/config.ts` with:
   - `name`, `icon`, `slug`, `defaultRoute`
   - `nav`: `NavItem[]` tree (see `src/shell/components/SideNav.tsx` for type)
   - `search`: `SearchItem[]` array
   - Optional: custom color, additional metadata

2. **Registry** — Add to `src/apps/registry.ts`:
   ```ts
   registry.set("{slug}", { config });
   ```

3. **Public pages** — Create components in `src/apps/{slug}/public/`:
   - Each exports a default component
   - Use `PublicLayout` from shell with app's branding

4. **Private pages** — Create components in `src/apps/{slug}/private/`:
   - Each exports a default component
   - Use `PrivateLayout` from shell with app's nav tree

5. **Tests** — Create `tests/e2e_{slug}.py` following the Ayam Goreng pattern

No new route files needed — the `[app]` dynamic segment handles everything.

# Architecture & Next Steps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Document the current state of the Kentut SuperApp design sandbox and plan remaining features for a complete prototype.

**Architecture:** 3-layer SolidJS design sandbox — Shell (reusable UI kit), Gateway (100-app catalog), Apps (self-contained per-app designs). File-based routing with `[app]` dynamic segments. All state is client-side with sessionStorage/localStorage persistence.

**Tech Stack:** SolidStart 1.3.2, Vinxi 0.5.11, Tailwind CSS v4, @iconify/utils + Lucide, bun runtime, Node >= 22, Playwright Python for e2e tests.

---

## Completed Work

### Phase 1: Gateway & Auth (COMPLETED)

- [x] Gateway landing page with 100-app registry (`src/gateway/lib/apps.ts`)
- [x] Golden-angle color distribution (`appColor()` — `idx * 137.508 % 360`)
- [x] Login/register/forgot-password flows at `/user/login/*`
- [x] 4 dummy users: admin (100), director (30), manager (20), staff (10)
- [x] Session persistence in `sessionStorage`
- [x] TopBar with app launcher, help, theme toggle, profile popups
- [x] Dark/light theme with CSS variable overrides (`html.light` class)
- [x] Old route redirects (`/login/*` → `/user/login/*`, `/user-settings` → `/user/settings`)
- **Commit:** `49359e1` `433f6f5` `b5c3855` `4943c71` `f97254d`

### Phase 2: 3-Layer Restructure + Ayam Goreng App (COMPLETED)

- [x] Restructure: `src/components/` → `src/shell/` (layouts, components, context, lib)
- [x] Extract gateway: `src/lib/` → `src/gateway/` (TopBar, apps registry, filtered-apps)
- [x] Create apps layer: `src/apps/` with registry, types, and Ayam Goreng config
- [x] Dynamic `[app]` routing: `/[app]/public/*` and `/[app]/private/*`
- [x] Ayam Goreng public pages: landing, about, help, contact
- [x] Ayam Goreng private pages: dashboard, analytics/[slug], modules/[slug], admin/*
- [x] PrivateLayout with header + collapsible SideNav + main area
- [x] PublicLayout with PublicNav + main area
- [x] SideNav: collapsible tree, auto-expand active route, disabled items, icon-only mode
- [x] SearchBar: Cmd+K dialog with instant filtering
- [x] Personalization: color themes (6), bg patterns (4), language (4), font size, compact mode, content width
- [x] User Settings: 5 tabs (Account, Profile, Personalization, Notifications, Security)
- [x] User Management: `/user/management` with user CRUD, roles/permissions, app access mapping
- [x] 93 e2e tests passing (45 gateway + 48 ayam-goreng)
- **Commit:** `10a814f`

### Phase 3: Documentation (COMPLETED)

- [x] Rewrite README with badges, feature table, architecture diagram, directory tree
- [x] Update AGENTS.md with current architecture, routes, key files, gotchas
- [x] Create architecture, routing, and app design docs
- **Commit:** `912e0e0` + this commit

---

## Remaining Work

### Task 1: Second App Design — "Nasi Padang"

**Purpose:** Validate that the shell/apps/gateway architecture works for a second app. Proves extractability.

**Files:**
- Create: `src/apps/nasi-padang/config.ts` — branding (name, icon, slug, nav tree, search items)
- Create: `src/apps/nasi-padang/public/landing.tsx`, `about.tsx`, `help.tsx`, `contact.tsx`
- Create: `src/apps/nasi-padang/private/dashboard.tsx`, `analytics/[slug].tsx`, `modules/[slug].tsx`, `admin/index.tsx`, `admin/users.tsx`, `admin/roles.tsx`, `admin/settings.tsx`, `admin/audit.tsx`
- Create: `tests/e2e_nasi_padang.py` — Playwright tests for the new app

- [ ] **Step 1: Create `src/apps/nasi-padang/config.ts`**
  - Define branding (name "Nasi Padang", icon, color scheme), nav tree, search data items
  - Follow the pattern from `src/apps/ayam-goreng/config.ts`
  - Register in `src/apps/registry.ts` with slug `nasi-padang`

- [ ] **Step 2: Create public pages**
  - `landing.tsx`, `about.tsx`, `help.tsx`, `contact.tsx` in `src/apps/nasi-padang/public/`
  - Use PublicLayout, unique branding different from Ayam Goreng

- [ ] **Step 3: Create private pages**
  - Dashboard, analytics, modules, admin pages in `src/apps/nasi-padang/private/`
  - Use PrivateLayout with the app's nav tree

- [ ] **Step 4: Write e2e tests**
  - `tests/e2e_nasi_padang.py` following the pattern from `tests/e2e_sample.py`
  - Test public pages, private dashboard, auth guard, role-based access

- [ ] **Step 5: Run all tests and build**
  - `python3 tests/e2e.py && python3 tests/e2e_sample.py && python3 tests/e2e_nasi_padang.py`
  - `bun run build`

- [ ] **Step 6: Commit**
  ```bash
  git add -A && git commit -m "feat: add Nasi Padang app design with e2e tests"
  ```

---

### Task 2: Responsive / Mobile Layout

**Purpose:** Make the superapp usable on mobile viewports (< 768px).

**Files:**
- Modify: `src/shell/layouts/PrivateLayout.tsx` — mobile drawer for SideNav
- Modify: `src/shell/layouts/PublicLayout.tsx` — responsive PublicNav
- Modify: `src/shell/components/SideNav.tsx` — overlay mode on mobile
- Modify: `src/shell/components/UserActions.tsx` — compact mode on mobile
- Modify: `src/gateway/components/TopBar.tsx` — responsive top bar
- Modify: `src/app.css` — mobile-specific styles
- Modify: `tests/e2e.py` — add viewport tests

- [ ] **Step 1: Write failing tests for mobile viewport**
  - New tests with `viewport={"width": 375, "height": 812}` (iPhone)
  - Assert SideNav hidden, hamburger menu visible, top bar responsive

- [ ] **Step 2: Implement mobile SideNav as slide-out drawer**
  - On `md:` breakpoint, SideNav becomes overlay with backdrop
  - Hamburger toggle in header

- [ ] **Step 3: Make UserActions and TopBar responsive**
  - Stack/popover behavior for user actions on small screens
  - Compact branding

- [ ] **Step 4: Run tests and verify**
  - Test on 375px, 768px, 1280px viewports

- [ ] **Step 5: Commit**
  ```bash
  git add -A && git commit -m "feat: responsive mobile layout with slide-out sidenav"
  ```

---

### Task 3: Accessibility Audit

**Purpose:** Ensure keyboard navigation, screen reader support, focus management.

**Files:**
- Modify: All components in `src/shell/components/`
- Modify: `src/shell/layouts/`
- Modify: `tests/e2e.py` — add a11y tests

- [ ] **Step 1: Add ARIA attributes**
  - `role`, `aria-label`, `aria-expanded` on SideNav, dropdowns, dialogs
  - `aria-live` regions for dynamic content (search results, error messages)
  - Focus trap in modals (SearchBar, app launcher, app mapping)

- [ ] **Step 2: Keyboard navigation**
  - Tab order through SideNav items
  - Escape to close all popups/dropdowns
  - Arrow keys for SearchBar results

- [ ] **Step 3: Write a11y tests**
  - Tab navigation sequence
  - Escape key closes all modals
  - Screen reader text assertions

- [ ] **Step 4: Commit**
  ```bash
  git add -A && git commit -m "feat: accessibility improvements with ARIA and keyboard nav"
  ```

---

### Task 4: Performance Optimization

**Purpose:** Reduce bundle size, optimize icon loading.

**Files:**
- Modify: `src/shell/lib/icons.ts` — lazy icon extraction
- Modify: `app.config.ts` — chunk splitting
- Modify: `src/apps/ayam-goreng/config.ts` — code-split page imports

- [ ] **Step 1: Audit current bundle**
  - Run `bun run build` and analyze `.vinxi/build/client/` sizes
  - Identify the 547KB icon bundle as primary target

- [ ] **Step 2: Optimize icon bundle**
  - Switch from importing full `icons.json` to individual icon imports
  - Or use dynamic import for the icon data

- [ ] **Step 3: Code-split app pages**
  - Use `lazy()` from SolidJS for per-app page components
  - Only load Ayam Goreng pages when navigating to `/ayam-goreng/*`

- [ ] **Step 4: Verify and commit**
  ```bash
  bun run build  # Check new bundle sizes
  git add -A && git commit -m "perf: reduce icon bundle and code-split app pages"
  ```

---

### Task 5: Icon Bundle Individual Imports

**Purpose:** Replace the ~547KB full lucide JSON import with individual icon imports.

**Files:**
- Modify: `src/shell/lib/icons.ts` — import individual icons from `@iconify-icons/lucide`
- Add: Individual icon files as needed

- [ ] **Step 1: Install individual icon package**
  ```bash
  bun add @iconify-icons/lucide
  ```

- [ ] **Step 2: Rewrite `icons.ts` to import individually**
  - Replace `import lucideFull from "@iconify-json/lucide/icons.json"`
  - Import each icon individually: `import shield from "@iconify-icons/lucide/shield"`
  - Build registry from individual imports

- [ ] **Step 3: Verify all icons still render**
  - Run `bun run build`
  - Run all e2e tests

- [ ] **Step 4: Commit**
  ```bash
  git add -A && git commit -m "perf: switch to individual lucide icon imports"
  ```

---

## Deferred / Out of Scope

- Real auth backend (SSO, LDAP, OAuth)
- Email sending for forgot-password/register
- Server-side persistence (database)
- CI/CD pipeline
- Production deployment configuration
- Internationalization (i18n) — language selector exists but is UI-only
- Rate limiting / security headers

# All 27 Apps — Full UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create unique, domain-specific UI designs for all 27 apps using shared reusable components.

**Architecture:** Build a shared UI kit first (StatCard, PageHeader, DataTable, etc.), then create per-app directories under `src/apps/<slug>/` with configs, public pages, and private pages. Each app gets a unique dashboard, 5-8 feature pages, and public landing. Route handlers dispatch to app-specific components via CUSTOM maps.

**Tech Stack:** SolidJS (solid-js), SolidStart 1.x, Tailwind CSS v4, @iconify/lucide, AppIcon inline SVG component.

---

## App Categories & Page Structure

### Category A: Scanner/Reporter (2 apps)
- **share-insight**: Dashboard, Scans, Folders, Permissions, Reports
- **base-insight**: Dashboard, Scans, Benchmarks, Reports

### Category B: Server Management (2 apps)
- **middle-hub**: Dashboard, Servers, Deployments, Configurations
- **web-hub**: Dashboard, Servers, Virtual Hosts, SSL Status

### Category C: Security (3 apps)
- **cert-hub**: Dashboard, Certificates, Key Store, CSR Generator
- **secret-hub**: Dashboard, Secrets, Keys, Policies
- **patch-hub**: Dashboard, Vulnerabilities, Patches, Deployments

### Category D: Operations (5 apps)
- **auto-hub**: Dashboard, Jobs, Scripts, Schedules
- **software-hub**: Dashboard, Inventory, Repositories, Updates
- **ticket-hub**: Dashboard, Tickets, Queue, Reports
- **metrics-hub**: Dashboard, Monitors, Alerts, Dashboards
- **log-hub**: Dashboard, Logs, Searches, Alerts

### Category E: Infrastructure (5 apps)
- **virtual-hub**: Dashboard, VMs, Clusters, Templates, Snapshots
- **ip-hub**: Dashboard, IP Addresses, DNS Records, DHCP Scopes
- **dr-hub**: Dashboard, Plans, Runbooks, Tests
- **keep-hub**: Dashboard, Backups, Policies, Recovery
- **send-hub**: Dashboard, Transfers, Queue, Policies

### Category F: Asset & Access (2 apps)
- **asset-hub**: Dashboard, Assets, Licenses, Capacity
- **user-hub**: Dashboard, Users, Groups, Policies

### Category G: Remote & Runtime (2 apps)
- **remote-hub**: Dashboard, Sessions, Machines, Policies
- **runtime-hub**: Dashboard, Environments, Deployments, Configs

### Category H: Utilities (6 apps)
- **doc-hub**: Dashboard, Templates, Documents, Generator
- **any-gen**: Dashboard, Generators, Presets, History
- **lucky-hub**: Dashboard, Events, Participants, Results
- **time-hub**: Dashboard, World Clock, Stopwatch, Timer
- **event-hub**: Dashboard, Events, Calendar, Reminders
- **mark-hub**: Dashboard, Files, Editor, Preview

---

## File Structure

```
src/
├── shell/
│   ├── components/
│   │   ├── ui/                         # NEW — Shared UI Kit
│   │   │   ├── StatCard.tsx            # Stat card with icon, value, label, color
│   │   │   ├── PageHeader.tsx          # Title + description + optional actions
│   │   │   ├── DataTable.tsx           # Searchable table with column headers
│   │   │   ├── StatusBadge.tsx         # Colored status pill
│   │   │   ├── FilterTabs.tsx          # Tab-based filter bar
│   │   │   ├── SearchInput.tsx         # Search input with icon
│   │   │   ├── EmptyState.tsx          # Empty state with icon + message
│   │   │   ├── ActionGrid.tsx          # Grid of action buttons
│   │   │   ├── ActivityFeed.tsx        # Timeline of activity items
│   │   │   ├── CardGrid.tsx            # Responsive card grid with links
│   │   │   ├── FormField.tsx           # Form input with label
│   │   │   └── ToggleSwitch.tsx        # Toggle switch component
│   │   ├── AppHeader.tsx               # (existing)
│   │   ├── PublicNav.tsx               # (existing)
│   │   ├── SearchBar.tsx               # (existing)
│   │   ├── SideNav.tsx                 # (existing)
│   │   └── UserActions.tsx             # (existing)
├── apps/
│   ├── <slug>/                         # NEW for each of 27 apps
│   │   ├── config.ts                   # Nav, search, branding
│   │   ├── private/
│   │   │   ├── dashboard.tsx           # Unique dashboard
│   │   │   └── ...                     # 2-4 feature pages
│   │   └── public/
│   │       ├── landing.tsx             # Unique public landing
│   │       └── ...                     # Optional public pages
│   ├── registry.ts                     # Update to import all configs
│   └── types.ts                        # (existing)
├── routes/[app]/
│   ├── public/index.tsx                # Update CUSTOM map
│   ├── private/index.tsx               # Update CUSTOM map
│   └── ...                             # (existing route handlers)
```

---

## Task Breakdown

### Task 1: Shared UI Kit — StatCard & PageHeader

**Files:**
- Create: `src/shell/components/ui/StatCard.tsx`
- Create: `src/shell/components/ui/PageHeader.tsx`

**StatCard** — Extract from ayam-goreng dashboard pattern:
- Props: `label`, `value`, `icon`, `color`, optional `trend`
- Renders: icon in colored box + value + label
- Supports hover pulse dot

**PageHeader** — Extract common heading pattern:
- Props: `title`, `description`, `icon`, `iconColor`, optional `actions` slot
- Renders: optional back link + icon + title + description + actions

### Task 2: Shared UI Kit — DataTable, StatusBadge, SearchInput

**Files:**
- Create: `src/shell/components/ui/DataTable.tsx`
- Create: `src/shell/components/ui/StatusBadge.tsx`
- Create: `src/shell/components/ui/SearchInput.tsx`

**DataTable** — Generic table with search:
- Props: `columns` (array of {key, label, render?}), `data`, `searchable`, `searchPlaceholder`
- Built-in search filtering across all string fields
- Responsive: card layout on mobile, table on desktop

**StatusBadge** — Colored pill:
- Props: `text`, `color`
- Renders: inline badge with background tint

**SearchInput** — Search input with icon:
- Props: `value`, `onInput`, `placeholder`
- Renders: input with search icon

### Task 3: Shared UI Kit — FilterTabs, EmptyState, ActionGrid, ActivityFeed

**Files:**
- Create: `src/shell/components/ui/FilterTabs.tsx`
- Create: `src/shell/components/ui/EmptyState.tsx`
- Create: `src/shell/components/ui/ActionGrid.tsx`
- Create: `src/shell/components/ui/ActivityFeed.tsx`

### Task 4: Shared UI Kit — CardGrid, FormField, ToggleSwitch

**Files:**
- Create: `src/shell/components/ui/CardGrid.tsx`
- Create: `src/shell/components/ui/FormField.tsx`
- Create: `src/shell/components/ui/ToggleSwitch.tsx`

### Task 5: Category A — Share-Insight & Base-Insight

**Files per app:**
- Create: `src/apps/<slug>/config.ts`
- Create: `src/apps/<slug>/public/landing.tsx`
- Create: `src/apps/<slug>/private/dashboard.tsx`
- Create: `src/apps/<slug>/private/scans.tsx`
- Create: `src/apps/<slug>/private/reports.tsx`
- Plus domain-specific: Folders, Permissions (share-insight), Benchmarks (base-insight)

### Task 6: Category B — Middle-Hub & Web-Hub

Same structure: config + public landing + private dashboard + 3-4 feature pages.

### Task 7: Category C — Cert-Hub, Secret-Hub, Patch-Hub

### Task 8: Category D — Auto-Hub, Software-Hub, Ticket-Hub, Metrics-Hub, Log-Hub

### Task 9: Category E — Virtual-Hub, IP-Hub, DR-Hub, Keep-Hub, Send-Hub

### Task 10: Category F — Asset-Hub, User-Hub

### Task 11: Category G — Remote-Hub, Runtime-Hub

### Task 12: Category H — Doc-Hub, Any-Gen, Lucky-Hub, Time-Hub, Event-Hub, Mark-Hub

### Task 13: Wire Everything Up

**Files:**
- Modify: `src/apps/registry.ts` — Import all 27 app configs
- Modify: `src/routes/[app]/public/index.tsx` — Add all apps to CUSTOM map
- Modify: `src/routes/[app]/private/index.tsx` — Add all apps to CUSTOM map
- Add route files for any new sub-routes (e.g., `[app]/private/scans.tsx`)

### Task 14: Update Route Handlers for Feature Pages

Each app's feature pages need route handlers. Two approaches:
- **Generic route handlers**: `[app]/private/[...slug].tsx` catch-all that delegates to app-specific components
- **Per-feature route files**: Individual route files per feature page

Preferred: Generic catch-all approach to avoid creating 100+ route files.

### Task 15: Build & Test

- Run `bun run build`
- Run `python3 tests/e2e.py`
- Run `python3 tests/e2e_sample.py`
- Verify all routes render in browser

---

## Design Principles

1. **Each app is unique** — different mock data, stats, features, terminology
2. **Consistent via shared kit** — all use StatCard, PageHeader, DataTable etc.
3. **Domain-specific language** — Cert-Hub talks certificates, Ticket-Hub talks tickets
4. **No real functionality** — this is a design sandbox, all data is mock
5. **Self-contained** — each app under `src/apps/<slug>/` is extractable
6. **Match ayam-goreng quality** — same level of polish and detail as the reference app

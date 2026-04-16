# Contributing to Kentut SuperApp

Thank you for your interest in contributing. This guide covers the essentials for getting started.

## Prerequisites

- **Node.js** >= 22
- **[bun](https://bun.sh)** (the only supported package manager)

## Setup

```bash
git clone <repo-url>
cd uiden
bun install
bun run dev
```

The dev server starts at `http://localhost:3000`.

## Development Workflow

### Commands

| Command             | Description                              |
|---------------------|------------------------------------------|
| `bun run dev`       | Start dev server with HMR                |
| `bun run build`     | Production build (outputs to `.output/`) |
| `bun run preview`   | Preview the production build             |

### Adding a New App

1. Add the app entry to the `APPS` array in `src/lib/apps.ts`:

```ts
{ name: "My App", icon: "lucide:my-icon", desc: "Short description" }
```

2. If using a new Lucide icon, add its name to `USED_LUCIDE_ICONS` in `src/lib/icons.ts`.

3. Verify the icon exists in the Lucide set — check `node_modules/@iconify-json/lucide/icons.json`.

### Adding a New Route

Create a file in `src/routes/` following SolidStart file-based routing:

- `src/routes/about.tsx` → `/about`
- `src/routes/settings/index.tsx` → `/settings`
- `src/routes/settings/profile.tsx` → `/settings/profile`

### Adding a New Icon

1. Find the icon name in the [Lucide icon set](https://lucide.dev/icons/).
2. Add the icon name (without the `lucide:` prefix) to the `USED_LUCIDE_ICONS` array in `src/lib/icons.ts`.
3. Use it in components: `<AppIcon icon="lucide:icon-name" size={20} />`

**Important:** Lucide v1.2.x renamed several icons. See AGENTS.md for the full rename list.

## Code Conventions

### SolidJS, Not React

This project uses SolidJS. Key differences from React:

- Use `createSignal` instead of `useState`
- Use `createEffect` instead of `useEffect`
- Use `createMemo` instead of `useMemo`
- Use `onMount` instead of `useEffect(() => {}, [])`
- Use `For` component instead of `.map()` for lists
- Use `Show` component instead of ternary for conditional rendering
- Signals are functions: `const [count, setCount] = createSignal(0)` — read as `count()`, not `count`

### Styling

- **Tailwind CSS v4** with custom design tokens defined in `src/app.css` under `@theme`
- Use CSS custom properties for colors: `bg-surface-0`, `text-text-primary`, `text-brand`, etc.
- Dark mode is default; light mode overrides via `html.light` class
- Use `classList` prop for conditional classes (not string interpolation)

### Component Structure

- One component per file
- Default exports for page components
- Named exports for context providers and utilities
- Path alias: import from `~/lib/...` or `~/components/...` (not relative paths across directories)

### Icons

- Always use the `AppIcon` component — never import SVG files directly
- The `AppIcon` renders inline SVG at build time via `@iconify/utils`
- Icons are SSR-safe (no DOM API calls)

## Commit Guidelines

- Write clear, descriptive commit messages
- Focus on the "why" rather than the "what"
- Keep commits atomic — one logical change per commit

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Verify the build succeeds: `bun run build`
4. Open a pull request with a description of the changes

## Architecture Notes

### Auth

Auth is client-side only with 4 dummy users. The `AuthProvider` wraps the app and provides:

- `useAuth()` — returns `{ user, login, logout, isLoggedIn, error }`
- Session persists in `sessionStorage` (browser-lifetime)

### Theme

The `ThemeProvider` wraps the app and provides:

- `useTheme()` — returns `{ theme, toggle }`
- Theme persists in `localStorage`

### App Colors

App tile colors use the golden angle algorithm for maximum hue separation:

```ts
const h = (idx * 137.508) % 360; // hue
```

This ensures 100 apps have visually distinct colors without manual assignment.

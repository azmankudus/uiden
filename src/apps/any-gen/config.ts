import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/any-gen/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/any-gen/public" },
  { label: "About", icon: "lucide:info", path: "/any-gen/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/any-gen/private" },
  { label: "Generators", icon: "lucide:sparkles", path: "/any-gen/private/generators" },
  { label: "Presets", icon: "lucide:bookmark", path: "/any-gen/private/presets" },
  { label: "History", icon: "lucide:clock", path: "/any-gen/private/history" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/any-gen/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/any-gen/public", icon: "lucide:book-open", section: "Pages", description: "Text generation toolkit docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/any-gen/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Generators", path: "/any-gen/private/generators", icon: "lucide:sparkles", section: "Tools", description: "Browse text generators" },
  { label: "Presets", path: "/any-gen/private/presets", icon: "lucide:bookmark", section: "Management", description: "Manage generator presets" },
  { label: "History", path: "/any-gen/private/history", icon: "lucide:clock", section: "Logs", description: "View generation history" },
];

export default {
  slug: "any-gen",
  name: "Any-Gen",
  icon: "lucide:sparkles",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

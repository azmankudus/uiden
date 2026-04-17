import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/asset-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/asset-hub/public" },
  { label: "About", icon: "lucide:info", path: "/asset-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/asset-hub/private" },
  { label: "Assets", icon: "lucide:hard-drive", path: "/asset-hub/private/assets" },
  { label: "Licenses", icon: "lucide:key-round", path: "/asset-hub/private/licenses" },
  { label: "Capacity", icon: "lucide:bar-chart-3", path: "/asset-hub/private/capacity" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/asset-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/asset-hub/public", icon: "lucide:book-open", section: "Pages", description: "Asset & capacity management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/asset-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Assets", path: "/asset-hub/private/assets", icon: "lucide:hard-drive", section: "Management", description: "Track and manage hardware assets" },
  { label: "Licenses", path: "/asset-hub/private/licenses", icon: "lucide:key-round", section: "Management", description: "Software license inventory" },
  { label: "Capacity", path: "/asset-hub/private/capacity", icon: "lucide:bar-chart-3", section: "Planning", description: "Resource capacity planning" },
];

export default {
  slug: "asset-hub",
  name: "Asset-Hub",
  icon: "lucide:warehouse",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

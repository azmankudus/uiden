import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/software-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/software-hub/public" },
  { label: "About", icon: "lucide:info", path: "/software-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/software-hub/private" },
  { label: "Inventory", icon: "lucide:package", path: "/software-hub/private/inventory" },
  { label: "Repositories", icon: "lucide:warehouse", path: "/software-hub/private/repositories" },
  { label: "Updates", icon: "lucide:refresh-cw", path: "/software-hub/private/updates" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/software-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/software-hub/public", icon: "lucide:book-open", section: "Pages", description: "Software lifecycle management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/software-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Inventory", path: "/software-hub/private/inventory", icon: "lucide:package", section: "Management", description: "Software inventory and catalog" },
  { label: "Repositories", path: "/software-hub/private/repositories", icon: "lucide:warehouse", section: "Management", description: "Package repositories and mirrors" },
  { label: "Updates", path: "/software-hub/private/updates", icon: "lucide:refresh-cw", section: "Operations", description: "Available updates and patches" },
];

export default {
  slug: "software-hub",
  name: "Software-Hub",
  icon: "lucide:package",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

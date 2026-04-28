import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/runtime-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/runtime-hub/public" },
  { label: "About", icon: "lucide:info", path: "/runtime-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/runtime-hub/private" },
  { label: "Environments", icon: "lucide:layers", path: "/runtime-hub/private/environments" },
  { label: "Deployments", icon: "lucide:rocket", path: "/runtime-hub/private/deployments" },
  { label: "Configs", icon: "lucide:settings", path: "/runtime-hub/private/configs" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/runtime-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/runtime-hub/public", icon: "lucide:book-open", section: "Pages", description: "Runtime environment management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/runtime-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Environments", path: "/runtime-hub/private/environments", icon: "lucide:layers", section: "Management", description: "Manage runtime environments" },
  { label: "Deployments", path: "/runtime-hub/private/deployments", icon: "lucide:rocket", section: "Operations", description: "Track deployment history" },
  { label: "Configs", path: "/runtime-hub/private/configs", icon: "lucide:settings", section: "Configuration", description: "Manage environment configurations" },
];

export default {
  slug: "runtime-hub",
  name: "Runtime-Hub",
  icon: "lucide:activity",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

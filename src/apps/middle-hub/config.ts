import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Documentation", icon: "lucide:book-open", path: "/middle-hub/public" },
  { label: "Help", icon: "lucide:circle-question-mark", path: "/middle-hub/public/help" },
  { label: "About", icon: "lucide:info", path: "/middle-hub/public/about" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/middle-hub/private" },
  { label: "Servers", icon: "lucide:server", path: "/middle-hub/private/servers" },
  { label: "Deployments", icon: "lucide:rocket", path: "/middle-hub/private/deployments" },
  { label: "Configurations", icon: "lucide:settings", path: "/middle-hub/private/configurations" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/middle-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/middle-hub/public", icon: "lucide:book-open", section: "Pages", description: "Guides and references" },
  { label: "Help", path: "/middle-hub/public/help", icon: "lucide:circle-question-mark", section: "Pages", description: "Help and FAQ" },
  { label: "About", path: "/middle-hub/public/about", icon: "lucide:info", section: "Pages", description: "About Middle-Hub" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/middle-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Servers", path: "/middle-hub/private/servers", icon: "lucide:server", section: "Management", description: "Manage Java application servers" },
  { label: "Deployments", path: "/middle-hub/private/deployments", icon: "lucide:rocket", section: "Management", description: "Application deployments" },
  { label: "Configurations", path: "/middle-hub/private/configurations", icon: "lucide:settings", section: "Management", description: "Server configurations" },
  { label: "App Launcher", path: "/apps", icon: "lucide:layout-grid", section: "Navigation" },
];

export default {
  slug: "middle-hub",
  name: "Middle-Hub",
  icon: "lucide:server",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

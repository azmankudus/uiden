import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/remote-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/remote-hub/public" },
  { label: "About", icon: "lucide:info", path: "/remote-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/remote-hub/private" },
  { label: "Sessions", icon: "lucide:monitor", path: "/remote-hub/private/sessions" },
  { label: "Machines", icon: "lucide:server", path: "/remote-hub/private/machines" },
  { label: "Policies", icon: "lucide:shield", path: "/remote-hub/private/policies" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/remote-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/remote-hub/public", icon: "lucide:book-open", section: "Pages", description: "Remote access management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/remote-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Sessions", path: "/remote-hub/private/sessions", icon: "lucide:monitor", section: "Management", description: "View active and past remote sessions" },
  { label: "Machines", path: "/remote-hub/private/machines", icon: "lucide:server", section: "Management", description: "Manage registered machines" },
  { label: "Policies", path: "/remote-hub/private/policies", icon: "lucide:shield", section: "Governance", description: "Configure remote access policies" },
];

export default {
  slug: "remote-hub",
  name: "Remote-Hub",
  icon: "lucide:monitor",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

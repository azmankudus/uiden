import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/secret-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/secret-hub/public" },
  { label: "About", icon: "lucide:info", path: "/secret-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/secret-hub/private" },
  { label: "Secrets", icon: "lucide:lock", path: "/secret-hub/private/secrets" },
  { label: "Keys", icon: "lucide:key-round", path: "/secret-hub/private/keys" },
  { label: "Policies", icon: "lucide:shield-check", path: "/secret-hub/private/policies" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/secret-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/secret-hub/public", icon: "lucide:book-open", section: "Pages", description: "Secret management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/secret-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Secrets", path: "/secret-hub/private/secrets", icon: "lucide:lock", section: "Management", description: "View and manage secrets" },
  { label: "Keys", path: "/secret-hub/private/keys", icon: "lucide:key-round", section: "Management", description: "Manage encryption keys" },
  { label: "Policies", path: "/secret-hub/private/policies", icon: "lucide:shield-check", section: "Governance", description: "Configure access and rotation policies" },
];

export default {
  slug: "secret-hub",
  name: "Secret-Hub",
  icon: "lucide:key-round",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

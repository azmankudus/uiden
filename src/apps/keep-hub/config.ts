import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/keep-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/keep-hub/public" },
  { label: "About", icon: "lucide:info", path: "/keep-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/keep-hub/private" },
  { label: "Backups", icon: "lucide:hard-drive", path: "/keep-hub/private/backups" },
  { label: "Policies", icon: "lucide:shield", path: "/keep-hub/private/policies" },
  { label: "Recovery", icon: "lucide:refresh-cw", path: "/keep-hub/private/recovery" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/keep-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/keep-hub/public", icon: "lucide:book-open", section: "Pages", description: "Backup & recovery docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/keep-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Backups", path: "/keep-hub/private/backups", icon: "lucide:hard-drive", section: "Management", description: "View backup jobs and status" },
  { label: "Policies", path: "/keep-hub/private/policies", icon: "lucide:shield", section: "Management", description: "Backup policy management" },
  { label: "Recovery", path: "/keep-hub/private/recovery", icon: "lucide:refresh-cw", section: "Management", description: "Data recovery operations" },
];

export default {
  slug: "keep-hub",
  name: "Keep-Hub",
  icon: "lucide:hard-drive",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

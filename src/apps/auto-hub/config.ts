import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/auto-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/auto-hub/public" },
  { label: "About", icon: "lucide:info", path: "/auto-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/auto-hub/private" },
  { label: "Jobs", icon: "lucide:play", path: "/auto-hub/private/jobs" },
  { label: "Scripts", icon: "lucide:file-code", path: "/auto-hub/private/scripts" },
  { label: "Schedules", icon: "lucide:clock", path: "/auto-hub/private/schedules" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/auto-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/auto-hub/public", icon: "lucide:book-open", section: "Pages", description: "Automation & batch processing docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/auto-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Jobs", path: "/auto-hub/private/jobs", icon: "lucide:play", section: "Operations", description: "View and manage automation jobs" },
  { label: "Scripts", path: "/auto-hub/private/scripts", icon: "lucide:file-code", section: "Library", description: "Script library and management" },
  { label: "Schedules", path: "/auto-hub/private/schedules", icon: "lucide:clock", section: "Operations", description: "Job scheduling and cron management" },
];

export default {
  slug: "auto-hub",
  name: "Auto-Hub",
  icon: "lucide:play",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

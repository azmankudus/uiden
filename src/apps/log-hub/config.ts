import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/log-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/log-hub/public" },
  { label: "About", icon: "lucide:info", path: "/log-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/log-hub/private" },
  { label: "Logs", icon: "lucide:scroll-text", path: "/log-hub/private/logs" },
  { label: "Searches", icon: "lucide:search", path: "/log-hub/private/searches" },
  { label: "Alerts", icon: "lucide:bell-ring", path: "/log-hub/private/alerts" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/log-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/log-hub/public", icon: "lucide:book-open", section: "Pages", description: "Centralized log management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/log-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Logs", path: "/log-hub/private/logs", icon: "lucide:scroll-text", section: "Logs", description: "Browse and search log entries" },
  { label: "Searches", path: "/log-hub/private/searches", icon: "lucide:search", section: "Tools", description: "Saved searches and queries" },
  { label: "Alerts", path: "/log-hub/private/alerts", icon: "lucide:bell-ring", section: "Monitoring", description: "Log-based alert rules" },
];

export default {
  slug: "log-hub",
  name: "Log-Hub",
  icon: "lucide:scroll-text",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

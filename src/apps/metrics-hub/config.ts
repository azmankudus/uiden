import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/metrics-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/metrics-hub/public" },
  { label: "About", icon: "lucide:info", path: "/metrics-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/metrics-hub/private" },
  { label: "Monitors", icon: "lucide:activity", path: "/metrics-hub/private/monitors" },
  { label: "Alerts", icon: "lucide:bell-ring", path: "/metrics-hub/private/alerts" },
  { label: "Dashboards", icon: "lucide:gauge", path: "/metrics-hub/private/dashboards" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/metrics-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/metrics-hub/public", icon: "lucide:book-open", section: "Pages", description: "Infrastructure observability docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/metrics-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Monitors", path: "/metrics-hub/private/monitors", icon: "lucide:activity", section: "Monitoring", description: "System and service monitors" },
  { label: "Alerts", path: "/metrics-hub/private/alerts", icon: "lucide:bell-ring", section: "Monitoring", description: "Active alerts and incidents" },
  { label: "Dashboards", path: "/metrics-hub/private/dashboards", icon: "lucide:gauge", section: "Visualization", description: "Custom monitoring dashboards" },
];

export default {
  slug: "metrics-hub",
  name: "Metrics-Hub",
  icon: "lucide:bar-chart-3",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

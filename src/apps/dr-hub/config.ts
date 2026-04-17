import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/dr-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/dr-hub/public" },
  { label: "About", icon: "lucide:info", path: "/dr-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/dr-hub/private" },
  { label: "Plans", icon: "lucide:scroll-text", path: "/dr-hub/private/plans" },
  { label: "Runbooks", icon: "lucide:book-open", path: "/dr-hub/private/runbooks" },
  { label: "Tests", icon: "lucide:flask-conical", path: "/dr-hub/private/tests" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/dr-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/dr-hub/public", icon: "lucide:book-open", section: "Pages", description: "Disaster recovery docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/dr-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Plans", path: "/dr-hub/private/plans", icon: "lucide:scroll-text", section: "Management", description: "DR plan management" },
  { label: "Runbooks", path: "/dr-hub/private/runbooks", icon: "lucide:book-open", section: "Management", description: "Automated recovery runbooks" },
  { label: "Tests", path: "/dr-hub/private/tests", icon: "lucide:flask-conical", section: "Management", description: "DR test execution history" },
];

export default {
  slug: "dr-hub",
  name: "DR-Hub",
  icon: "lucide:triangle-alert",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

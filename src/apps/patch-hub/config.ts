import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/patch-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/patch-hub/public" },
  { label: "About", icon: "lucide:info", path: "/patch-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/patch-hub/private" },
  { label: "Vulnerabilities", icon: "lucide:triangle-alert", path: "/patch-hub/private/vulnerabilities" },
  { label: "Patches", icon: "lucide:package", path: "/patch-hub/private/patches" },
  { label: "Deployments", icon: "lucide:rocket", path: "/patch-hub/private/deployments" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/patch-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/patch-hub/public", icon: "lucide:book-open", section: "Pages", description: "Vulnerability & patch management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/patch-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Vulnerabilities", path: "/patch-hub/private/vulnerabilities", icon: "lucide:triangle-alert", section: "Security", description: "Track CVEs and vulnerabilities" },
  { label: "Patches", path: "/patch-hub/private/patches", icon: "lucide:package", section: "Security", description: "Browse and apply patches" },
  { label: "Deployments", path: "/patch-hub/private/deployments", icon: "lucide:rocket", section: "Operations", description: "Track patch deployments" },
];

export default {
  slug: "patch-hub",
  name: "Patch-Hub",
  icon: "lucide:shield",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

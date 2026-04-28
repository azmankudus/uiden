import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/send-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/send-hub/public" },
  { label: "About", icon: "lucide:info", path: "/send-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/send-hub/private" },
  { label: "Transfers", icon: "lucide:send", path: "/send-hub/private/transfers" },
  { label: "Queue", icon: "lucide:list-ordered", path: "/send-hub/private/queue" },
  { label: "Policies", icon: "lucide:shield", path: "/send-hub/private/policies" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/send-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/send-hub/public", icon: "lucide:book-open", section: "Pages", description: "Managed file transfer docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/send-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Transfers", path: "/send-hub/private/transfers", icon: "lucide:send", section: "Management", description: "Active and completed transfers" },
  { label: "Queue", path: "/send-hub/private/queue", icon: "lucide:list-ordered", section: "Management", description: "Scheduled transfer queue" },
  { label: "Policies", path: "/send-hub/private/policies", icon: "lucide:shield", section: "Management", description: "Transfer policy configuration" },
];

export default {
  slug: "send-hub",
  name: "Send-Hub",
  icon: "lucide:send",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

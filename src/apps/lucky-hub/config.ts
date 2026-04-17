import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/lucky-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/lucky-hub/public" },
  { label: "About", icon: "lucide:info", path: "/lucky-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/lucky-hub/private" },
  { label: "Events", icon: "lucide:calendar", path: "/lucky-hub/private/events" },
  { label: "Participants", icon: "lucide:users", path: "/lucky-hub/private/participants" },
  { label: "Results", icon: "lucide:trophy", path: "/lucky-hub/private/results" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/lucky-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/lucky-hub/public", icon: "lucide:book-open", section: "Pages", description: "Lucky draw system docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/lucky-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Events", path: "/lucky-hub/private/events", icon: "lucide:calendar", section: "Management", description: "Manage lucky draw events" },
  { label: "Participants", path: "/lucky-hub/private/participants", icon: "lucide:users", section: "Management", description: "View and manage participants" },
  { label: "Results", path: "/lucky-hub/private/results", icon: "lucide:trophy", section: "Results", description: "View draw results" },
];

export default {
  slug: "lucky-hub",
  name: "Lucky-Hub",
  icon: "lucide:dice-5",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/time-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/time-hub/public" },
  { label: "About", icon: "lucide:info", path: "/time-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/time-hub/private" },
  { label: "World Clock", icon: "lucide:globe", path: "/time-hub/private/world-clock" },
  { label: "Stopwatch", icon: "lucide:timer", path: "/time-hub/private/stopwatch" },
  { label: "Timer", icon: "lucide:clock", path: "/time-hub/private/timer" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/time-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/time-hub/public", icon: "lucide:book-open", section: "Pages", description: "Time management tools docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/time-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "World Clock", path: "/time-hub/private/world-clock", icon: "lucide:globe", section: "Tools", description: "View world clocks" },
  { label: "Stopwatch", path: "/time-hub/private/stopwatch", icon: "lucide:timer", section: "Tools", description: "Stopwatch with lap times" },
  { label: "Timer", path: "/time-hub/private/timer", icon: "lucide:clock", section: "Tools", description: "Countdown timers" },
];

export default {
  slug: "time-hub",
  name: "Time-Hub",
  icon: "lucide:clock",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

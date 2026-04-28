import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/event-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/event-hub/public" },
  { label: "About", icon: "lucide:info", path: "/event-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/event-hub/private" },
  { label: "Events", icon: "lucide:calendar", path: "/event-hub/private/events" },
  { label: "Calendar", icon: "lucide:calendar-days", path: "/event-hub/private/calendar" },
  { label: "Reminders", icon: "lucide:bell", path: "/event-hub/private/reminders" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/event-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/event-hub/public", icon: "lucide:book-open", section: "Pages", description: "Event management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/event-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Events", path: "/event-hub/private/events", icon: "lucide:calendar", section: "Management", description: "Manage events" },
  { label: "Calendar", path: "/event-hub/private/calendar", icon: "lucide:calendar-days", section: "View", description: "Calendar view of events" },
  { label: "Reminders", path: "/event-hub/private/reminders", icon: "lucide:bell", section: "Management", description: "Manage event reminders" },
];

export default {
  slug: "event-hub",
  name: "Event-Hub",
  icon: "lucide:calendar",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

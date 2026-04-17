import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/ticket-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/ticket-hub/public" },
  { label: "About", icon: "lucide:info", path: "/ticket-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/ticket-hub/private" },
  { label: "Tickets", icon: "lucide:ticket", path: "/ticket-hub/private/tickets" },
  { label: "Queue", icon: "lucide:inbox", path: "/ticket-hub/private/queue" },
  { label: "Reports", icon: "lucide:bar-chart-3", path: "/ticket-hub/private/reports" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/ticket-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/ticket-hub/public", icon: "lucide:book-open", section: "Pages", description: "Service management and ticketing docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/ticket-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Tickets", path: "/ticket-hub/private/tickets", icon: "lucide:ticket", section: "Management", description: "View and manage all tickets" },
  { label: "Queue", path: "/ticket-hub/private/queue", icon: "lucide:inbox", section: "Operations", description: "Ticket queue and assignment" },
  { label: "Reports", path: "/ticket-hub/private/reports", icon: "lucide:bar-chart-3", section: "Analytics", description: "Service reports and analytics" },
];

export default {
  slug: "ticket-hub",
  name: "Ticket-Hub",
  icon: "lucide:ticket",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

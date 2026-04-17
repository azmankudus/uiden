import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Documentation", icon: "lucide:book-open", path: "/web-hub/public" },
  { label: "Help", icon: "lucide:circle-question-mark", path: "/web-hub/public/help" },
  { label: "Contact", icon: "lucide:phone", path: "/web-hub/public/contact" },
  { label: "About", icon: "lucide:info", path: "/web-hub/public/about" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/web-hub/private" },
  { label: "Servers", icon: "lucide:server", path: "/web-hub/private/servers" },
  { label: "Virtual Hosts", icon: "lucide:globe", path: "/web-hub/private/virtual-hosts" },
  { label: "SSL Status", icon: "lucide:shield", path: "/web-hub/private/ssl-status" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/web-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/web-hub/public", icon: "lucide:book-open", section: "Pages", description: "Guides and references" },
  { label: "Help", path: "/web-hub/public/help", icon: "lucide:circle-question-mark", section: "Pages", description: "Help and FAQ" },
  { label: "Contact", path: "/web-hub/public/contact", icon: "lucide:phone", section: "Pages", description: "Get in touch" },
  { label: "About", path: "/web-hub/public/about", icon: "lucide:info", section: "Pages", description: "About Web-Hub" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/web-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Servers", path: "/web-hub/private/servers", icon: "lucide:server", section: "Management", description: "Manage web servers" },
  { label: "Virtual Hosts", path: "/web-hub/private/virtual-hosts", icon: "lucide:globe", section: "Management", description: "Virtual host configuration" },
  { label: "SSL Status", path: "/web-hub/private/ssl-status", icon: "lucide:shield", section: "Management", description: "SSL certificate status" },
  { label: "App Launcher", path: "/landing", icon: "lucide:layout-grid", section: "Navigation" },
];

export default {
  slug: "web-hub",
  name: "Web-Hub",
  icon: "lucide:globe",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

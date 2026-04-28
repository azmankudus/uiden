import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/ip-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/ip-hub/public" },
  { label: "About", icon: "lucide:info", path: "/ip-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/ip-hub/private" },
  { label: "IP Addresses", icon: "lucide:network", path: "/ip-hub/private/ip-addresses" },
  { label: "DNS Records", icon: "lucide:globe", path: "/ip-hub/private/dns-records" },
  { label: "DHCP Scopes", icon: "lucide:server", path: "/ip-hub/private/dhcp-scopes" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/ip-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/ip-hub/public", icon: "lucide:book-open", section: "Pages", description: "Network & IP management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/ip-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "IP Addresses", path: "/ip-hub/private/ip-addresses", icon: "lucide:network", section: "Management", description: "Manage IP address inventory" },
  { label: "DNS Records", path: "/ip-hub/private/dns-records", icon: "lucide:globe", section: "Management", description: "DNS zone and record management" },
  { label: "DHCP Scopes", path: "/ip-hub/private/dhcp-scopes", icon: "lucide:server", section: "Management", description: "DHCP scope configuration" },
];

export default {
  slug: "ip-hub",
  name: "IP-Hub",
  icon: "lucide:network",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

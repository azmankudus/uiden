import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/cert-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/cert-hub/public" },
  { label: "About", icon: "lucide:info", path: "/cert-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/cert-hub/private" },
  { label: "Certificates", icon: "lucide:badge-check", path: "/cert-hub/private/certificates" },
  { label: "Key Store", icon: "lucide:key-round", path: "/cert-hub/private/key-store" },
  { label: "CSR Generator", icon: "lucide:file-pen", path: "/cert-hub/private/csr-generator" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/cert-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/cert-hub/public", icon: "lucide:book-open", section: "Pages", description: "SSL certificate management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/cert-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Certificates", path: "/cert-hub/private/certificates", icon: "lucide:badge-check", section: "Management", description: "View and manage SSL certificates" },
  { label: "Key Store", path: "/cert-hub/private/key-store", icon: "lucide:key-round", section: "Management", description: "Manage private and public keys" },
  { label: "CSR Generator", path: "/cert-hub/private/csr-generator", icon: "lucide:file-pen", section: "Tools", description: "Generate Certificate Signing Requests" },
];

export default {
  slug: "cert-hub",
  name: "Cert-Hub",
  icon: "lucide:badge-check",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/doc-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/doc-hub/public" },
  { label: "About", icon: "lucide:info", path: "/doc-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/doc-hub/private" },
  { label: "Templates", icon: "lucide:file-text", path: "/doc-hub/private/templates" },
  { label: "Documents", icon: "lucide:file-code", path: "/doc-hub/private/documents" },
  { label: "Generator", icon: "lucide:sparkles", path: "/doc-hub/private/generator" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/doc-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/doc-hub/public", icon: "lucide:book-open", section: "Pages", description: "Document generation engine docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/doc-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Templates", path: "/doc-hub/private/templates", icon: "lucide:file-text", section: "Management", description: "Manage document templates" },
  { label: "Documents", path: "/doc-hub/private/documents", icon: "lucide:file-code", section: "Management", description: "View generated documents" },
  { label: "Generator", path: "/doc-hub/private/generator", icon: "lucide:sparkles", section: "Tools", description: "Generate new documents" },
];

export default {
  slug: "doc-hub",
  name: "Doc-Hub",
  icon: "lucide:file-text",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

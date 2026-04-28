import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Documentation", icon: "lucide:book-open", path: "/share-insight/public" },
  { label: "Help", icon: "lucide:circle-question-mark", path: "/share-insight/public/help" },
  { label: "About", icon: "lucide:info", path: "/share-insight/public/about" },
];

const NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/share-insight/private" },
  { label: "Scans", icon: "lucide:scan-text", path: "/share-insight/private/scans" },
  { label: "Folders", icon: "lucide:folder", path: "/share-insight/private/folders" },
  { label: "Permissions", icon: "lucide:shield", path: "/share-insight/private/permissions" },
  { label: "Reports", icon: "lucide:file-text", path: "/share-insight/private/reports" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/apps" },
];

function flattenNav(items: any[], section?: string) {
  const result: any[] = [];
  for (const item of items) {
    if (item.path) {
      result.push({ label: item.label, path: item.path, icon: item.icon, section: section || "General" });
    }
    if (item.children) {
      result.push(...flattenNav(item.children, item.label));
    }
  }
  return result;
}

const SEARCH_PUBLIC = [
  { label: "Home", path: "/share-insight/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/share-insight/public", icon: "lucide:book-open", section: "Pages", description: "Guides and API references" },
  { label: "Help", path: "/share-insight/public/help", icon: "lucide:circle-question-mark", section: "Pages", description: "Frequently asked questions" },
  { label: "About", path: "/share-insight/public/about", icon: "lucide:info", section: "Pages", description: "About Share-Insight" },
];

const SEARCH_PRIVATE = flattenNav(NAV);

export default {
  slug: "share-insight",
  name: "Share-Insight",
  icon: "lucide:folder-search",
  defaultRoute: "public",
  nav: NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: SEARCH_PUBLIC,
    private: SEARCH_PRIVATE,
  },
} satisfies import("../types").AppConfig;

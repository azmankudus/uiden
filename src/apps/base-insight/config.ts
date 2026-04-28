import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Documentation", icon: "lucide:book-open", path: "/base-insight/public" },
  { label: "Help", icon: "lucide:circle-question-mark", path: "/base-insight/public/help" },
  { label: "About", icon: "lucide:info", path: "/base-insight/public/about" },
];

const NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/base-insight/private" },
  { label: "Scans", icon: "lucide:scan-text", path: "/base-insight/private/scans" },
  { label: "Benchmarks", icon: "lucide:clipboard-list", path: "/base-insight/private/benchmarks" },
  { label: "Reports", icon: "lucide:file-text", path: "/base-insight/private/reports" },
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
  { label: "Home", path: "/base-insight/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/base-insight/public", icon: "lucide:book-open", section: "Pages", description: "Guides and CIS/STIG references" },
  { label: "Help", path: "/base-insight/public/help", icon: "lucide:circle-question-mark", section: "Pages", description: "Frequently asked questions" },
  { label: "About", path: "/base-insight/public/about", icon: "lucide:info", section: "Pages", description: "About Base-Insight" },
];

const SEARCH_PRIVATE = flattenNav(NAV);

export default {
  slug: "base-insight",
  name: "Base-Insight",
  icon: "lucide:shield-check",
  defaultRoute: "public",
  nav: NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: SEARCH_PUBLIC,
    private: SEARCH_PRIVATE,
  },
} satisfies import("../types").AppConfig;

import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Documentation", icon: "lucide:book-open", path: "/ayam-goreng/public" },
  { label: "Help & FAQ", icon: "lucide:circle-question-mark", path: "/ayam-goreng/public/help" },
  { label: "Contact", icon: "lucide:phone", path: "/ayam-goreng/public/contact" },
  { label: "About", icon: "lucide:info", path: "/ayam-goreng/public/about" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/ayam-goreng/private" },
  {
    label: "Analytics",
    icon: "lucide:bar-chart-3",
    children: [
      { label: "Overview", icon: "lucide:activity", path: "/ayam-goreng/private/analytics/overview" },
      { label: "Reports", icon: "lucide:file-text", path: "/ayam-goreng/private/analytics/reports" },
      { label: "Real-time", icon: "lucide:zap", path: "/ayam-goreng/private/analytics/real-time" },
    ],
  },
  {
    label: "Modules",
    icon: "lucide:boxes",
    children: [
      {
        label: "Security",
        icon: "lucide:shield",
        children: [
          { label: "Share-Insight", icon: "lucide:folder-search", path: "/ayam-goreng/private/modules/share-insight" },
          { label: "Base-Insight", icon: "lucide:shield-check", path: "/ayam-goreng/private/modules/base-insight" },
          { label: "Cert-Hub", icon: "lucide:badge-check", path: "/ayam-goreng/private/modules/cert-hub" },
          { label: "Secret-Hub", icon: "lucide:key-round", path: "/ayam-goreng/private/modules/secret-hub" },
          { label: "Patch-Hub", icon: "lucide:shield", path: "/ayam-goreng/private/modules/patch-hub" },
        ],
      },
      {
        label: "Infrastructure",
        icon: "lucide:hard-drive",
        children: [
          { label: "Middle-Hub", icon: "lucide:server", path: "/ayam-goreng/private/modules/middle-hub" },
          { label: "Web-Hub", icon: "lucide:globe", path: "/ayam-goreng/private/modules/web-hub" },
          { label: "Virtual-Hub", icon: "lucide:boxes", path: "/ayam-goreng/private/modules/virtual-hub" },
          { label: "IP-Hub", icon: "lucide:network", path: "/ayam-goreng/private/modules/ip-hub" },
          { label: "Keep-Hub", icon: "lucide:hard-drive", path: "/ayam-goreng/private/modules/keep-hub" },
        ],
      },
      {
        label: "Operations",
        icon: "lucide:activity",
        children: [
          { label: "Metrics-Hub", icon: "lucide:bar-chart-3", path: "/ayam-goreng/private/modules/metrics-hub" },
          { label: "Log-Hub", icon: "lucide:scroll-text", path: "/ayam-goreng/private/modules/log-hub" },
          { label: "Ticket-Hub", icon: "lucide:ticket", path: "/ayam-goreng/private/modules/ticket-hub" },
          { label: "Auto-Hub", icon: "lucide:play", path: "/ayam-goreng/private/modules/auto-hub" },
          { label: "Runtime-Hub", icon: "lucide:activity", path: "/ayam-goreng/private/modules/runtime-hub" },
        ],
      },
      {
        label: "Management",
        icon: "lucide:users",
        children: [
          { label: "Asset-Hub", icon: "lucide:warehouse", path: "/ayam-goreng/private/modules/asset-hub" },
          { label: "Software-Hub", icon: "lucide:package", path: "/ayam-goreng/private/modules/software-hub" },
          { label: "DR-Hub", icon: "lucide:triangle-alert", path: "/ayam-goreng/private/modules/dr-hub" },
          { label: "User-Hub", icon: "lucide:users", path: "/ayam-goreng/private/modules/user-hub" },
          { label: "Remote-Hub", icon: "lucide:monitor", path: "/ayam-goreng/private/modules/remote-hub" },
        ],
      },
      {
        label: "Utilities",
        icon: "lucide:sparkles",
        children: [
          { label: "Doc-Hub", icon: "lucide:file-text", path: "/ayam-goreng/private/modules/doc-hub" },
          { label: "Any-Gen", icon: "lucide:sparkles", path: "/ayam-goreng/private/modules/any-gen" },
          { label: "Time-Hub", icon: "lucide:clock", path: "/ayam-goreng/private/modules/time-hub" },
          { label: "Event-Hub", icon: "lucide:calendar", path: "/ayam-goreng/private/modules/event-hub" },
          { label: "Mark-Hub", icon: "lucide:file-code", path: "/ayam-goreng/private/modules/mark-hub" },
        ],
      },
    ],
  },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
  {
    label: "Administration",
    icon: "lucide:settings",
    children: [
      { label: "Users & Groups", icon: "lucide:users", path: "/ayam-goreng/private/admin/users" },
      { label: "Roles & Permissions", icon: "lucide:shield-check", path: "/ayam-goreng/private/admin/roles" },
      { label: "System Settings", icon: "lucide:settings", path: "/ayam-goreng/private/admin/settings" },
      { label: "Audit Log", icon: "lucide:scroll-text", path: "/ayam-goreng/private/admin/audit" },
      { label: "License & Billing", icon: "lucide:credit-card", path: "/ayam-goreng/private/admin" },
    ],
  },
];

function flattenNav(items: any[], section?: string) {
  const result: any[] = [];
  for (const item of items) {
    if (item.path) {
      result.push({ label: item.label, path: item.path, icon: item.icon, section: section || "General" });
    }
    if (item.children) {
      result.push(...flattenNav(item.children, item.children[0]?.path?.includes("/admin") ? "Administration" : item.label));
    }
  }
  return result;
}

const PUBLIC_SEARCH = [
  { label: "Home", path: "/ayam-goreng/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/ayam-goreng/public", icon: "lucide:book-open", section: "Pages", description: "API docs, guides, and references" },
  { label: "Help & FAQ", path: "/ayam-goreng/public/help", icon: "lucide:circle-question-mark", section: "Pages", description: "Frequently asked questions" },
  { label: "Contact", path: "/ayam-goreng/public/contact", icon: "lucide:phone", section: "Pages", description: "Get in touch with us" },
  { label: "About", path: "/ayam-goreng/public/about", icon: "lucide:info", section: "Pages", description: "About the platform" },
];

const PRIVATE_SEARCH = flattenNav(PRIVATE_NAV);

export default {
  slug: "ayam-goreng",
  name: "Ayam Goreng",
  icon: "lucide:drumstick",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

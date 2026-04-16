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
          { label: "Firewall Guard", icon: "lucide:shield", path: "/ayam-goreng/private/modules/firewall-guard" },
          { label: "Auth Shield", icon: "lucide:lock", path: "/ayam-goreng/private/modules/auth-shield" },
          { label: "DNS Manager", icon: "lucide:globe-lock", path: "/ayam-goreng/private/modules/dns-manager" },
          { label: "Secret Store", icon: "lucide:key-round", path: "/ayam-goreng/private/modules/secret-store" },
          { label: "Compliance", icon: "lucide:shield-check", path: "/ayam-goreng/private/modules/compliance" },
        ],
      },
      {
        label: "Infrastructure",
        icon: "lucide:hard-drive",
        children: [
          { label: "Compute Engine", icon: "lucide:cpu", path: "/ayam-goreng/private/modules/compute-engine" },
          { label: "Container Ops", icon: "lucide:box", path: "/ayam-goreng/private/modules/container-ops" },
          { label: "Edge Functions", icon: "lucide:satellite", path: "/ayam-goreng/private/modules/edge-functions" },
          { label: "CDN Express", icon: "lucide:globe", path: "/ayam-goreng/private/modules/cdn-express" },
          { label: "Mesh Net", icon: "lucide:network", path: "/ayam-goreng/private/modules/mesh-net" },
        ],
      },
      {
        label: "Data",
        icon: "lucide:database",
        children: [
          { label: "Data Vault", icon: "lucide:database", path: "/ayam-goreng/private/modules/data-vault" },
          { label: "Data Lake", icon: "lucide:droplets", path: "/ayam-goreng/private/modules/data-lake" },
          { label: "Graph DB", icon: "lucide:share-2", path: "/ayam-goreng/private/modules/graph-db" },
          { label: "Time Series", icon: "lucide:trending-up", path: "/ayam-goreng/private/modules/time-series" },
          { label: "Search Index", icon: "lucide:search", path: "/ayam-goreng/private/modules/search-index" },
        ],
      },
      {
        label: "DevTools",
        icon: "lucide:code",
        children: [
          { label: "Pipeline CI", icon: "lucide:zap", path: "/ayam-goreng/private/modules/pipeline-ci" },
          { label: "Deploy Bot", icon: "lucide:rocket", path: "/ayam-goreng/private/modules/deploy-bot" },
          { label: "Terminal Pro", icon: "lucide:terminal", path: "/ayam-goreng/private/modules/terminal-pro" },
          { label: "Stack Builder", icon: "lucide:layers", path: "/ayam-goreng/private/modules/stack-builder" },
          { label: "Repo Mirror", icon: "lucide:git-merge", path: "/ayam-goreng/private/modules/repo-mirror" },
        ],
      },
      {
        label: "Monitoring",
        icon: "lucide:activity",
        children: [
          { label: "Metrics Hub", icon: "lucide:bar-chart-3", path: "/ayam-goreng/private/modules/metrics-hub" },
          { label: "Log Stream", icon: "lucide:scroll-text", path: "/ayam-goreng/private/modules/log-stream" },
          { label: "Monitor AI", icon: "lucide:activity", path: "/ayam-goreng/private/modules/monitor-ai" },
          { label: "Trace Path", icon: "lucide:radar", path: "/ayam-goreng/private/modules/trace-path" },
          { label: "Uptime Watch", icon: "lucide:heart-pulse", path: "/ayam-goreng/private/modules/uptime-watch" },
        ],
      },
      {
        label: "Collaboration",
        icon: "lucide:users",
        children: [
          { label: "Chat Engine", icon: "lucide:message-circle", path: "/ayam-goreng/private/modules/chat-engine" },
          { label: "Meet Hub", icon: "lucide:video", path: "/ayam-goreng/private/modules/meet-hub" },
          { label: "Wiki Space", icon: "lucide:notebook-pen", path: "/ayam-goreng/private/modules/wiki-space" },
          { label: "Board Planner", icon: "lucide:kanban", path: "/ayam-goreng/private/modules/board-planner" },
          { label: "Docs Portal", icon: "lucide:book-open", path: "/ayam-goreng/private/modules/docs-portal" },
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

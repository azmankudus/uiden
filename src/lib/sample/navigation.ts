export interface NavItem {
  label: string;
  icon: string;
  path?: string;
  children?: NavItem[];
}

export interface SearchItem {
  label: string;
  path: string;
  icon: string;
  section: string;
  description?: string;
}

export const PUBLIC_NAV = [
  { label: "Documentation", icon: "lucide:book-open", path: "/sample/public" },
  { label: "Help & FAQ", icon: "lucide:circle-question-mark", path: "/sample/public/help" },
  { label: "Contact", icon: "lucide:phone", path: "/sample/public/contact" },
  { label: "About", icon: "lucide:info", path: "/sample/public/about" },
];

export const PRIVATE_NAV: NavItem[] = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/sample/private" },
  {
    label: "Analytics",
    icon: "lucide:bar-chart-3",
    children: [
      { label: "Overview", icon: "lucide:activity", path: "/sample/private" },
      { label: "Reports", icon: "lucide:file-text", path: "/sample/private" },
      { label: "Real-time", icon: "lucide:zap", path: "/sample/private" },
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
          { label: "Firewall Guard", icon: "lucide:shield", path: "/sample/private/modules/firewall-guard" },
          { label: "Auth Shield", icon: "lucide:lock", path: "/sample/private/modules/auth-shield" },
          { label: "DNS Manager", icon: "lucide:globe-lock", path: "/sample/private/modules/dns-manager" },
          { label: "Secret Store", icon: "lucide:key-round", path: "/sample/private/modules/secret-store" },
          { label: "Compliance", icon: "lucide:shield-check", path: "/sample/private/modules/compliance" },
        ],
      },
      {
        label: "Infrastructure",
        icon: "lucide:hard-drive",
        children: [
          { label: "Compute Engine", icon: "lucide:cpu", path: "/sample/private/modules/compute-engine" },
          { label: "Container Ops", icon: "lucide:box", path: "/sample/private/modules/container-ops" },
          { label: "Edge Functions", icon: "lucide:satellite", path: "/sample/private/modules/edge-functions" },
          { label: "CDN Express", icon: "lucide:globe", path: "/sample/private/modules/cdn-express" },
          { label: "Mesh Net", icon: "lucide:network", path: "/sample/private/modules/mesh-net" },
        ],
      },
      {
        label: "Data",
        icon: "lucide:database",
        children: [
          { label: "Data Vault", icon: "lucide:database", path: "/sample/private/modules/data-vault" },
          { label: "Data Lake", icon: "lucide:droplets", path: "/sample/private/modules/data-lake" },
          { label: "Graph DB", icon: "lucide:share-2", path: "/sample/private/modules/graph-db" },
          { label: "Time Series", icon: "lucide:trending-up", path: "/sample/private/modules/time-series" },
          { label: "Search Index", icon: "lucide:search", path: "/sample/private/modules/search-index" },
        ],
      },
      {
        label: "DevTools",
        icon: "lucide:code",
        children: [
          { label: "Pipeline CI", icon: "lucide:zap", path: "/sample/private/modules/pipeline-ci" },
          { label: "Deploy Bot", icon: "lucide:rocket", path: "/sample/private/modules/deploy-bot" },
          { label: "Terminal Pro", icon: "lucide:terminal", path: "/sample/private/modules/terminal-pro" },
          { label: "Stack Builder", icon: "lucide:layers", path: "/sample/private/modules/stack-builder" },
          { label: "Repo Mirror", icon: "lucide:git-merge", path: "/sample/private/modules/repo-mirror" },
        ],
      },
      {
        label: "Monitoring",
        icon: "lucide:activity",
        children: [
          { label: "Metrics Hub", icon: "lucide:bar-chart-3", path: "/sample/private/modules/metrics-hub" },
          { label: "Log Stream", icon: "lucide:scroll-text", path: "/sample/private/modules/log-stream" },
          { label: "Monitor AI", icon: "lucide:activity", path: "/sample/private/modules/monitor-ai" },
          { label: "Trace Path", icon: "lucide:radar", path: "/sample/private/modules/trace-path" },
          { label: "Uptime Watch", icon: "lucide:heart-pulse", path: "/sample/private/modules/uptime-watch" },
        ],
      },
      {
        label: "Collaboration",
        icon: "lucide:users",
        children: [
          { label: "Chat Engine", icon: "lucide:message-circle", path: "/sample/private/modules/chat-engine" },
          { label: "Meet Hub", icon: "lucide:video", path: "/sample/private/modules/meet-hub" },
          { label: "Wiki Space", icon: "lucide:notebook-pen", path: "/sample/private/modules/wiki-space" },
          { label: "Board Planner", icon: "lucide:kanban", path: "/sample/private/modules/board-planner" },
          { label: "Docs Portal", icon: "lucide:book-open", path: "/sample/private/modules/docs-portal" },
        ],
      },
    ],
  },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
  {
    label: "Administration",
    icon: "lucide:settings",
    children: [
      { label: "Users & Groups", icon: "lucide:users", path: "/sample/private/admin/users" },
      { label: "Roles & Permissions", icon: "lucide:shield-check", path: "/sample/private/admin/roles" },
      { label: "System Settings", icon: "lucide:settings", path: "/sample/private/admin/settings" },
      { label: "Audit Log", icon: "lucide:scroll-text", path: "/sample/private/admin/audit" },
      { label: "License & Billing", icon: "lucide:credit-card", path: "/sample/private/admin" },
    ],
  },
];

export const PUBLIC_SEARCH: SearchItem[] = [
  { label: "Home", path: "/sample/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/sample/public", icon: "lucide:book-open", section: "Pages", description: "API docs, guides, and references" },
  { label: "Help & FAQ", path: "/sample/public/help", icon: "lucide:circle-question-mark", section: "Pages", description: "Frequently asked questions" },
  { label: "Contact", path: "/sample/public/contact", icon: "lucide:phone", section: "Pages", description: "Get in touch with us" },
  { label: "About", path: "/sample/public/about", icon: "lucide:info", section: "Pages", description: "About the platform" },
];

function flattenNav(items: NavItem[], section?: string): SearchItem[] {
  const result: SearchItem[] = [];
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

export const PRIVATE_SEARCH: SearchItem[] = flattenNav(PRIVATE_NAV);

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

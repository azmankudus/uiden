import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/user-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/user-hub/public" },
  { label: "About", icon: "lucide:info", path: "/user-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/user-hub/private" },
  { label: "Users", icon: "lucide:users", path: "/user-hub/private/users" },
  { label: "Groups", icon: "lucide:users", path: "/user-hub/private/groups" },
  { label: "Policies", icon: "lucide:shield-check", path: "/user-hub/private/policies" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/user-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/user-hub/public", icon: "lucide:book-open", section: "Pages", description: "Identity & access management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/user-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Users", path: "/user-hub/private/users", icon: "lucide:users", section: "Management", description: "Manage user accounts and access" },
  { label: "Groups", path: "/user-hub/private/groups", icon: "lucide:users", section: "Management", description: "Manage user groups and roles" },
  { label: "Policies", path: "/user-hub/private/policies", icon: "lucide:shield-check", section: "Governance", description: "Configure security policies" },
];

export default {
  slug: "user-hub",
  name: "User-Hub",
  icon: "lucide:users",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

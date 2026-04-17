import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/mark-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/mark-hub/public" },
  { label: "About", icon: "lucide:info", path: "/mark-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/mark-hub/private" },
  { label: "Files", icon: "lucide:folder", path: "/mark-hub/private/files" },
  { label: "Editor", icon: "lucide:file-code", path: "/mark-hub/private/editor" },
  { label: "Preview", icon: "lucide:eye", path: "/mark-hub/private/preview" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/mark-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/mark-hub/public", icon: "lucide:book-open", section: "Pages", description: "Markdown editor docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/mark-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "Files", path: "/mark-hub/private/files", icon: "lucide:folder", section: "Management", description: "Manage markdown files" },
  { label: "Editor", path: "/mark-hub/private/editor", icon: "lucide:file-code", section: "Tools", description: "Edit markdown with live preview" },
  { label: "Preview", path: "/mark-hub/private/preview", icon: "lucide:eye", section: "View", description: "Preview rendered markdown" },
];

export default {
  slug: "mark-hub",
  name: "Mark-Hub",
  icon: "lucide:file-code",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

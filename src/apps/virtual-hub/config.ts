import type { AppConfig } from "../types";

const PUBLIC_NAV = [
  { label: "Home", icon: "lucide:home", path: "/virtual-hub/public" },
  { label: "Documentation", icon: "lucide:book-open", path: "/virtual-hub/public" },
  { label: "About", icon: "lucide:info", path: "/virtual-hub/public" },
];

const PRIVATE_NAV = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/virtual-hub/private" },
  { label: "VMs", icon: "lucide:monitor", path: "/virtual-hub/private/vms" },
  { label: "Clusters", icon: "lucide:boxes", path: "/virtual-hub/private/clusters" },
  { label: "Templates", icon: "lucide:layers", path: "/virtual-hub/private/templates" },
  { label: "Snapshots", icon: "lucide:camera", path: "/virtual-hub/private/snapshots" },
  { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
];

const PUBLIC_SEARCH = [
  { label: "Home", path: "/virtual-hub/public", icon: "lucide:home", section: "Pages" },
  { label: "Documentation", path: "/virtual-hub/public", icon: "lucide:book-open", section: "Pages", description: "Virtualization management docs" },
];

const PRIVATE_SEARCH = [
  { label: "Dashboard", path: "/virtual-hub/private", icon: "lucide:layout-dashboard", section: "Overview" },
  { label: "VMs", path: "/virtual-hub/private/vms", icon: "lucide:monitor", section: "Management", description: "View and manage virtual machines" },
  { label: "Clusters", path: "/virtual-hub/private/clusters", icon: "lucide:boxes", section: "Management", description: "Manage hypervisor clusters" },
  { label: "Templates", path: "/virtual-hub/private/templates", icon: "lucide:layers", section: "Management", description: "VM templates library" },
  { label: "Snapshots", path: "/virtual-hub/private/snapshots", icon: "lucide:camera", section: "Management", description: "VM snapshot management" },
];

export default {
  slug: "virtual-hub",
  name: "Virtual-Hub",
  icon: "lucide:boxes",
  defaultRoute: "public",
  nav: PRIVATE_NAV,
  publicNav: PUBLIC_NAV,
  search: {
    public: PUBLIC_SEARCH,
    private: PRIVATE_SEARCH,
  },
} satisfies import("../types").AppConfig;

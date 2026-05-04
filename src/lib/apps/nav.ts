import type { NavSection } from "~/components/common/SideNav";

export const appManageNav: NavSection[] = [
  {
    title: "Navigation",
    items: [
      { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/apps/manage" },
    ],
  },
  {
    title: "Apps",
    items: [
      { label: "Registration", icon: "lucide:clipboard-list", path: "/apps/manage/registration" },
      { label: "Status", icon: "lucide:activity", path: "/apps/manage/status" },
    ],
  },
];

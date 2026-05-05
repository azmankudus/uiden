import { ROUTES } from "~/lib/common/branding";
import type { NavSection } from "~/components/common/SideNav";
import type { StringMap } from "~/lib/common/i18n";

export const getLoginManageNav = (t: () => StringMap): NavSection[] => [
  {
    title: t().navOverview,
    items: [
      { label: t().navDashboard, icon: "lucide:layout-dashboard", path: ROUTES.loginManage },
    ],
  },
  {
    title: t().navAuthentication,
    items: [
      { label: t().navLocalLogin, icon: "lucide:user", path: ROUTES.loginManageLocal },
      { label: t().navRemoteProviders, icon: "lucide:globe-lock", path: ROUTES.loginManageProviders },
    ],
  },
  {
    title: t().navAccessControl,
    items: [
      { label: t().navGroups, icon: "lucide:folder", path: ROUTES.loginManageGroups },
      { label: t().navPermissions, icon: "lucide:shield", path: ROUTES.loginManagePermissions },
    ],
  },
];

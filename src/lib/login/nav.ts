import { ROUTES } from "~/lib/common/branding";
import type { NavSection } from "~/components/common/SideNav";
import type { StringMap } from "~/lib/common/i18n";

export const getLoginManageNav = (t: () => StringMap): NavSection[] => [
  {
    title: t().navNavigation,
    items: [
      { label: t().navDashboard, icon: "lucide:layout-dashboard", path: ROUTES.apps },
    ],
  },
  {
    title: t().navAuthProviders,
    items: [
      { label: t().manageTitle, icon: "lucide:globe-lock", path: ROUTES.loginManage },
    ],
  },
  {
    title: t().navUsersAndApps,
    items: [
      { label: t().navUserManagement, icon: "lucide:users", path: ROUTES.loginUsers },
      { label: t().navAppManagement, icon: "lucide:boxes", path: ROUTES.appManage },
    ],
  },
  {
    title: t().navSettings,
    items: [
      { label: t().navUserSettings, icon: "lucide:settings", path: ROUTES.userAccount },
    ],
  },
];

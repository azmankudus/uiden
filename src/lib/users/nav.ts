import { ROUTES } from "~/lib/common/branding";
import type { NavSection } from "~/components/common/SideNav";
import type { StringMap } from "~/lib/common/i18n";

export const getUsersNav = (t: () => StringMap): NavSection[] => [
  {
    title: t().navAccount,
    items: [
      { label: t().navAccountInfo, icon: "lucide:user", path: ROUTES.userAccount },
      { label: t().navProfile, icon: "lucide:circle-user", path: ROUTES.userProfile },
    ],
  },
  {
    title: t().navPreferences,
    items: [
      { label: t().navSecurity, icon: "lucide:shield", path: ROUTES.userSecurity },
      { label: t().navAppearance, icon: "lucide:palette", path: ROUTES.userAppearance },
    ],
  },
];

export const getLoginUsersNav = (t: () => StringMap): NavSection[] => [
  {
    title: t().navUsers,
    items: [
      { label: t().navAllUsers, icon: "lucide:users", path: ROUTES.loginUsers },
      { label: t().navGroups, icon: "lucide:folder", path: ROUTES.loginGroups },
    ],
  },
  {
    title: t().navAccess,
    items: [
      { label: t().navPermissions, icon: "lucide:shield", path: ROUTES.loginPermissions },
    ],
  },
];

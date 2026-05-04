import { ROUTES } from "~/lib/common/branding";
import type { NavSection } from "~/components/common/SideNav";
import type { StringMap } from "~/lib/common/i18n";

export const usersNav: NavSection[] = [
  {
    title: "Account",
    items: [
      { label: "Account Info", icon: "lucide:user", path: ROUTES.userAccount },
      { label: "Profile", icon: "lucide:circle-user", path: ROUTES.userProfile },
    ],
  },
  {
    title: "Preferences",
    items: [
      { label: "Security", icon: "lucide:shield", path: ROUTES.userSecurity },
      { label: "Appearance", icon: "lucide:palette", path: ROUTES.userAppearance },
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

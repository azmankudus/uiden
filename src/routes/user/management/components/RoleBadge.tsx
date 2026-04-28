import { ROLE_STYLES } from "../lib/constants";

interface RoleBadgeProps {
  role: "Admin" | "User" | "Guest";
}

export function RoleBadge(props: RoleBadgeProps) {
  const config = () => ROLE_STYLES[props.role] || ROLE_STYLES.User;
  return (
    <span class={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${config().bg} ${config().text}`}>
      <span class={`w-2 h-2 rounded-full ${config().dot}`} />
      {props.role}
    </span>
  );
}
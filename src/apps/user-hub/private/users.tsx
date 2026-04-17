import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "user", label: "User" },
  { key: "email", label: "Email" },
  { key: "department", label: "Department" },
  { key: "groups", label: "Groups" },
  { key: "mfa", label: "MFA", render: (v: boolean) => (
    <span class={`text-xs font-medium ${v ? "text-green-400" : "text-text-muted"}`}>{v ? "Enabled" : "Disabled"}</span>
  )},
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Locked: "#ef4444", Inactive: "#6b7280", Pending: "#f59e0b" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "lastLogin", label: "Last Login" },
];

const data = [
  { user: "Sarah Chen", email: "sarah.chen@example.com", department: "Engineering", groups: "Admin, DevOps", mfa: true, status: "Active", lastLogin: "2 min ago" },
  { user: "Mike Johnson", email: "mike.j@example.com", department: "Marketing", groups: "Marketing", mfa: true, status: "Active", lastLogin: "15 min ago" },
  { user: "Alex Kim", email: "alex.kim@example.com", department: "Engineering", groups: "Backend, On-Call", mfa: true, status: "Active", lastLogin: "1 hr ago" },
  { user: "Emma Wilson", email: "emma.w@example.com", department: "Finance", groups: "Finance, Auditors", mfa: true, status: "Active", lastLogin: "3 hr ago" },
  { user: "James Park", email: "james.p@example.com", department: "Security", groups: "Security, Admin", mfa: true, status: "Active", lastLogin: "30 min ago" },
  { user: "Lisa Wang", email: "lisa.w@example.com", department: "HR", groups: "HR", mfa: false, status: "Active", lastLogin: "1 day ago" },
  { user: "David Lee", email: "david.l@example.com", department: "Engineering", groups: "Frontend", mfa: true, status: "Locked", lastLogin: "5 days ago" },
  { user: "Maria Garcia", email: "maria.g@example.com", department: "Operations", groups: "Operations, On-Call", mfa: true, status: "Active", lastLogin: "2 hr ago" },
  { user: "Tom Brown", email: "tom.b@example.com", department: "Sales", groups: "Sales", mfa: false, status: "Inactive", lastLogin: "30 days ago" },
  { user: "Nina Patel", email: "nina.p@example.com", department: "Engineering", groups: "DevOps, Backend", mfa: true, status: "Pending", lastLogin: "Never" },
];

export default function UsersPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Users" description="Manage user accounts, access, and authentication settings." icon="lucide:users" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search users..." />
    </div>
  );
}

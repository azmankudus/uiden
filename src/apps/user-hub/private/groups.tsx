import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "group", label: "Group" },
  { key: "members", label: "Members" },
  { key: "policies", label: "Policies" },
  { key: "type", label: "Type" },
  { key: "created", label: "Created" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Archived: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { group: "Administrators", members: "8", policies: "Full Access", type: "System", created: "2024-01-15", status: "Active" },
  { group: "Engineering", members: "45", policies: "Dev Access, CI/CD", type: "Department", created: "2024-02-01", status: "Active" },
  { group: "DevOps", members: "12", policies: "Infrastructure, Deploy", type: "Team", created: "2024-03-10", status: "Active" },
  { group: "Marketing", members: "23", policies: "CMS, Analytics", type: "Department", created: "2024-02-15", status: "Active" },
  { group: "Finance", members: "15", policies: "ERP, Reports", type: "Department", created: "2024-02-20", status: "Active" },
  { group: "Security", members: "6", policies: "Full Audit, Security Tools", type: "Team", created: "2024-01-20", status: "Active" },
  { group: "On-Call", members: "18", policies: "Production Access", type: "Operational", created: "2024-04-01", status: "Active" },
  { group: "Legacy Users", members: "3", policies: "Read Only", type: "System", created: "2023-06-15", status: "Archived" },
];

export default function GroupsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Groups" description="Manage user groups, roles, and group-based access policies." icon="lucide:users" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search groups..." />
    </div>
  );
}

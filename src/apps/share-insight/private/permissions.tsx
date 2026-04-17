import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import StatCard from "~/shell/components/ui/StatCard";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const stats = [
  { label: "Total ACEs", value: "12,847", icon: "lucide:shield", color: "#3b82f6" },
  { label: "Unique SIDs", value: "342", icon: "lucide:users", color: "#8b5cf6" },
  { label: "Orphaned SIDs", value: "23", icon: "lucide:triangle-alert", color: "#ef4444" },
  { label: "Inherited", value: "8,201", icon: "lucide:workflow", color: "#10b981" },
];

const PERMISSIONS = [
  { user: "CORP\\Domain Admins", folder: "\\\\SERVER01\\Marketing", access: "Full Control", type: "Allow", inherited: "Yes" },
  { user: "CORP\\Marketing Team", folder: "\\\\SERVER01\\Marketing", access: "Modify", type: "Allow", inherited: "Yes" },
  { user: "CORP\\jdoe", folder: "\\\\SERVER01\\Marketing\\Campaigns", access: "Full Control", type: "Allow", inherited: "No" },
  { user: "ENG\\devops", folder: "/data/engineering/src", access: "Read & Execute", type: "Allow", inherited: "Yes" },
  { user: "S-1-5-21-...-1043", folder: "\\\\FS03\\HR", access: "Full Control", type: "Allow", inherited: "No" },
  { user: "CORP\\hradmin", folder: "\\\\FS03\\HR\\Employee Records", access: "Full Control", type: "Allow", inherited: "Yes" },
  { user: "CORP\\Everyone", folder: "/mnt/nas/legal", access: "Read", type: "Allow", inherited: "Yes" },
  { user: "LEGAL\\ldirector", folder: "/mnt/nas/legal/contracts", access: "Modify", type: "Allow", inherited: "No" },
  { user: "CORP\\backupsvc", folder: "\\\\NAS01\\Backup\\Daily", access: "Full Control", type: "Allow", inherited: "Yes" },
  { user: "QA\\qalead", folder: "/srv/shared/qa/test-data", access: "Write", type: "Deny", inherited: "No" },
];

const accessColor: Record<string, string> = {
  Allow: "#10b981",
  Deny: "#ef4444",
};

const columns = [
  { key: "user", label: "User / Group" },
  { key: "folder", label: "Folder" },
  { key: "access", label: "Access Level" },
  { key: "type", label: "Type", render: (_: string, row: any) => <StatusBadge text={row.type} color={accessColor[row.type] || "#6b7280"} /> },
  { key: "inherited", label: "Inherited" },
];

export default function Permissions() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Permission Analysis" description="Audit access control entries across all scanned shares" icon="lucide:shield" />
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <For each={stats}>
          {(s) => <StatCard label={s.label} value={s.value} icon={s.icon} color={s.color} />}
        </For>
      </div>
      <DataTable columns={columns} data={PERMISSIONS} searchPlaceholder="Search permissions..." />
    </div>
  );
}

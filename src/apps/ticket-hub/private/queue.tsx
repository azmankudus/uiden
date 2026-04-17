import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "ticket", label: "Ticket" },
  { key: "type", label: "Type" },
  { key: "priority", label: "Priority", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Critical: "#ef4444", High: "#f97316", Medium: "#eab308", Low: "#3b82f6" };
    return <StatusBadge text={row.priority} color={colors[row.priority] || "#6b7280"} />;
  }},
  { key: "waiting", label: "Waiting" },
  { key: "assignee", label: "Assignee" },
];

const data = [
  { ticket: "INC-4821 — DB connection timeout on prod cluster", type: "Incident", priority: "Critical", waiting: "2h 14m", assignee: "alice.chen" },
  { ticket: "INC-4819 — SSL cert expiring on payment gateway", type: "Incident", priority: "Critical", waiting: "3h 48m", assignee: "bob.miller" },
  { ticket: "INC-4817 — Memory leak in auth-service pods", type: "Incident", priority: "High", waiting: "5h 20m", assignee: "platform-team" },
  { ticket: "CR-0847 — Upgrade LBs to HAProxy 2.8", type: "Change Request", priority: "High", waiting: "1d 4h", assignee: "network-team" },
  { ticket: "CR-0846 — Enable MFA for admin portal", type: "Change Request", priority: "High", waiting: "1d 8h", assignee: "security-team" },
  { ticket: "SR-3298 — New laptop request batch #47", type: "Service Request", priority: "Low", waiting: "1d 2h", assignee: "helpdesk" },
  { ticket: "SR-3291 — Disk expansion for logging server", type: "Service Request", priority: "Medium", waiting: "3h 12m", assignee: "infra-team" },
  { ticket: "INC-4814 — Intermittent 502 on API gateway", type: "Incident", priority: "Medium", waiting: "2d 1h", assignee: "web-team" },
  { ticket: "SR-3289 — DNS record update for staging", type: "Service Request", priority: "Low", waiting: "4h 30m", assignee: "dns-team" },
  { ticket: "CR-0845 — Rotate database credentials", type: "Change Request", priority: "Medium", waiting: "6h 45m", assignee: "dba-team" },
];

export default function QueuePage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Ticket Queue" description="Current ticket queue and assignment status." icon="lucide:inbox" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search queue..." />
    </div>
  );
}

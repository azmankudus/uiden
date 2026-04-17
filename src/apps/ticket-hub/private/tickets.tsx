import { createSignal, createMemo } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";
import FilterTabs from "~/shell/components/ui/FilterTabs";

const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "type", label: "Type" },
  { key: "priority", label: "Priority", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Critical: "#ef4444", High: "#f97316", Medium: "#eab308", Low: "#3b82f6" };
    return <StatusBadge text={row.priority} color={colors[row.priority] || "#6b7280"} />;
  }},
  { key: "assignee", label: "Assignee" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Open: "#3b82f6", "In Progress": "#f59e0b", Resolved: "#10b981", Closed: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "updated", label: "Updated" },
];

const allData = [
  { id: "INC-4821", title: "Database connection timeout on prod cluster", type: "Incident", priority: "Critical", assignee: "alice.chen", status: "In Progress", updated: "14:32" },
  { id: "SR-3298", title: "New laptop request — onboarding batch #47", type: "Service Request", priority: "Low", assignee: "helpdesk", status: "Open", updated: "13:15" },
  { id: "CR-0847", title: "Upgrade load balancers to HAProxy 2.8", type: "Change Request", priority: "High", assignee: "network-team", status: "Open", updated: "12:45" },
  { id: "INC-4819", title: "SSL certificate expiring on payment gateway", type: "Incident", priority: "Critical", assignee: "bob.miller", status: "In Progress", updated: "12:00" },
  { id: "SR-3294", title: "VPN access for contractor team", type: "Service Request", priority: "Medium", assignee: "idm-team", status: "Resolved", updated: "11:30" },
  { id: "INC-4817", title: "Memory leak in auth-service pods", type: "Incident", priority: "High", assignee: "platform-team", status: "In Progress", updated: "10:45" },
  { id: "CR-0846", title: "Enable MFA for admin portal", type: "Change Request", priority: "High", assignee: "security-team", status: "Open", updated: "10:00" },
  { id: "SR-3291", title: "Disk expansion for logging server", type: "Service Request", priority: "Medium", assignee: "infra-team", status: "Resolved", updated: "09:15" },
  { id: "INC-4814", title: "Intermittent 502 on API gateway", type: "Incident", priority: "Medium", assignee: "web-team", status: "Closed", updated: "08:30" },
  { id: "SR-3289", title: "DNS record update for staging environment", type: "Service Request", priority: "Low", assignee: "dns-team", status: "Closed", updated: "Yesterday" },
];

const TABS = ["All", "Service Request", "Change Request", "Incident"];

export default function TicketsPage() {
  const [activeTab, setActiveTab] = createSignal("All");

  const filtered = createMemo(() => {
    if (activeTab() === "All") return allData;
    return allData.filter((d) => d.type === activeTab());
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Tickets" description="View and manage all tickets." icon="lucide:ticket" iconColor="#3b82f6" />
      <FilterTabs tabs={TABS} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search tickets..." />
    </div>
  );
}

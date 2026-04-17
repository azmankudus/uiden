import { createSignal, createMemo } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";
import FilterTabs from "~/shell/components/ui/FilterTabs";

const columns = [
  { key: "alert", label: "Alert" },
  { key: "source", label: "Source" },
  { key: "severity", label: "Severity", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Critical: "#ef4444", Warning: "#f59e0b", Info: "#3b82f6" };
    return <StatusBadge text={row.severity} color={colors[row.severity] || "#6b7280"} />;
  }},
  { key: "triggered", label: "Triggered" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Firing: "#ef4444", Acknowledged: "#f59e0b", Resolved: "#10b981", Silenced: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "assigned", label: "Assigned" },
];

const allData = [
  { alert: "CPU > 95% on api-gateway-02", source: "Zabbix", severity: "Critical", triggered: "2026-04-17 14:30", status: "Firing", assigned: "oncall-infra" },
  { alert: "Payment service latency > 1s", source: "Dynatrace", severity: "Critical", triggered: "2026-04-17 14:15", status: "Acknowledged", assigned: "platform-team" },
  { alert: "Disk usage > 85% on logging-node-03", source: "Zabbix", severity: "Warning", triggered: "2026-04-17 13:45", status: "Resolved", assigned: "infra-team" },
  { alert: "SSL cert expires in 14 days", source: "Cert Monitor", severity: "Warning", triggered: "2026-04-17 12:00", status: "Acknowledged", assigned: "security-team" },
  { alert: "Pod restart count > 5 in 10m", source: "Prometheus", severity: "Warning", triggered: "2026-04-17 11:30", status: "Resolved", assigned: "platform-team" },
  { alert: "Database connection pool > 80%", source: "Dynatrace", severity: "Warning", triggered: "2026-04-17 10:15", status: "Resolved", assigned: "dba-team" },
  { alert: "New deployment completed: web-v3.2.1", source: "CI/CD", severity: "Info", triggered: "2026-04-17 09:00", status: "Resolved", assigned: "ops-team" },
  { alert: "Memory usage > 90% on cache-node-02", source: "Zabbix", severity: "Critical", triggered: "2026-04-17 08:30", status: "Silenced", assigned: "infra-team" },
  { alert: "Backup completed successfully", source: "Backup Monitor", severity: "Info", triggered: "2026-04-17 06:15", status: "Resolved", assigned: "dba-team" },
  { alert: "DNS resolution degraded for internal zone", source: "Prometheus", severity: "Warning", triggered: "2026-04-17 05:00", status: "Resolved", assigned: "network-team" },
];

const TABS = ["All", "Critical", "Warning", "Info"];

export default function AlertsPage() {
  const [activeTab, setActiveTab] = createSignal("All");

  const filtered = createMemo(() => {
    if (activeTab() === "All") return allData;
    return allData.filter((d) => d.severity === activeTab());
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Alerts" description="Active alerts and incident management." icon="lucide:bell-ring" iconColor="#ef4444" />
      <FilterTabs tabs={TABS} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search alerts..." />
    </div>
  );
}

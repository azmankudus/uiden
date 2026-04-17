import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "rule", label: "Alert Rule" },
  { key: "condition", label: "Condition" },
  { key: "sources", label: "Sources" },
  { key: "triggerCount", label: "Trigger Count" },
  { key: "lastTriggered", label: "Last Triggered" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Paused: "#f59e0b", Disabled: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { rule: "API Gateway 5xx Spike", condition: "error_rate > 5% for 5m", sources: "api-gateway, nginx-ingress", triggerCount: 23, lastTriggered: "2 hr ago", status: "Active" },
  { rule: "Database Connection Pool Exhaustion", condition: "active_connections > 90% for 2m", sources: "db-primary, db-replica-01", triggerCount: 8, lastTriggered: "4 hr ago", status: "Active" },
  { rule: "High Memory Usage", condition: "memory_usage > 85% for 10m", sources: "redis-cluster, k8s-nodes", triggerCount: 41, lastTriggered: "1 hr ago", status: "Active" },
  { rule: "Authentication Failures Surge", condition: "auth_failures > 50 in 5m", sources: "auth-service, ldap", triggerCount: 12, lastTriggered: "6 hr ago", status: "Active" },
  { rule: "Disk Space Warning", condition: "disk_usage > 80%", sources: "all-hosts", triggerCount: 56, lastTriggered: "3 hr ago", status: "Active" },
  { rule: "Slow Query Detection", condition: "query_time > 10s for 3 occurrences", sources: "db-primary", triggerCount: 34, lastTriggered: "8 hr ago", status: "Paused" },
  { rule: "Backup Failure Alert", condition: "backup_status == failed", sources: "backup-agent", triggerCount: 2, lastTriggered: "2 days ago", status: "Active" },
  { rule: "Container Restart Loop", condition: "restart_count > 5 in 10m", sources: "k8s-scheduler, kubelet", triggerCount: 17, lastTriggered: "12 hr ago", status: "Disabled" },
];

export default function LogAlertsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Alerts" description="Log-based alert rules and notifications." icon="lucide:bell-ring" iconColor="#ef4444" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search alert rules..." />
    </div>
  );
}

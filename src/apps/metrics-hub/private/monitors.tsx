import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "monitor", label: "Monitor" },
  { key: "type", label: "Type" },
  { key: "target", label: "Target" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Healthy: "#10b981", Warning: "#f59e0b", Critical: "#ef4444", Unknown: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "responseTime", label: "Response Time" },
  { key: "lastCheck", label: "Last Check" },
];

const data = [
  { monitor: "api-gateway-health", type: "HTTP", target: "api.example.com/healthz", status: "Warning", responseTime: "342ms", lastCheck: "30s ago" },
  { monitor: "db-primary-latency", type: "TCP", target: "db-primary-01:5432", status: "Healthy", responseTime: "2ms", lastCheck: "30s ago" },
  { monitor: "redis-cache-hit", type: "Redis", target: "redis-cluster-01:6379", status: "Healthy", responseTime: "1ms", lastCheck: "1m ago" },
  { monitor: "k8s-api-server", type: "HTTP", target: "k8s-master:6443/healthz", status: "Healthy", responseTime: "12ms", lastCheck: "30s ago" },
  { monitor: "cdn-origin-check", type: "HTTP", target: "origin.example.com", status: "Healthy", responseTime: "45ms", lastCheck: "1m ago" },
  { monitor: "ldap-auth-service", type: "TCP", target: "ldap.internal:636", status: "Healthy", responseTime: "8ms", lastCheck: "30s ago" },
  { monitor: "payment-service-latency", type: "HTTP", target: "payment.internal/metrics", status: "Critical", responseTime: "1,204ms", lastCheck: "30s ago" },
  { monitor: "elasticsearch-cluster", type: "HTTP", target: "es-node-01:9200/_cluster/health", status: "Healthy", responseTime: "23ms", lastCheck: "1m ago" },
  { monitor: "dns-resolution", type: "DNS", target: "ns1.internal/example.com", status: "Healthy", responseTime: "4ms", lastCheck: "2m ago" },
  { monitor: "mq-rabbitmq-queue", type: "AMQP", target: "rabbitmq-01:5672", status: "Unknown", responseTime: "—", lastCheck: "5m ago" },
];

export default function MonitorsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Monitors" description="System and service monitoring endpoints." icon="lucide:activity" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search monitors..." />
    </div>
  );
}

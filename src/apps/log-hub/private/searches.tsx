import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";

const columns = [
  { key: "query", label: "Search Query" },
  { key: "sources", label: "Sources" },
  { key: "matches", label: "Matches" },
  { key: "lastRun", label: "Last Run" },
  { key: "createdBy", label: "Created By" },
];

const data = [
  { query: "error AND timeout AND (api-gateway OR payment)", sources: "api-gateway, payment-service", matches: 342, lastRun: "15 min ago", createdBy: "ops-team" },
  { query: 'level:Error AND "too many clients"', sources: "db-primary, db-replica-01", matches: 28, lastRun: "1 hr ago", createdBy: "dba-team" },
  { query: "http_status >= 500 AND host:api-*", sources: "nginx-ingress, api-gateway", matches: 156, lastRun: "2 hr ago", createdBy: "web-team" },
  { query: "authentication failed AND source:auth-service", sources: "auth-service, ldap", matches: 89, lastRun: "30 min ago", createdBy: "security-team" },
  { query: "memory AND (exhausted OR OOM) AND k8s", sources: "k8s-scheduler, kubelet", matches: 14, lastRun: "4 hr ago", createdBy: "platform-team" },
  { query: "backup AND completed AND today", sources: "backup-agent", matches: 47, lastRun: "6 hr ago", createdBy: "dba-team" },
  { query: "certificate AND (expiring OR expired)", sources: "cert-monitor, nginx-ingress", matches: 3, lastRun: "1 hr ago", createdBy: "security-team" },
  { query: "slow_query AND duration > 5000ms", sources: "db-primary, db-replica-01", matches: 67, lastRun: "3 hr ago", createdBy: "dba-team" },
];

export default function SearchesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Searches" description="Saved searches and queries." icon="lucide:search" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search saved queries..." />
    </div>
  );
}

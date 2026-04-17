import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";

const columns = [
  { key: "config", label: "Config" },
  { key: "environment", label: "Environment" },
  { key: "key", label: "Key" },
  { key: "value", label: "Value" },
  { key: "updatedBy", label: "Updated By" },
  { key: "lastModified", label: "Last Modified" },
];

const data = [
  { config: "DB Connection", environment: "prod-api-gateway", key: "DATABASE_URL", value: "jdbc:postgresql://db:5432/api", updatedBy: "Sarah Chen", lastModified: "2 hr ago" },
  { config: "Cache TTL", environment: "prod-api-gateway", key: "CACHE_TTL_SECONDS", value: "3600", updatedBy: "Alex Kim", lastModified: "1 day ago" },
  { config: "Max Connections", environment: "prod-auth-service", key: "MAX_POOL_SIZE", value: "50", updatedBy: "James Park", lastModified: "3 days ago" },
  { config: "Log Level", environment: "staging-api-gateway", key: "LOG_LEVEL", value: "DEBUG", updatedBy: "Nina Patel", lastModified: "5 hr ago" },
  { config: "Feature Flag", environment: "prod-web-frontend", key: "ENABLE_NEW_UI", value: "true", updatedBy: "Mike Johnson", lastModified: "12 hr ago" },
  { config: "Batch Size", environment: "prod-data-pipeline", key: "BATCH_SIZE", value: "1000", updatedBy: "Maria Garcia", lastModified: "2 days ago" },
  { config: "Retry Count", environment: "prod-notification", key: "MAX_RETRIES", value: "3", updatedBy: "Emma Wilson", lastModified: "1 week ago" },
  { config: "Rate Limit", environment: "prod-api-gateway", key: "RATE_LIMIT_RPM", value: "1000", updatedBy: "Alex Kim", lastModified: "4 hr ago" },
];

export default function ConfigsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Configs" description="Manage environment configurations and feature flags." icon="lucide:settings" iconColor="#f59e0b" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search configs..." />
    </div>
  );
}

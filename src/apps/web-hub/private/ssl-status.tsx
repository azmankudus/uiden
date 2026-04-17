import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const sslStats = [
  { label: "Valid", value: "98", icon: "lucide:shield-check", color: "#10b981" },
  { label: "Expiring Soon", value: "8", icon: "lucide:shield", color: "#f59e0b" },
  { label: "Expired", value: "2", icon: "lucide:circle-alert", color: "#ef4444" },
  { label: "Renewed (30d)", value: "45", icon: "lucide:shield-check", color: "#3b82f6" },
];

const certificates = [
  { domain: "api.example.com", issuer: "Let's Encrypt", validFrom: "2026-01-15", expires: "2026-04-15", status: "Expiring", autoRenew: "Yes" },
  { domain: "www.example.com", issuer: "Let's Encrypt", validFrom: "2026-03-01", expires: "2026-06-01", status: "Valid", autoRenew: "Yes" },
  { domain: "admin.example.com", issuer: "DigiCert", validFrom: "2025-12-01", expires: "2026-12-01", status: "Valid", autoRenew: "No" },
  { domain: "docs.example.com", issuer: "Let's Encrypt", validFrom: "2026-02-20", expires: "2026-05-20", status: "Valid", autoRenew: "Yes" },
  { domain: "staging.example.com", issuer: "Let's Encrypt", validFrom: "2026-01-10", expires: "2026-04-10", status: "Expiring", autoRenew: "Yes" },
  { domain: "metrics.example.com", issuer: "Cloudflare", validFrom: "2026-03-15", expires: "2027-03-15", status: "Valid", autoRenew: "Yes" },
  { domain: "cdn.example.com", issuer: "Let's Encrypt", validFrom: "2026-02-28", expires: "2026-05-28", status: "Valid", autoRenew: "Yes" },
  { domain: "mail.example.com", issuer: "Self-Signed", validFrom: "2025-06-01", expires: "2026-06-01", status: "Valid", autoRenew: "No" },
  { domain: "dev.example.com", issuer: "Let's Encrypt", validFrom: "2026-01-05", expires: "2026-04-05", status: "Expiring", autoRenew: "Yes" },
  { domain: "legacy.example.com", issuer: "Self-Signed", validFrom: "2025-01-01", expires: "2026-01-01", status: "Expired", autoRenew: "No" },
];

const statusColor: Record<string, string> = {
  Valid: "#10b981",
  Expiring: "#f59e0b",
  Expired: "#ef4444",
};

const columns = [
  { key: "domain", label: "Domain" },
  { key: "issuer", label: "Issuer" },
  { key: "validFrom", label: "Valid From" },
  { key: "expires", label: "Expires" },
  { key: "status", label: "Status", render: (_v: string, row: any) => <StatusBadge text={row.status} color={statusColor[row.status] || "#6b7280"} /> },
  { key: "autoRenew", label: "Auto-Renew" },
];

export default function WebHubSslStatus() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader
        title="SSL Status"
        description="Certificate status and renewal tracking."
        icon="lucide:shield"
        iconColor="#f59e0b"
      />

      <div class="max-w-6xl mx-auto px-0">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {sslStats.map((s) => <StatCard {...s} />)}
        </div>

        <DataTable columns={columns} data={certificates} searchPlaceholder="Search certificates..." />
      </div>
    </div>
  );
}

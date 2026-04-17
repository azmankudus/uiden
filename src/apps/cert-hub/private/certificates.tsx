import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "domain", label: "Domain" },
  { key: "type", label: "Type" },
  { key: "issuer", label: "Issuer" },
  { key: "validUntil", label: "Valid Until" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Valid: "#10b981", Expiring: "#f59e0b", Expired: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
  { key: "autoRenew", label: "Auto-Renew", render: (v: boolean) => (
    <span class={`text-xs font-medium ${v ? "text-green-400" : "text-text-muted"}`}>{v ? "Enabled" : "Disabled"}</span>
  )},
];

const data = [
  { domain: "api.example.com", type: "EV", issuer: "DigiCert", validUntil: "2027-03-15", status: "Valid", autoRenew: true },
  { domain: "shop.example.com", type: "OV", issuer: "Let's Encrypt", validUntil: "2026-04-22", status: "Expiring", autoRenew: true },
  { domain: "*.internal.io", type: "DV", issuer: "Cloudflare", validUntil: "2026-09-01", status: "Valid", autoRenew: true },
  { domain: "mail.example.com", type: "OV", issuer: "Sectigo", validUntil: "2026-01-10", status: "Expired", autoRenew: false },
  { domain: "cdn.example.com", type: "DV", issuer: "Let's Encrypt", validUntil: "2026-08-19", status: "Valid", autoRenew: true },
  { domain: "auth.example.com", type: "EV", issuer: "DigiCert", validUntil: "2027-06-30", status: "Valid", autoRenew: true },
  { domain: "dev.example.com", type: "DV", issuer: "Let's Encrypt", validUntil: "2026-04-28", status: "Expiring", autoRenew: false },
  { domain: "docs.example.com", type: "OV", issuer: "GlobalSign", validUntil: "2026-11-14", status: "Valid", autoRenew: true },
  { domain: "staging.internal.io", type: "DV", issuer: "Cloudflare", validUntil: "2026-05-03", status: "Expiring", autoRenew: true },
  { domain: "vpn.example.com", type: "OV", issuer: "Sectigo", validUntil: "2025-12-01", status: "Expired", autoRenew: false },
];

export default function CertificatesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Certificates" description="View and manage all SSL certificates across your infrastructure." icon="lucide:badge-check" iconColor="#10b981" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search certificates..." />
    </div>
  );
}

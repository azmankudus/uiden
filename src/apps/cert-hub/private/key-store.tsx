import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";

const columns = [
  { key: "alias", label: "Key Alias" },
  { key: "type", label: "Type" },
  { key: "size", label: "Size" },
  { key: "created", label: "Created" },
  { key: "usedBy", label: "Used By" },
];

const data = [
  { alias: "api-prod-rsa", type: "RSA", size: "4096-bit", created: "2025-09-12", usedBy: "api.example.com" },
  { alias: "wildcard-ecdsa", type: "ECDSA", size: "P-384", created: "2025-11-03", usedBy: "*.example.com" },
  { alias: "internal-rsa", type: "RSA", size: "2048-bit", created: "2025-06-28", usedBy: "*.internal.io" },
  { alias: "auth-ecdsa", type: "ECDSA", size: "P-256", created: "2025-12-15", usedBy: "auth.example.com" },
  { alias: "cdn-rsa", type: "RSA", size: "4096-bit", created: "2025-10-20", usedBy: "cdn.example.com" },
  { alias: "mail-rsa", type: "RSA", size: "2048-bit", created: "2025-04-11", usedBy: "mail.example.com" },
  { alias: "vpn-ecdsa", type: "ECDSA", size: "P-521", created: "2025-08-07", usedBy: "vpn.example.com" },
  { alias: "staging-rsa", type: "RSA", size: "2048-bit", created: "2026-01-19", usedBy: "staging.internal.io" },
];

export default function KeyStorePage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Key Store" description="Manage private and public key pairs for your certificates." icon="lucide:key-round" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search keys..." />
    </div>
  );
}

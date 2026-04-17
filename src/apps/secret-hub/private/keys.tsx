import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "keyId", label: "Key ID" },
  { key: "algorithm", label: "Algorithm" },
  { key: "created", label: "Created" },
  { key: "expires", label: "Expires" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Rotating: "#f59e0b", Expired: "#ef4444", Scheduled: "#3b82f6" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { keyId: "key-a7f3c2d1", algorithm: "AES-256-GCM", created: "2025-11-02", expires: "2026-11-02", status: "Active" },
  { keyId: "key-b8e4d5f6", algorithm: "RSA-4096", created: "2025-09-18", expires: "2026-09-18", status: "Active" },
  { keyId: "key-c9d6a7b2", algorithm: "ECDSA-P384", created: "2025-06-01", expires: "2026-06-01", status: "Rotating" },
  { keyId: "key-d1e8f3a4", algorithm: "AES-128-CBC", created: "2024-12-15", expires: "2025-12-15", status: "Expired" },
  { keyId: "key-e2f9b5c6", algorithm: "Ed25519", created: "2026-01-20", expires: "2027-01-20", status: "Active" },
  { keyId: "key-f3a1c7d8", algorithm: "RSA-2048", created: "2025-08-10", expires: "2026-08-10", status: "Scheduled" },
  { keyId: "key-g4b2d8e9", algorithm: "AES-256-GCM", created: "2026-02-01", expires: "2027-02-01", status: "Active" },
  { keyId: "key-h5c3e9f1", algorithm: "ECDSA-P256", created: "2025-10-30", expires: "2026-10-30", status: "Active" },
];

export default function KeysPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Keys" description="Manage encryption keys and their lifecycle." icon="lucide:key-round" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search keys..." />
    </div>
  );
}

import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "document", label: "Document" },
  { key: "template", label: "Template" },
  { key: "format", label: "Format", render: (v: string) => {
    const colors: Record<string, string> = { PDF: "#ef4444", DOCX: "#3b82f6", XLSX: "#10b981", PNG: "#8b5cf6" };
    return <StatusBadge text={v} color={colors[v] || "#6b7280"} />;
  }},
  { key: "size", label: "Size" },
  { key: "generated", label: "Generated" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Completed: "#10b981", Processing: "#3b82f6", Failed: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { document: "INV-2847.pdf", template: "Invoice Template v2", format: "PDF", size: "245 KB", generated: "5 min ago", status: "Completed" },
  { document: "Q2-Report-2026.pdf", template: "Quarterly Report", format: "PDF", size: "1.2 MB", generated: "22 min ago", status: "Completed" },
  { document: "Contract-SC-089.pdf", template: "Employment Contract", format: "PDF", size: "380 KB", generated: "1 hr ago", status: "Completed" },
  { document: "Meeting-Notes-Apr17.docx", template: "Meeting Notes", format: "DOCX", size: "45 KB", generated: "2 hr ago", status: "Completed" },
  { document: "SPEC-API-v3.pdf", template: "Technical Spec", format: "PDF", size: "890 KB", generated: "3 hr ago", status: "Completed" },
  { document: "Batch-Report-Apr.xlsx", template: "Quarterly Report", format: "XLSX", size: "2.1 MB", generated: "4 hr ago", status: "Processing" },
  { document: "Catalog-Spring.png", template: "Product Catalog", format: "PNG", size: "4.5 MB", generated: "5 hr ago", status: "Completed" },
  { document: "CERT-Batch-12.pdf", template: "Certificate of Completion", format: "PDF", size: "156 KB", generated: "6 hr ago", status: "Failed" },
  { document: "PS-Order-4521.pdf", template: "Packing Slip", format: "PDF", size: "78 KB", generated: "8 hr ago", status: "Completed" },
  { document: "Onboard-Guide-v2.docx", template: "Onboarding Guide", format: "DOCX", size: "320 KB", generated: "1 day ago", status: "Completed" },
];

export default function DocumentsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Documents" description="View and manage all generated documents." icon="lucide:file-code" iconColor="#10b981" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search documents..." />
    </div>
  );
}

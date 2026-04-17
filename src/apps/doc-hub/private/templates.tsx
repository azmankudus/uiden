import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "template", label: "Template" },
  { key: "type", label: "Type" },
  { key: "category", label: "Category" },
  { key: "used", label: "Used" },
  { key: "lastModified", label: "Last Modified" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Draft: "#f59e0b", Archived: "#6b7280" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { template: "Invoice Template v2", type: "DOCX", category: "Finance", used: "847", lastModified: "2 hr ago", status: "Active" },
  { template: "Quarterly Report", type: "PDF", category: "Management", used: "124", lastModified: "1 day ago", status: "Active" },
  { template: "Employment Contract", type: "PDF", category: "HR", used: "356", lastModified: "3 days ago", status: "Active" },
  { template: "Meeting Notes", type: "DOCX", category: "General", used: "423", lastModified: "5 hr ago", status: "Active" },
  { template: "Technical Spec", type: "PDF", category: "Engineering", used: "89", lastModified: "1 week ago", status: "Active" },
  { template: "Packing Slip", type: "PDF", category: "Operations", used: "1,245", lastModified: "2 days ago", status: "Active" },
  { template: "Onboarding Guide", type: "DOCX", category: "HR", used: "67", lastModified: "2 weeks ago", status: "Draft" },
  { template: "Certificate of Completion", type: "PDF", category: "Training", used: "234", lastModified: "4 days ago", status: "Active" },
  { template: "Old Invoice v1", type: "DOCX", category: "Finance", used: "1,100", lastModified: "6 months ago", status: "Archived" },
  { template: "Product Catalog", type: "PDF", category: "Sales", used: "45", lastModified: "1 month ago", status: "Draft" },
];

export default function TemplatesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Templates" description="Manage document templates for automated generation." icon="lucide:file-text" iconColor="#3b82f6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search templates..." />
    </div>
  );
}

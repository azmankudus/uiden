import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import StatusBadge from "~/shell/components/ui/StatusBadge";

const columns = [
  { key: "software", label: "Software" },
  { key: "licenses", label: "Licenses" },
  { key: "used", label: "Used" },
  { key: "available", label: "Available" },
  { key: "expiry", label: "Expiry" },
  { key: "status", label: "Status", render: (_v: any, row: any) => {
    const colors: Record<string, string> = { Active: "#10b981", Expiring: "#f59e0b", Overlicensed: "#3b82f6", Expired: "#ef4444" };
    return <StatusBadge text={row.status} color={colors[row.status] || "#6b7280"} />;
  }},
];

const data = [
  { software: "Microsoft Office 365", licenses: "250", used: "238", available: "12", expiry: "2027-01-15", status: "Active" },
  { software: "Adobe Creative Cloud", licenses: "50", used: "48", available: "2", expiry: "2026-06-30", status: "Expiring" },
  { software: "JetBrains All Products", licenses: "80", used: "72", available: "8", expiry: "2027-03-20", status: "Active" },
  { software: "Slack Business+", licenses: "200", used: "187", available: "13", expiry: "2026-12-01", status: "Active" },
  { software: "Zoom Enterprise", licenses: "100", used: "45", available: "55", expiry: "2027-06-15", status: "Overlicensed" },
  { software: "Jira Software", licenses: "150", used: "142", available: "8", expiry: "2026-09-30", status: "Active" },
  { software: "Confluence", licenses: "150", used: "98", available: "52", expiry: "2026-09-30", status: "Overlicensed" },
  { software: "GitHub Enterprise", licenses: "100", used: "95", available: "5", expiry: "2027-04-01", status: "Active" },
  { software: "Salesforce CRM", licenses: "30", used: "28", available: "2", expiry: "2026-05-15", status: "Expiring" },
  { software: "AutoCAD", licenses: "15", used: "15", available: "0", expiry: "2025-12-31", status: "Expired" },
];

export default function LicensesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Licenses" description="Monitor software licenses, usage, and renewal dates." icon="lucide:key-round" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search licenses..." />
    </div>
  );
}

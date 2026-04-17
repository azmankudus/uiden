import PageHeader from "~/shell/components/ui/PageHeader";
import CardGrid from "~/shell/components/ui/CardGrid";

const reports = [
  { icon: "lucide:file-text", label: "Weekly Audit Summary", desc: "Aggregated overview of all share permissions, changes detected, and compliance status for the past week.", href: "#", color: "#3b82f6" },
  { icon: "lucide:shield", label: "Permission Changes", desc: "Detailed log of all permission modifications including who changed what, when, and the before/after state.", href: "#", color: "#8b5cf6" },
  { icon: "lucide:triangle-alert", label: "ACL Violations", desc: "List of detected access control violations — orphaned SIDs, broken inheritance, and overly broad access.", href: "#", color: "#ef4444" },
  { icon: "lucide:users", label: "Department Access", desc: "Breakdown of folder access by department, highlighting cross-department access and potential segregation issues.", href: "#", color: "#f59e0b" },
  { icon: "lucide:lock", label: "Sensitive Files", desc: "Inventory of files matching sensitive data patterns — PII, financial records, credentials, and health data.", href: "#", color: "#10b981" },
  { icon: "lucide:database", label: "Full Export", desc: "Complete raw data export in CSV and JSON formats for integration with SIEM, GRC tools, or custom analysis.", href: "#", color: "#06d6a0" },
];

export default function Reports() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Compliance Reports" description="Generate and download audit reports for your organization" icon="lucide:file-text" />
      <CardGrid cards={reports} />
    </div>
  );
}

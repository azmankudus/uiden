import PageHeader from "~/shell/components/ui/PageHeader";
import CardGrid from "~/shell/components/ui/CardGrid";

const reports = [
  {
    icon: "lucide:gauge",
    label: "Executive Summary",
    desc: "High-level compliance posture overview with trend analysis, risk scoring, and remediation progress for leadership review.",
    href: "/base-insight/private/scans",
    color: "#3b82f6",
  },
  {
    icon: "lucide:scan-text",
    label: "Detailed Findings",
    desc: "Complete breakdown of every check result with severity classification, affected systems, and evidence collection.",
    href: "/base-insight/private/scans",
    color: "#10b981",
  },
  {
    icon: "lucide:wrench",
    label: "Remediation Plan",
    desc: "Prioritized fix recommendations with step-by-step instructions, estimated effort, and impact analysis for each finding.",
    href: "/base-insight/private/scans",
    color: "#f59e0b",
  },
  {
    icon: "lucide:git-compare",
    label: "Change History",
    desc: "Track configuration changes over time with before/after comparisons, drift events, and rollback recommendations.",
    href: "/base-insight/private/scans",
    color: "#8b5cf6",
  },
  {
    icon: "lucide:badge-check",
    label: "Compliance Certificate",
    desc: "Generate formal compliance certificates for auditors showing benchmark coverage, scan dates, and pass/fail status.",
    href: "/base-insight/private/scans",
    color: "#06d6a0",
  },
  {
    icon: "lucide:file-pen",
    label: "Custom Report",
    desc: "Build tailored reports with custom filters, data fields, branding, and scheduled delivery to stakeholders.",
    href: "/base-insight/private/scans",
    color: "#ef4444",
  },
];

export default function Reports() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader
        title="Reports"
        description="Generate and download compliance reports and certificates"
        icon="lucide:file-text"
      />
      <CardGrid cards={reports} />
    </div>
  );
}

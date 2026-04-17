import PageHeader from "~/shell/components/ui/PageHeader";
import CardGrid from "~/shell/components/ui/CardGrid";

const categories = [
  {
    icon: "lucide:monitor",
    label: "Windows Server",
    desc: "CIS and STIG benchmarks for Windows Server 2016, 2019, 2022, and 2025 including Active Directory and IIS hardening.",
    href: "/base-insight/private/scans",
    color: "#0078d4",
  },
  {
    icon: "lucide:terminal",
    label: "Linux (RHEL / Ubuntu)",
    desc: "CIS Benchmarks and DISA STIGs for RHEL 8/9, Ubuntu 20.04/22.04/24.04, Oracle Linux, and Amazon Linux.",
    href: "/base-insight/private/scans",
    color: "#f59e0b",
  },
  {
    icon: "lucide:network",
    label: "Network Devices",
    desc: "Hardening profiles for Cisco IOS, Palo Alto PAN-OS, Fortinet FortiOS, and Juniper Junos with CIS and vendor guides.",
    href: "/base-insight/private/scans",
    color: "#06d6a0",
  },
  {
    icon: "lucide:database",
    label: "Database (Oracle / MySQL)",
    desc: "CIS benchmarks for Oracle 19c/23c, MySQL 8, PostgreSQL 15/16, and Microsoft SQL Server 2022 hardening.",
    href: "/base-insight/private/scans",
    color: "#8b5cf6",
  },
  {
    icon: "lucide:cloud",
    label: "Cloud (AWS / Azure)",
    desc: "Cloud security benchmarks including CIS AWS Foundations, Azure Security Benchmark, and GCP Hardening Guidelines.",
    href: "/base-insight/private/scans",
    color: "#3b82f6",
  },
  {
    icon: "lucide:boxes",
    label: "Container Security",
    desc: "CIS Docker Benchmark, CIS Kubernetes Benchmark, and OpenShift Security Context Constraints for container hardening.",
    href: "/base-insight/private/scans",
    color: "#ef4444",
  },
];

export default function Benchmarks() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader
        title="Benchmark Catalog"
        description="Browse and apply CIS, STIG, and vendor hardening benchmarks"
        icon="lucide:clipboard-list"
      />
      <CardGrid cards={categories} />
    </div>
  );
}

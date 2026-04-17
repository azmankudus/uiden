import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";

const columns = [
  { key: "template", label: "Template" },
  { key: "os", label: "OS" },
  { key: "size", label: "Size" },
  { key: "vmsCreated", label: "VMs Created" },
  { key: "lastUpdated", label: "Last Updated" },
];

const data = [
  { template: "ubuntu-22.04-server", os: "Ubuntu 22.04 LTS", size: "4.2GB", vmsCreated: 34, lastUpdated: "2026-03-28" },
  { template: "ubuntu-24.04-server", os: "Ubuntu 24.04 LTS", size: "4.8GB", vmsCreated: 12, lastUpdated: "2026-04-10" },
  { template: "rocky-9-minimal", os: "Rocky Linux 9", size: "3.1GB", vmsCreated: 18, lastUpdated: "2026-03-15" },
  { template: "debian-12-standard", os: "Debian 12", size: "2.8GB", vmsCreated: 22, lastUpdated: "2026-04-02" },
  { template: "windows-2022-core", os: "Windows Server 2022", size: "14.5GB", vmsCreated: 6, lastUpdated: "2026-02-20" },
  { template: "centos-7-legacy", os: "CentOS 7", size: "3.6GB", vmsCreated: 8, lastUpdated: "2026-01-10" },
  { template: "alpine-3.20-cloud", os: "Alpine 3.20", size: "0.5GB", vmsCreated: 15, lastUpdated: "2026-04-14" },
  { template: "rocky-9-docker", os: "Rocky 9 + Docker", size: "5.6GB", vmsCreated: 9, lastUpdated: "2026-03-22" },
];

export default function TemplatesPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Templates" description="VM templates library for fast provisioning." icon="lucide:layers" iconColor="#8b5cf6" />
      <DataTable columns={columns} data={data} searchPlaceholder="Search templates..." />
    </div>
  );
}

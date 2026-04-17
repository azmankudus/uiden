import { createSignal, createMemo } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";
import FilterTabs from "~/shell/components/ui/FilterTabs";

const TABS = ["All", "A", "CNAME", "MX", "TXT"];

const columns = [
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "value", label: "Value" },
  { key: "ttl", label: "TTL" },
  { key: "zone", label: "Zone" },
  { key: "updated", label: "Updated" },
];

const data = [
  { name: "api.example.com", type: "A", value: "10.0.3.50", ttl: "300", zone: "example.com", updated: "2026-04-17" },
  { name: "www.example.com", type: "CNAME", value: "cdn.example.com", ttl: "3600", zone: "example.com", updated: "2026-04-15" },
  { name: "example.com", type: "MX", value: "mail.example.com (10)", ttl: "3600", zone: "example.com", updated: "2026-03-20" },
  { name: "_dmarc.example.com", type: "TXT", value: "v=DMARC1; p=reject;", ttl: "3600", zone: "example.com", updated: "2026-03-01" },
  { name: "shop.example.com", type: "A", value: "10.0.1.20", ttl: "300", zone: "example.com", updated: "2026-04-16" },
  { name: "cdn.example.com", type: "A", value: "10.0.4.100", ttl: "60", zone: "example.com", updated: "2026-04-17" },
  { name: "auth.example.com", type: "A", value: "10.0.3.60", ttl: "300", zone: "example.com", updated: "2026-04-12" },
  { name: "staging.internal.io", type: "A", value: "10.0.6.30", ttl: "600", zone: "internal.io", updated: "2026-04-14" },
  { name: "git.internal.io", type: "CNAME", value: "devops.internal.io", ttl: "3600", zone: "internal.io", updated: "2026-04-10" },
  { name: "_spf.example.com", type: "TXT", value: "v=spf1 include:_spf.google.com ~all", ttl: "3600", zone: "example.com", updated: "2026-02-15" },
];

export default function DNSRecordsPage() {
  const [activeTab, setActiveTab] = createSignal("All");
  const filtered = createMemo(() => {
    const tab = activeTab();
    if (tab === "All") return data;
    return data.filter((row) => row.type === tab);
  });

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="DNS Records" description="Manage DNS zones and records." icon="lucide:globe" iconColor="#10b981" />
      <FilterTabs tabs={TABS} active={activeTab()} onChange={setActiveTab} count={filtered().length} />
      <DataTable columns={columns} data={filtered()} searchPlaceholder="Search DNS records..." />
    </div>
  );
}

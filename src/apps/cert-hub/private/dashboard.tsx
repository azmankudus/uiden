import { For } from "solid-js";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import ActionGrid from "~/shell/components/ui/ActionGrid";

const stats = [
  { label: "Active Certs", value: "234", icon: "lucide:badge-check", color: "#10b981" },
  { label: "Expiring 30d", value: "12", icon: "lucide:clock", color: "#f59e0b" },
  { label: "Keys Generated", value: "1.2K", icon: "lucide:key-round", color: "#3b82f6" },
  { label: "Domains Covered", value: "89", icon: "lucide:globe", color: "#8b5cf6" },
];

const activity = [
  { icon: "lucide:badge-check", text: "Certificate renewed for api.example.com", time: "5 min ago", color: "#10b981" },
  { icon: "lucide:file-pen", text: "CSR generated for staging.internal.io", time: "22 min ago", color: "#3b82f6" },
  { icon: "lucide:circle-alert", text: "cert shop.example.com expires in 7 days", time: "1 hr ago", color: "#f59e0b" },
  { icon: "lucide:key-round", text: "New RSA-4096 key pair generated", time: "3 hr ago", color: "#8b5cf6" },
  { icon: "lucide:badge-check", text: "Wildcard cert deployed to CDN cluster", time: "5 hr ago", color: "#10b981" },
  { icon: "lucide:refresh-cw", text: "Auto-renewal triggered for 3 certificates", time: "8 hr ago", color: "#06b6d4" },
];

const actions = [
  { icon: "lucide:file-pen", label: "New CSR" },
  { icon: "lucide:key-round", label: "Generate Key" },
  { icon: "lucide:badge-check", label: "Import Cert" },
  { icon: "lucide:refresh-cw", label: "Renew All" },
];

export default function CertHubDashboard() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">Cert-Hub Dashboard</h1>
        <p class="text-sm text-text-secondary mt-1">Monitor and manage your SSL certificate infrastructure.</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <For each={stats}>
          {(s) => <StatCard label={s.label} value={s.value} icon={s.icon} color={s.color} />}
        </For>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <ActivityFeed items={activity} title="Recent Activity" />
        </div>
        <ActionGrid actions={actions} />
      </div>
    </div>
  );
}

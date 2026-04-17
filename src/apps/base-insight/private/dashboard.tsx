import { useAuth } from "~/shell/context/auth";
import StatCard from "~/shell/components/ui/StatCard";
import ActivityFeed from "~/shell/components/ui/ActivityFeed";
import AppIcon from "~/shell/lib/app-icon";
import { A } from "@solidjs/router";
import { For } from "solid-js";

const stats = [
  { label: "Compliance Score", value: "87%", icon: "lucide:gauge", color: "#10b981" },
  { label: "Critical Issues", value: "12", icon: "lucide:triangle-alert", color: "#ef4444" },
  { label: "Systems Scanned", value: "48", icon: "lucide:server", color: "#3b82f6" },
  { label: "Benchmarks Applied", value: "24", icon: "lucide:clipboard-list", color: "#8b5cf6" },
];

const recentScans = [
  { icon: "lucide:shield-check", text: "CIS Windows Server 2022 scan completed — Score: 92%", time: "8 min ago", color: "#10b981" },
  { icon: "lucide:triangle-alert", text: "Critical: RHEL 8 STIG — 4 CAT I findings on PROD-DB01", time: "25 min ago", color: "#ef4444" },
  { icon: "lucide:scan-text", text: "Scheduled CIS Ubuntu 22.04 benchmark started on 12 hosts", time: "1 hr ago", color: "#3b82f6" },
  { icon: "lucide:activity", text: "Drift detected: AWS S3 bucket policy changed on us-east-1", time: "2 hr ago", color: "#f59e0b" },
  { icon: "lucide:file-text", text: "Executive compliance report exported for Q1 2026 audit", time: "4 hr ago", color: "#8b5cf6" },
  { icon: "lucide:shield-check", text: "CIS Docker Benchmark passed on all 6 container hosts", time: "6 hr ago", color: "#06d6a0" },
];

const quickActions = [
  { icon: "lucide:scan-text", label: "New Scan", href: "/base-insight/private/scans" },
  { icon: "lucide:clipboard-list", label: "Benchmarks", href: "/base-insight/private/benchmarks" },
  { icon: "lucide:file-text", label: "Reports", href: "/base-insight/private/reports" },
  { icon: "lucide:shield-check", label: "Compliance", href: "/base-insight/private/scans" },
];

export default function Dashboard() {
  const auth = useAuth();

  return (
    <div class="max-w-6xl mx-auto page-enter">
      <div class="mb-8">
        <h1 class="font-display text-2xl font-bold text-text-primary">
          Welcome back, <span class="text-brand">{auth.user()?.displayName}</span>
        </h1>
        <p class="text-sm text-text-secondary mt-1">Monitor your infrastructure hardening and compliance posture.</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <For each={stats}>
          {(s) => <StatCard label={s.label} value={s.value} icon={s.icon} color={s.color} />}
        </For>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <ActivityFeed items={recentScans} title="Recent Scans" />
        </div>

        <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
          <h2 class="font-display text-sm font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div class="grid grid-cols-2 gap-3">
            <For each={quickActions}>
              {(action) => (
                <A
                  href={action.href}
                  class="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-2/50 border border-surface-3/20 hover:border-brand/30 hover:bg-surface-2 transition-all text-center"
                >
                  <AppIcon icon={action.icon} size={20} style={{ color: "var(--color-brand)" }} />
                  <span class="text-xs font-medium text-text-secondary">{action.label}</span>
                </A>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}

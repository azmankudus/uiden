import { createMemo } from "solid-js";
import { useParams, A } from "@solidjs/router";
import { Show } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";

const pages: Record<string, { title: string; desc: string; icon: string; stats: { label: string; value: string }[] }> = {
  overview: {
    title: "Analytics Overview",
    desc: "High-level metrics and KPIs across all services.",
    icon: "lucide:activity",
    stats: [
      { label: "Total Requests", value: "1.2M" },
      { label: "Avg Response", value: "42ms" },
      { label: "Error Rate", value: "0.03%" },
      { label: "Active Users", value: "2,847" },
    ],
  },
  reports: {
    title: "Analytics Reports",
    desc: "Scheduled and on-demand reports for compliance and review.",
    icon: "lucide:file-text",
    stats: [
      { label: "Reports Generated", value: "342" },
      { label: "Scheduled", value: "18" },
      { label: "Downloads", value: "1.4K" },
      { label: "Templates", value: "24" },
    ],
  },
  "real-time": {
    title: "Real-time Analytics",
    desc: "Live streaming metrics and instant anomaly detection.",
    icon: "lucide:zap",
    stats: [
      { label: "Events/sec", value: "12.4K" },
      { label: "Active Streams", value: "89" },
      { label: "Alerts Today", value: "3" },
      { label: "Latency", value: "<8ms" },
    ],
  },
};

const actions = [
  { icon: "lucide:settings", label: "Configure" },
  { icon: "lucide:scroll-text", label: "Logs" },
  { icon: "lucide:bar-chart-3", label: "Metrics" },
  { icon: "lucide:book-open", label: "Docs" },
];

export default function AnalyticsPage() {
  const params = useParams();
  const data = createMemo(() => pages[params.slug]);

  return (
    <Show
      when={data()}
      fallback={
        <div class="max-w-6xl mx-auto page-enter flex flex-col items-center justify-center py-24">
          <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-2 mb-6">
            <AppIcon icon="lucide:search" size={28} style={{ color: "var(--color-text-muted)" }} />
          </div>
          <h1 class="font-display text-xl font-bold text-text-primary mb-2">Page not found</h1>
          <p class="text-sm text-text-secondary mb-6">No analytics page matches "{params.slug}"</p>
          <A href="/ayam-goreng/private" class="px-4 py-2 rounded-xl text-sm font-medium bg-surface-2 text-text-primary hover:bg-surface-3">
            Back to Dashboard
          </A>
        </div>
      }
    >
      {(d) => (
        <div class="max-w-6xl mx-auto page-enter">
          <A href="/ayam-goreng/private" class="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary mb-6">
            <AppIcon icon="lucide:arrow-left" size={14} />
            Dashboard
          </A>

          <div class="flex items-start gap-5 mb-8">
            <div class="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 bg-brand-dim border border-brand/20">
              <AppIcon icon={d().icon} size={26} style={{ color: "var(--color-brand)" }} />
            </div>
            <div>
              <h1 class="font-display text-2xl font-bold text-text-primary">{d().title}</h1>
              <p class="text-sm text-text-secondary mt-1">{d().desc}</p>
            </div>
          </div>

          <div class="grid md:grid-cols-4 gap-4 mb-8">
            <For each={d().stats}>
              {(s) => (
                <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
                  <div class="text-xs text-text-muted mb-2">{s.label}</div>
                  <div class="font-display text-2xl font-bold text-text-primary">{s.value}</div>
                </div>
              )}
            </For>
          </div>

          <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
            <h2 class="font-display text-sm font-semibold text-text-primary mb-4">Actions</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <For each={actions}>
                {(action) => (
                  <button type="button" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-2/50 border border-surface-3/20 hover:border-brand/30 transition-all cursor-pointer">
                    <AppIcon icon={action.icon} size={18} style={{ color: "var(--color-brand)" }} />
                    <span class="text-xs font-medium text-text-secondary">{action.label}</span>
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>
      )}
    </Show>
  );
}

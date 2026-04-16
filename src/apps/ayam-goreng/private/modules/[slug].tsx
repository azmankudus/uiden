import { createMemo } from "solid-js";
import { useParams, A } from "@solidjs/router";
import { Show, For } from "solid-js";
import AppIcon from "~/shell/lib/app-icon";
import { APPS, appColor } from "~/gateway/lib/apps";
import { slugify } from "~/shell/lib/utils";

const actions = [
  { icon: "lucide:settings", label: "Configure" },
  { icon: "lucide:scroll-text", label: "Logs" },
  { icon: "lucide:bar-chart-3", label: "Metrics" },
  { icon: "lucide:book-open", label: "Docs" },
];

export default function ModulePage() {
  const params = useParams();
  const app = createMemo(() => APPS.find((a) => slugify(a.name) === params.slug));
  const color = createMemo(() => app() ? appColor(app()._i) : { bg: "", border: "", text: "" });

  return (
    <Show
      when={app()}
      fallback={
        <div class="max-w-6xl mx-auto page-enter flex flex-col items-center justify-center py-24">
          <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-2 mb-6">
            <AppIcon icon="lucide:search" size={28} style={{ color: "var(--color-text-muted)" }} />
          </div>
          <h1 class="font-display text-xl font-bold text-text-primary mb-2">Module not found</h1>
          <p class="text-sm text-text-secondary mb-6">No module matches "{params.slug}"</p>
          <A href="/ayam-goreng/private" class="px-4 py-2 rounded-xl text-sm font-medium bg-surface-2 text-text-primary hover:bg-surface-3">
            Back to Dashboard
          </A>
        </div>
      }
    >
      {(a) => (
        <div class="max-w-6xl mx-auto page-enter">
          <A href="/ayam-goreng/private" class="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary mb-6">
            <AppIcon icon="lucide:arrow-left" size={14} />
            Dashboard
          </A>

          <div class="flex items-start gap-5 mb-8">
            <div
              class="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0"
              style={{ background: color().bg, border: `1px solid ${color().border}` }}
            >
              <AppIcon icon={a().icon} size={26} style={{ color: color().text }} />
            </div>
            <div>
              <h1 class="font-display text-2xl font-bold text-text-primary">{a().name}</h1>
              <p class="text-sm text-text-secondary mt-1">{a().desc}</p>
            </div>
          </div>

          <div class="grid md:grid-cols-3 gap-4 mb-8">
            <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
              <div class="flex items-center gap-2 mb-3">
                <AppIcon icon="lucide:badge-check" size={16} style={{ color: "#10b981" }} />
                <span class="text-xs font-medium text-text-muted">Status</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span class="text-sm font-semibold text-text-primary">Active</span>
              </div>
            </div>
            <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
              <div class="flex items-center gap-2 mb-3">
                <AppIcon icon="lucide:activity" size={16} style={{ color: "#f59e0b" }} />
                <span class="text-xs font-medium text-text-muted">Uptime (30d)</span>
              </div>
              <span class="text-sm font-semibold text-text-primary">99.98%</span>
            </div>
            <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
              <div class="flex items-center gap-2 mb-3">
                <AppIcon icon="lucide:clock" size={16} style={{ color: "#8b5cf6" }} />
                <span class="text-xs font-medium text-text-muted">Last Deploy</span>
              </div>
              <span class="text-sm font-semibold text-text-primary">2 hours ago</span>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
            <h2 class="font-display text-sm font-semibold text-text-primary mb-4">Actions</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <For each={actions}>
                {(action) => (
                  <button
                    type="button"
                    class="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-2/50 border border-surface-3/20 hover:border-brand/30 transition-all cursor-pointer"
                  >
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

import { createSignal, onMount, For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

const features = [
  { icon: "lucide:clipboard-list", title: "Service Requests", desc: "Streamlined service request management with automated routing, approval workflows, and fulfillment tracking." },
  { icon: "lucide:git-merge", title: "Change Requests", desc: "Formal change management with risk assessment, approval chains, rollback plans, and implementation scheduling." },
  { icon: "lucide:triangle-alert", title: "Incident Management", desc: "Rapid incident response with severity classification, auto-escalation, and post-mortem documentation." },
  { icon: "lucide:clock", title: "SLA Tracking", desc: "Real-time SLA monitoring with breach prediction, automated notifications, and compliance dashboards." },
];

const stats = [
  { value: "142", label: "Open Tickets", icon: "lucide:ticket" },
  { value: "4.2h", label: "Avg Resolution", icon: "lucide:clock" },
  { value: "96%", label: "SLA Compliance", icon: "lucide:check" },
  { value: "23", label: "Today's Tickets", icon: "lucide:inbox" },
];

export default function TicketHubLanding() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => requestAnimationFrame(() => setMounted(true)));

  return (
    <div class="pt-16 min-h-screen bg-surface-0">
      <section
        class="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center"
        classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
      >
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dim text-brand text-xs font-medium mb-6">
          <AppIcon icon="lucide:ticket" size={14} />
          Service Management
        </div>
        <h1 class="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight mb-6">
          Service<br /><span class="text-brand">Management</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
          Unified ticketing for service requests, change management, incidents, and SLA tracking. Streamline your IT service delivery.
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <A href="/ticket-hub/private" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
            <AppIcon icon="lucide:layout-dashboard" size={18} />
            Dashboard
          </A>
          <A href="/ticket-hub/private/tickets" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3">
            <AppIcon icon="lucide:ticket" size={18} />
            Tickets
          </A>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-6 pb-20">
        <div class="grid md:grid-cols-2 gap-4">
          <For each={features}>
            {(f) => (
              <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 hover:border-brand/30 transition-colors">
                <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-dim mb-4">
                  <AppIcon icon={f.icon} size={20} style={{ color: "var(--color-brand)" }} />
                </div>
                <h3 class="font-display text-base font-semibold text-text-primary mb-2">{f.title}</h3>
                <p class="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            )}
          </For>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-6 pb-20">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <For each={stats}>
            {(s) => (
              <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
                <AppIcon icon={s.icon} size={20} class="mx-auto mb-3" style={{ color: "var(--color-brand)" }} />
                <div class="font-display text-2xl font-bold text-text-primary">{s.value}</div>
                <div class="text-xs text-text-muted mt-1">{s.label}</div>
              </div>
            )}
          </For>
        </div>
      </section>
    </div>
  );
}

import { createSignal, onMount, For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

const features = [
  { icon: "lucide:scroll-text", title: "DR Plans", desc: "Define and manage disaster recovery plans with RPO/RTO targets and system dependencies." },
  { icon: "lucide:play", title: "Automated Runbooks", desc: "Step-by-step automated recovery runbooks with conditional logic and approval gates." },
  { icon: "lucide:flask-conical", title: "Regular Testing", desc: "Schedule and track DR tests with automated validation and compliance reporting." },
  { icon: "lucide:shield-check", title: "Compliance", desc: "Meet regulatory requirements with audit trails, test evidence, and SLA tracking." },
];

const stats = [
  { value: "8", label: "DR Plans", icon: "lucide:scroll-text" },
  { value: "99.2%", label: "RPO Achievement", icon: "lucide:target" },
  { value: "15min", label: "RTO Target", icon: "lucide:clock" },
  { value: "3 days", label: "Last Test", icon: "lucide:flask-conical" },
];

export default function DRHubLanding() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => requestAnimationFrame(() => setMounted(true)));

  return (
    <div class="pt-16 min-h-screen bg-surface-0">
      <section
        class="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center"
        classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
      >
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dim text-brand text-xs font-medium mb-6">
          <AppIcon icon="lucide:triangle-alert" size={14} />
          Disaster Recovery
        </div>
        <h1 class="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight mb-6">
          Disaster Recovery<br /><span class="text-brand">Management</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
          Plan, test, and execute disaster recovery with confidence. Automated runbooks and regular testing ensure your systems survive any failure.
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <A href="/dr-hub/private" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
            <AppIcon icon="lucide:layout-dashboard" size={18} />
            Dashboard
          </A>
          <A href="/dr-hub/private/plans" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3">
            <AppIcon icon="lucide:scroll-text" size={18} />
            DR Plans
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

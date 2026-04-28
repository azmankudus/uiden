import { createSignal, onMount, For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

const features = [
  { icon: "lucide:layers", title: "Multi-Platform", desc: "Unified management for WebLogic, JBoss, Tomcat, GlassFish, and Jetty from a single dashboard." },
  { icon: "lucide:zap", title: "Hot Deploy", desc: "Zero-downtime deployments with rolling updates, rollback support, and instant health verification." },
  { icon: "lucide:activity", title: "Health Monitoring", desc: "Real-time JVM metrics, thread pool analysis, memory tracking, and proactive alerting." },
  { icon: "lucide:trending-up", title: "Auto-Scaling", desc: "Dynamic resource allocation based on traffic patterns, queue depth, and response time thresholds." },
];

const stats = [
  { value: "500+", label: "Servers", icon: "lucide:server" },
  { value: "99.9%", label: "Uptime", icon: "lucide:activity" },
  { value: "12K+", label: "Deployments", icon: "lucide:rocket" },
  { value: "<100ms", label: "Response", icon: "lucide:gauge" },
];

const footerLinks = [
  { label: "Documentation", href: "/middle-hub/public" },
  { label: "Help", href: "/middle-hub/public/help" },
  { label: "Contact", href: "/middle-hub/public/contact" },
  { label: "About", href: "/middle-hub/public/about" },
];

export default function MiddleHubLanding() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => requestAnimationFrame(() => setMounted(true)));

  return (
    <div class="pt-16 min-h-screen bg-surface-0">
      <section
        class="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center"
        classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
      >
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dim text-brand text-xs font-medium mb-6">
          <AppIcon icon="lucide:server" size={14} />
          Java Middleware Manager
        </div>
        <h1 class="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight mb-6">
          Manage Your<br /><span class="text-brand">Java Middleware</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
          Monitor, deploy, and scale your Java application servers with a unified control plane. WebLogic, JBoss, Tomcat, GlassFish, and Jetty — all in one place.
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <A href="/middle-hub/private" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
            <AppIcon icon="lucide:layout-dashboard" size={18} />
            Dashboard
          </A>
          <A href="/middle-hub/public" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3">
            <AppIcon icon="lucide:book-open" size={18} />
            Documentation
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

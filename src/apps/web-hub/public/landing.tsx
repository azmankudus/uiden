import { createSignal, onMount, For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

const features = [
  { icon: "lucide:globe-lock", title: "Reverse Proxy", desc: "Intelligent request routing with path-based, header-based, and weighted load distribution strategies." },
  { icon: "lucide:shield", title: "SSL Management", desc: "Automated certificate provisioning, renewal tracking, and centralized SSL policy enforcement." },
  { icon: "lucide:server", title: "Load Balancing", desc: "Multi-algorithm load distribution with health checks, circuit breakers, and failover orchestration." },
  { icon: "lucide:gauge", title: "Rate Limiting", desc: "Per-client, per-route, and per-method traffic controls with configurable thresholds and burst allowances." },
];

const stats = [
  { value: "200+", label: "Servers", icon: "lucide:server" },
  { value: "1.5K+", label: "Sites", icon: "lucide:globe" },
  { value: "100%", label: "SSL", icon: "lucide:shield" },
  { value: "8ms", label: "Latency", icon: "lucide:gauge" },
];

const footerLinks = [
  { label: "Documentation", href: "/web-hub/public" },
  { label: "Help", href: "/web-hub/public/help" },
  { label: "Contact", href: "/web-hub/public/contact" },
  { label: "About", href: "/web-hub/public/about" },
];

export default function WebHubLanding() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => requestAnimationFrame(() => setMounted(true)));

  return (
    <div class="pt-16 min-h-screen bg-surface-0">
      <section
        class="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center"
        classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
      >
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dim text-brand text-xs font-medium mb-6">
          <AppIcon icon="lucide:globe" size={14} />
          Web Server Manager
        </div>
        <h1 class="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight mb-6">
          Manage Your<br /><span class="text-brand">Web Servers</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
          Centralized management for Apache, Nginx, HAProxy, Caddy, Envoy, and Traefik. Configure, monitor, and scale your web infrastructure.
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <A href="/web-hub/private" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
            <AppIcon icon="lucide:layout-dashboard" size={18} />
            Dashboard
          </A>
          <A href="/web-hub/public" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3">
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

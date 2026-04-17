import { createSignal, onMount, For } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";
import AppLogo from "~/shell/lib/app-logo";
import { useAuth } from "~/shell/context/auth";
import type { AppDef } from "~/gateway/lib/apps";

interface Props {
  app: { name: string; slug: string; icon: string; desc: string };
}

const features = [
  { icon: "lucide:shield", title: "Secure & Reliable", desc: "Enterprise-grade security with audit trails, role-based access control, and encrypted data storage." },
  { icon: "lucide:zap", title: "Fast & Efficient", desc: "Optimized performance with real-time processing, intelligent caching, and minimal resource usage." },
  { icon: "lucide:plug", title: "Easy Integration", desc: "REST APIs, webhooks, and pre-built connectors to seamlessly integrate with your existing stack." },
  { icon: "lucide:headset", title: "Expert Support", desc: "Dedicated support team with priority escalation, documentation, and hands-on onboarding." },
];

export default function DefaultPublicLanding(props: Props) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = createSignal(false);

  onMount(() => requestAnimationFrame(() => setMounted(true)));

  const handleDashboard = () => {
    if (auth.isLoggedIn()) {
      navigate(`/${props.app.slug}/private`);
    } else {
      navigate(`/user/login?redirect=/${props.app.slug}/private`);
    }
  };

  return (
    <div class="min-h-screen bg-surface-0">
      <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)" }}
        />
      </div>

      <section
        class="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-16 text-center"
        classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
      >
        <div class="flex justify-center mb-6">
          <AppLogo slug={props.app.slug} size={72} />
        </div>
        <h1 class="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight mb-4">
          {props.app.name}
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
          {props.app.desc}
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={handleDashboard}
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-brand/20"
          >
            <AppIcon icon="lucide:layout-dashboard" size={18} />
            Dashboard
          </button>
          <A
            href="/landing"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3 transition-colors"
          >
            <AppIcon icon="lucide:layout-grid" size={18} />
            All Apps
          </A>
        </div>
      </section>

      <section
        class="relative z-10 max-w-4xl mx-auto px-6 pb-16"
        classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
        style={{ "animation-delay": "150ms" }}
      >
        <div class="grid md:grid-cols-2 gap-4">
          <For each={features}>
            {(f) => (
              <div class="p-6 rounded-2xl bg-surface-1/80 border border-surface-3/30 hover:border-brand/30 transition-colors">
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

      <footer class="relative z-10 border-t border-surface-3/30">
        <div class="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span class="text-sm text-text-muted">&copy; 2026 {props.app.name}</span>
          <A href="/landing" class="text-sm text-text-secondary hover:text-text-primary">Back to SuperApp</A>
        </div>
      </footer>
    </div>
  );
}

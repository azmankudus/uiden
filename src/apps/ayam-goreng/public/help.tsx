import { createSignal, onMount, For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

const faqs = [
  { q: "How do I get started with the platform?", a: "Sign up for a free trial, explore the dashboard, and follow the onboarding wizard. Most teams are productive within 30 minutes." },
  { q: "What authentication methods are supported?", a: "We support SAML 2.0, OpenID Connect, LDAP, and multi-factor authentication. Enterprise SSO integration takes less than a day." },
  { q: "Is there a rate limit on API requests?", a: "Free tier: 1,000 req/min. Pro: 10,000 req/min. Enterprise: custom limits with burst capacity and dedicated endpoints." },
  { q: "Can I self-host the platform?", a: "Yes. We offer on-premise deployment with Helm charts for Kubernetes, Docker Compose for smaller setups, and bare-metal installers." },
  { q: "How does billing work?", a: "Usage-based billing with monthly invoicing. Annual plans include a 20% discount. No hidden fees — you only pay for what you use." },
  { q: "What is your uptime SLA?", a: "We guarantee 99.99% uptime on Enterprise plans. Status page is publicly accessible and we publish quarterly reliability reports." },
];

const channels = [
  { icon: "lucide:mail", title: "Email Support", desc: "support@kentut.dev", detail: "Response within 4 hours" },
  { icon: "lucide:message-square", title: "Live Chat", desc: "Available in dashboard", detail: "24/7 real-time help" },
  { icon: "lucide:phone", title: "Phone Support", desc: "+1 (555) 000-0000", detail: "Enterprise plans only" },
  { icon: "lucide:users", title: "Community", desc: "forum.kentut.dev", detail: "Peer discussions & tips" },
];

export default function HelpPage() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => requestAnimationFrame(() => setMounted(true)));

  const expandedSignals = faqs.map(() => createSignal(false));

  return (
    <div class="pt-16 min-h-screen bg-surface-0">
      <section
        class="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center"
        classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
      >
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dim text-brand text-xs font-medium mb-6">
          <AppIcon icon="lucide:circle-question-mark" size={14} />
          Support
        </div>
        <h1 class="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">Help & FAQ</h1>
        <p class="text-text-secondary">Find answers to common questions or reach out to our support team.</p>
      </section>

      <section class="max-w-3xl mx-auto px-6 pb-20">
        <h2 class="font-display text-lg font-semibold text-text-primary mb-6">Frequently Asked Questions</h2>
        <div class="flex flex-col gap-3">
          <For each={faqs}>
            {(faq, i) => {
              const [open, setOpen] = expandedSignals[i()];
              return (
                <div class="rounded-xl border border-surface-3/30 bg-surface-1 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(!open())}
                    class="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span class="text-sm font-medium text-text-primary">{faq.q}</span>
                    <AppIcon
                      icon="lucide:chevron-down"
                      size={18}
                      class="text-text-muted transition-transform duration-200"
                      style={{ transform: open() ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <div classList={{ "hidden": !open(), "px-5 pb-4": open() }}>
                    <p class="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-6 pb-20">
        <h2 class="font-display text-lg font-semibold text-text-primary mb-6">Support Channels</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <For each={channels}>
            {(ch) => (
              <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30 text-center hover:border-brand/30 transition-colors">
                <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-dim mx-auto mb-3">
                  <AppIcon icon={ch.icon} size={20} style={{ color: "var(--color-brand)" }} />
                </div>
                <h3 class="text-sm font-semibold text-text-primary mb-1">{ch.title}</h3>
                <p class="text-xs text-brand mb-1">{ch.desc}</p>
                <p class="text-xs text-text-muted">{ch.detail}</p>
              </div>
            )}
          </For>
        </div>
      </section>

      <footer class="border-t border-surface-3/30">
        <div class="max-w-5xl mx-auto px-6 py-8 text-center">
          <A href="/sample/public/contact" class="text-sm text-brand hover:underline">Can't find your answer? Contact us &rarr;</A>
        </div>
      </footer>
    </div>
  );
}

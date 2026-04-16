import { createSignal, onMount, For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

const values = [
  { icon: "lucide:rocket", title: "Innovation", desc: "We push boundaries with cutting-edge technology and bold ideas that redefine what's possible." },
  { icon: "lucide:shield-check", title: "Security", desc: "Every product is built with security-first principles, rigorous audits, and transparent practices." },
  { icon: "lucide:gauge", title: "Reliability", desc: "Our infrastructure is designed for five-nines uptime because your business depends on it." },
  { icon: "lucide:users", title: "Collaboration", desc: "We believe the best solutions emerge when diverse teams work together with shared purpose." },
];

const team = [
  { name: "Ava Chen", role: "CEO & Co-Founder", initials: "AC" },
  { name: "Marcus Wright", role: "CTO & Co-Founder", initials: "MW" },
  { name: "Priya Sharma", role: "VP Engineering", initials: "PS" },
  { name: "Liam O'Brien", role: "Head of Design", initials: "LO" },
  { name: "Sofia Martinez", role: "Head of Security", initials: "SM" },
  { name: "Yuki Tanaka", role: "Lead Architect", initials: "YT" },
];

export default function AboutPage() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => requestAnimationFrame(() => setMounted(true)));

  return (
    <div class="pt-16 min-h-screen bg-surface-0">
      <section
        class="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center"
        classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
      >
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dim text-brand text-xs font-medium mb-6">
          <AppIcon icon="lucide:info" size={14} />
          About
        </div>
        <h1 class="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">About</h1>
        <p class="text-text-secondary">The team and mission behind Ayam Goreng.</p>
      </section>

      <section class="max-w-3xl mx-auto px-6 pb-20">
        <div class="p-6 md:p-8 rounded-2xl bg-surface-1 border border-surface-3/30">
          <h2 class="font-display text-lg font-semibold text-text-primary mb-4">Our Story</h2>
          <p class="text-sm text-text-secondary leading-relaxed mb-4">
            Founded in 2021, Ayam Goreng started as a simple idea: what if enterprises could access all their tools from a single, unified platform? Frustrated by fragmented workflows and clunky integrations, our founders set out to build something different.
          </p>
          <p class="text-sm text-text-secondary leading-relaxed">
            Today, we serve over 10,000 users across 30 countries, powering mission-critical workloads with 100+ modular applications. From startups to Fortune 500 companies, teams trust our platform to manage security, infrastructure, data, and collaboration — all in one place.
          </p>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-6 pb-20">
        <h2 class="font-display text-lg font-semibold text-text-primary mb-6 text-center">Our Values</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <For each={values}>
            {(v) => (
              <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30 text-center hover:border-brand/30 transition-colors">
                <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-dim mx-auto mb-3">
                  <AppIcon icon={v.icon} size={20} style={{ color: "var(--color-brand)" }} />
                </div>
                <h3 class="font-display text-sm font-semibold text-text-primary mb-2">{v.title}</h3>
                <p class="text-xs text-text-secondary leading-relaxed">{v.desc}</p>
              </div>
            )}
          </For>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-6 pb-20">
        <h2 class="font-display text-lg font-semibold text-text-primary mb-6 text-center">Leadership Team</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <For each={team}>
            {(member) => (
              <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30 flex items-center gap-4 hover:border-brand/30 transition-colors">
                <div class="flex items-center justify-center w-11 h-11 rounded-full bg-brand-dim text-brand font-display text-sm font-bold shrink-0">
                  {member.initials}
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-text-primary">{member.name}</h3>
                  <p class="text-xs text-text-muted">{member.role}</p>
                </div>
              </div>
            )}
          </For>
        </div>
      </section>

      <section class="max-w-3xl mx-auto px-6 pb-20 text-center">
        <div class="p-8 rounded-2xl bg-surface-1 border border-surface-3/30">
          <h2 class="font-display text-xl font-semibold text-text-primary mb-3">Want to work with us?</h2>
          <p class="text-sm text-text-secondary mb-6">We're always looking for talented people to join our mission.</p>
          <A href="/sample/public/contact" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
            <AppIcon icon="lucide:mail" size={16} />
            Get in Touch
          </A>
        </div>
      </section>
    </div>
  );
}

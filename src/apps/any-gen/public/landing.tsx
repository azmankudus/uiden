import { createSignal, onMount, For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

const features = [
  { icon: "lucide:type", title: "Lorem Ipsum", desc: "Generate placeholder text in various lengths and styles for design mockups." },
  { icon: "lucide:hash", title: "UUID/GUID", desc: "Create unique identifiers in multiple formats for database keys and IDs." },
  { icon: "lucide:users", title: "Random Names", desc: "Generate realistic names from various cultures and regions for test data." },
  { icon: "lucide:code", title: "Custom Patterns", desc: "Define your own patterns and templates for any text generation need." },
];

const stats = [
  { value: "12", label: "Generators", icon: "lucide:sparkles" },
  { value: "847", label: "Generated Today", icon: "lucide:zap" },
  { value: "24", label: "Presets", icon: "lucide:bookmark" },
  { value: "12.4K", label: "History", icon: "lucide:clock" },
];

export default function AnyGenLanding() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => requestAnimationFrame(() => setMounted(true)));

  return (
    <div class="pt-16 min-h-screen bg-surface-0">
      <section class="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center" classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dim text-brand text-xs font-medium mb-6">
          <AppIcon icon="lucide:sparkles" size={14} />
          Text Generation Toolkit
        </div>
        <h1 class="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight mb-6">
          Text <span class="text-brand">Generation</span><br />Toolkit
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
          Generate any kind of text data you need — from placeholder text to unique identifiers and test data.
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <A href="/any-gen/private" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
            <AppIcon icon="lucide:layout-dashboard" size={18} />
            Dashboard
          </A>
          <A href="/any-gen/private/generators" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3">
            <AppIcon icon="lucide:sparkles" size={18} />
            Generators
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

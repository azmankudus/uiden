import { createSignal, onMount, For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

const features = [
  { icon: "lucide:eye", title: "Live Preview", desc: "See your rendered markdown in real-time as you type with instant feedback." },
  { icon: "lucide:code", title: "Syntax Highlighting", desc: "Rich syntax highlighting for code blocks in all major programming languages." },
  { icon: "lucide:folder", title: "File Management", desc: "Organize markdown files with folders, tags, and full-text search." },
  { icon: "lucide:upload", title: "Export Options", desc: "Export to HTML, PDF, and plain text with custom styling and templates." },
];

const stats = [
  { value: "67", label: "Files", icon: "lucide:folder" },
  { value: "23", label: "Recent Edits", icon: "lucide:pencil" },
  { value: "8", label: "Shared", icon: "lucide:users" },
  { value: "4.2MB", label: "Storage Used", icon: "lucide:hard-drive" },
];

export default function MarkHubLanding() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => requestAnimationFrame(() => setMounted(true)));

  return (
    <div class="pt-16 min-h-screen bg-surface-0">
      <section class="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center" classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dim text-brand text-xs font-medium mb-6">
          <AppIcon icon="lucide:file-code" size={14} />
          Markdown Editor
        </div>
        <h1 class="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight mb-6">
          Markdown <span class="text-brand">Editor</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
          A powerful markdown editor with live preview, syntax highlighting, and seamless file management.
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <A href="/mark-hub/private" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
            <AppIcon icon="lucide:layout-dashboard" size={18} />
            Dashboard
          </A>
          <A href="/mark-hub/private/editor" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3">
            <AppIcon icon="lucide:file-code" size={18} />
            Open Editor
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

      <footer class="border-t border-surface-3/30">
        <div class="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span class="text-sm text-text-muted">&copy; 2026 Mark-Hub</span>
        </div>
      </footer>
    </div>
  );
}

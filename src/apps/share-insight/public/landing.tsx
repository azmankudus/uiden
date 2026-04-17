import { createSignal, onMount, For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";

const features = [
  { icon: "lucide:shield", title: "Permission Mapping", desc: "Automatically discover and map all NTFS and SMB permissions across your shared folders with recursive traversal." },
  { icon: "lucide:lock", title: "ACL Analysis", desc: "Deep-dive into Access Control Lists — detect orphaned SIDs, broken inheritance, and overly permissive entries." },
  { icon: "lucide:file-text", title: "Compliance Reports", desc: "Generate audit-ready reports for SOX, HIPAA, GDPR, and ISO 27001 with one-click export to PDF and CSV." },
  { icon: "lucide:bell-ring", title: "Real-time Alerts", desc: "Instant notifications when permission changes are detected, new shares are exposed, or sensitive files are accessed." },
];

const stats = [
  { value: "12K+", label: "Folders Scanned", icon: "lucide:folder" },
  { value: "48K+", label: "Permission Rules", icon: "lucide:key-round" },
  { value: "98%", label: "Compliance Score", icon: "lucide:gauge" },
  { value: "< 5s", label: "Avg Scan Time", icon: "lucide:clock" },
];

export default function Landing() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => requestAnimationFrame(() => setMounted(true)));

  return (
    <div class="pt-16 min-h-screen bg-surface-0">
      <section
        class="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center"
        classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}
      >
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dim text-brand text-xs font-medium mb-6">
          <AppIcon icon="lucide:folder-search" size={14} />
          NTFS / SMB Auditor
        </div>
        <h1 class="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight mb-6">
          Audit Your<br /><span class="text-brand">Shared Folders</span>
        </h1>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
          Scan NTFS and SMB shares for file, folder, link, permission and ACL auditing. Detect misconfigurations, ensure compliance, and secure your data access.
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <A href="/share-insight/private" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">
            <AppIcon icon="lucide:layout-dashboard" size={18} />
            Dashboard
          </A>
          <A href="/share-insight/public" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-2 text-text-primary hover:bg-surface-3">
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

      <footer class="border-t border-surface-3/30">
        <div class="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span class="text-sm text-text-muted">&copy; 2026 Share-Insight</span>
          <div class="flex items-center gap-4">
            <A href="/share-insight/public" class="text-sm text-text-secondary hover:text-text-primary">Documentation</A>
            <A href="/share-insight/public/help" class="text-sm text-text-secondary hover:text-text-primary">Help</A>
            <A href="/share-insight/public/contact" class="text-sm text-text-secondary hover:text-text-primary">Contact</A>
          </div>
        </div>
      </footer>
    </div>
  );
}

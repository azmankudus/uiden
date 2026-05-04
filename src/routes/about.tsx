import { A } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";

export default function About() {
  return (
    <div class="min-h-dvh bg-surface-0">
      <div class="max-w-3xl mx-auto px-6 py-16">
        <h1 class="font-display text-3xl font-extrabold text-text-primary mb-2">About</h1>
        <p class="text-text-secondary mb-8">Platform information and version details.</p>

        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
            <h2 class="font-display text-lg font-semibold text-text-primary mb-2">Kentut SuperApp</h2>
            <p class="text-sm text-text-secondary">A unified gateway to all your enterprise tools.</p>
            <dl class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <dt class="text-text-muted">Version</dt>
              <dd class="text-text-primary">0.0.2</dd>
              <dt class="text-text-muted">Framework</dt>
              <dd class="text-text-primary">SolidStart 1.x</dd>
              <dt class="text-text-muted">License</dt>
              <dd class="text-text-primary">MIT</dd>
            </dl>
          </div>

          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
            <AppIcon icon="lucide:info" size={32} style={{ color: "var(--color-text-muted)" }} />
            <p class="mt-3 text-sm text-text-muted">Additional about details will appear here.</p>
          </div>
        </div>

        <div class="mt-8">
          <A href="/apps" class="text-sm text-brand hover:underline">&larr; Back to Apps</A>
        </div>
      </div>
    </div>
  );
}

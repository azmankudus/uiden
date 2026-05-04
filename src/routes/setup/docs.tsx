import { A } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import { BRAND } from "~/lib/common/branding";

export default function SetupDocs() {
  return (
    <div class="min-h-dvh bg-surface-0">
      <div class="max-w-3xl mx-auto px-6 py-16">
        <h1 class="font-display text-3xl font-extrabold text-text-primary mb-2">Documentation</h1>
        <p class="text-text-secondary mb-8">Guides and references for {BRAND.name}.</p>

        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
            <div class="flex items-center gap-3 mb-3">
              <AppIcon icon="lucide:book-open" size={20} style={{ color: "var(--color-brand)" }} />
              <h2 class="font-display text-lg font-semibold text-text-primary">Getting Started</h2>
            </div>
            <p class="text-sm text-text-secondary">Learn how to set up and configure your superapp gateway.</p>
          </div>

          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
            <div class="flex items-center gap-3 mb-3">
              <AppIcon icon="lucide:shield" size={20} style={{ color: "var(--color-brand)" }} />
              <h2 class="font-display text-lg font-semibold text-text-primary">Authentication</h2>
            </div>
            <p class="text-sm text-text-secondary">Configure SSO providers, local auth, and role-based access.</p>
          </div>

          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
            <div class="flex items-center gap-3 mb-3">
              <AppIcon icon="lucide:blocks" size={20} style={{ color: "var(--color-brand)" }} />
              <h2 class="font-display text-lg font-semibold text-text-primary">App Management</h2>
            </div>
            <p class="text-sm text-text-secondary">Register, configure, and manage application integrations.</p>
          </div>

          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
            <AppIcon icon="lucide:file-text" size={32} style={{ color: "var(--color-text-muted)" }} />
            <p class="mt-3 text-sm text-text-muted">Full documentation content will appear here.</p>
          </div>
        </div>

        <div class="mt-8">
          <A href="/apps" class="text-sm text-brand hover:underline">&larr; Back to Apps</A>
        </div>
      </div>
    </div>
  );
}

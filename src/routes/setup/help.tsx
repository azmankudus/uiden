import { A } from "@solidjs/router";
import AppIcon from "~/components/common/AppIcon";
import { BRAND } from "~/lib/common/branding";

export default function SetupHelp() {
  return (
    <div class="min-h-dvh bg-surface-0">
      <div class="max-w-3xl mx-auto px-6 py-16">
        <h1 class="font-display text-3xl font-extrabold text-text-primary mb-2">Help Center</h1>
        <p class="text-text-secondary mb-8">Support resources for {BRAND.name}.</p>

        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
            <div class="flex items-center gap-3 mb-3">
              <AppIcon icon="lucide:circle-question-mark" size={20} style={{ color: "var(--color-brand)" }} />
              <h2 class="font-display text-lg font-semibold text-text-primary">FAQ</h2>
            </div>
            <p class="text-sm text-text-secondary">Answers to frequently asked questions.</p>
          </div>

          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
            <div class="flex items-center gap-3 mb-3">
              <AppIcon icon="lucide:mail" size={20} style={{ color: "var(--color-brand)" }} />
              <h2 class="font-display text-lg font-semibold text-text-primary">Contact Support</h2>
            </div>
            <p class="text-sm text-text-secondary">Reach the team at <span class="text-brand">{BRAND.supportEmail}</span></p>
          </div>

          <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
            <AppIcon icon="lucide:life-buoy" size={32} style={{ color: "var(--color-text-muted)" }} />
            <p class="mt-3 text-sm text-text-muted">Additional help resources will appear here.</p>
          </div>
        </div>

        <div class="mt-8">
          <A href="/apps" class="text-sm text-brand hover:underline">&larr; Back to Apps</A>
        </div>
      </div>
    </div>
  );
}

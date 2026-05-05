import { A } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import { BRAND } from "~/lib/common/branding";
import { useT } from "~/lib/common/i18n";

export default function SetupHelp() {
  const t = useT("setup");
  const [mounted, setMounted] = createSignal(false);

  onMount(() => requestAnimationFrame(() => setMounted(true)));

  return (
    <Show when={mounted()}>
      <div class="min-h-dvh bg-surface-0 animate-fade-up">
        <div class="max-w-3xl mx-auto px-6 py-16">
          <h1 class="font-display text-3xl font-extrabold text-text-primary mb-2">{t().helpTitle}</h1>
          <p class="text-text-secondary mb-8">{t().helpSubtitle} {BRAND.name}.</p>

          <div class="space-y-4">
            <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
              <div class="flex items-center gap-3 mb-3">
                <AppIcon icon="lucide:circle-question-mark" size={20} style={{ color: "var(--color-brand)" }} />
                <h2 class="font-display text-lg font-semibold text-text-primary">{t().helpFaq}</h2>
              </div>
              <p class="text-sm text-text-secondary">{t().helpFaqDesc}</p>
            </div>

            <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
              <div class="flex items-center gap-3 mb-3">
                <AppIcon icon="lucide:mail" size={20} style={{ color: "var(--color-brand)" }} />
                <h2 class="font-display text-lg font-semibold text-text-primary">{t().helpContact}</h2>
              </div>
              <p class="text-sm text-text-secondary">{t().helpContactDesc} <span class="text-brand">{BRAND.supportEmail}</span></p>
            </div>

            <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
              <AppIcon icon="lucide:life-buoy" size={32} style={{ color: "var(--color-text-muted)" }} />
              <p class="mt-3 text-sm text-text-muted">{t().helpPlaceholder}</p>
            </div>
          </div>

          <div class="mt-8">
            <A href="/apps" class="text-sm text-brand hover:underline">&larr; {t().backToApps}</A>
          </div>
        </div>
      </div>
    </Show>
  );
}

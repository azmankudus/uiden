import { A } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import { BRAND } from "~/lib/common/branding";
import { useT } from "~/lib/common/i18n";

export default function About() {
  const t = useT("common");
  const [mounted, setMounted] = createSignal(false);

  onMount(() => requestAnimationFrame(() => setMounted(true)));

  return (
    <Show when={mounted()}>
      <div class="min-h-dvh bg-surface-0 animate-fade-up">
        <div class="max-w-3xl mx-auto px-6 py-16">
          <h1 class="font-display text-3xl font-extrabold text-text-primary mb-2">{t().aboutTitle}</h1>
          <p class="text-text-secondary mb-8">{t().aboutSubtitle}</p>

          <div class="space-y-4">
            <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30">
              <h2 class="font-display text-lg font-semibold text-text-primary mb-2">{BRAND.name}</h2>
              <p class="text-sm text-text-secondary">{t().aboutSuperapp}</p>
              <dl class="mt-4 grid grid-cols-2 gap-3 text-sm">
                <dt class="text-text-muted">{t().aboutVersion}</dt>
                <dd class="text-text-primary">0.0.2</dd>
                <dt class="text-text-muted">{t().aboutFramework}</dt>
                <dd class="text-text-primary">{t().aboutFrameworkSolid}</dd>
                <dt class="text-text-muted">{t().aboutLicense}</dt>
                <dd class="text-text-primary">{t().aboutLicenseMit}</dd>
              </dl>
            </div>

            <div class="p-6 rounded-2xl bg-surface-1 border border-surface-3/30 text-center">
              <AppIcon icon="lucide:info" size={32} style={{ color: "var(--color-text-muted)" }} />
              <p class="mt-3 text-sm text-text-muted">{t().aboutPlaceholder}</p>
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

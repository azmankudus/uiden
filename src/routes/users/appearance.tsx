import { createSignal, onMount, Show, For } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import Section from "~/components/common/Section";
import Toggle from "~/components/common/Toggle";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { useTheme } from "~/lib/common/theme";
import { getUsersNav } from "~/lib/users/nav";
import { useT } from "~/lib/common/i18n";
import { getContentWidth, CONTENT_WIDTH_KEY, type ContentWidth } from "~/components/common/PrivateLayout";

export default function AppearancePage() {
  const t = useT("users");
  const { requireAuth } = useAuthGuard();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = createSignal(false);
  const [fontScale, setFontScale] = createSignal(100);
  const [compact, setCompact] = createSignal(false);
  const [contentWidth, setContentWidth] = createSignal<ContentWidth>(getContentWidth());

  const widths = () => [
    { value: "narrow" as ContentWidth, label: t().narrow, description: t().narrowDesc },
    { value: "default" as ContentWidth, label: t().defaultWidth, description: t().defaultDesc },
    { value: "wide" as ContentWidth, label: t().wide, description: t().wideDesc },
    { value: "full" as ContentWidth, label: t().fullWidth, description: t().fullWidthDesc },
  ];

  onMount(() => {
    if (!requireAuth()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().appearanceTitle} icon="lucide:palette" slug="superapp" sections={getUsersNav(t)}>
        <div class="pb-12 space-y-4 animate-fade-up">
          <PageHeader title={t().appearanceTitle} icon="lucide:palette" />

          <Section title={t().themeTitle} icon="lucide:palette" description={t().themeDesc}>
            <div class="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme("dark")}
                class="p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2"
                classList={{
                  "border-brand bg-brand/5": theme() === "dark",
                  "border-surface-3/30 bg-surface-0 hover:border-surface-3": theme() !== "dark",
                }}
              >
                <AppIcon icon="lucide:moon" size={24} style={{ color: theme() === "dark" ? "var(--color-brand)" : "var(--color-text-muted)" }} />
                <span class="text-xs font-medium" classList={{ "text-brand": theme() === "dark", "text-text-muted": theme() !== "dark" }}>{t().dark}</span>
              </button>
              <button
                onClick={() => setTheme("light")}
                class="p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2"
                classList={{
                  "border-brand bg-brand/5": theme() === "light",
                  "border-surface-3/30 bg-surface-0 hover:border-surface-3": theme() !== "light",
                }}
              >
                <AppIcon icon="lucide:sun" size={24} style={{ color: theme() === "light" ? "var(--color-brand)" : "var(--color-text-muted)" }} />
                <span class="text-xs font-medium" classList={{ "text-brand": theme() === "light", "text-text-muted": theme() !== "light" }}>{t().light}</span>
              </button>
            </div>
          </Section>

          <Section title={t().contentWidthTitle} icon="lucide:maximize" description={t().contentWidthDesc}>
            <div class="grid grid-cols-2 gap-3">
              <For each={widths()}>
                {(opt) => (
                  <button
                    type="button"
                    onClick={() => {
                      setContentWidth(opt.value);
                      localStorage.setItem(CONTENT_WIDTH_KEY, opt.value);
                      window.dispatchEvent(new StorageEvent("storage", { key: CONTENT_WIDTH_KEY }));
                    }}
                    class="p-3 rounded-xl border-2 transition-all text-left"
                    classList={{
                      "border-brand bg-brand/5": contentWidth() === opt.value,
                      "border-surface-3/30 bg-surface-0 hover:border-surface-3": contentWidth() !== opt.value,
                    }}
                  >
                    <p class="text-sm font-medium" classList={{ "text-brand": contentWidth() === opt.value, "text-text-primary": contentWidth() !== opt.value }}>{opt.label}</p>
                    <p class="text-xs text-text-muted mt-0.5">{opt.description}</p>
                  </button>
                )}
              </For>
            </div>
          </Section>

          <Section title={t().displayTitle} icon="lucide:monitor" description={t().displayDesc}>
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-text-primary">{t().fontScale}</span>
                  <span class="text-xs text-text-muted font-mono">{fontScale()}%</span>
                </div>
                <input
                  type="range"
                  min={75}
                  max={150}
                  step={5}
                  value={fontScale()}
                  onInput={(e) => {
                    const v = Number(e.currentTarget.value);
                    setFontScale(v);
                    document.documentElement.style.fontSize = `${v / 100}rem`;
                  }}
                  class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-surface-3 accent-brand"
                />
                <div class="flex justify-between mt-1">
                  <span class="text-xs text-text-muted">75%</span>
                  <span class="text-xs text-text-muted">150%</span>
                </div>
              </div>

              <div class="border-t border-surface-3/30" />

              <Toggle
                checked={compact()}
                onChange={(v) => {
                  setCompact(v);
                  document.documentElement.classList.toggle("compact", v);
                }}
                label={t().compactMode}
                description={t().compactDesc}
              />
            </div>
          </Section>
        </div>
      </PrivateLayout>
    </Show>
  );
}

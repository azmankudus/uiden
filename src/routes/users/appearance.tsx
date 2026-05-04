import { createSignal, onMount, Show, For } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import Section from "~/components/common/Section";
import Toggle from "~/components/common/Toggle";
import PrivateLayout from "~/components/common/PrivateLayout";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { useTheme } from "~/lib/common/theme";
import { usersNav } from "~/lib/users/nav";
import { getContentWidth, CONTENT_WIDTH_KEY, type ContentWidth } from "~/components/common/PrivateLayout";

const CONTENT_WIDTHS: { value: ContentWidth; label: string; description: string }[] = [
  { value: "narrow", label: "Narrow", description: "768px max — focused reading" },
  { value: "default", label: "Default", description: "1024px max — balanced layout" },
  { value: "wide", label: "Wide", description: "1280px max — more content visible" },
  { value: "full", label: "Full Width", description: "Uses entire viewport, sidebar collapses" },
];

export default function AppearancePage() {
  const { requireAuth } = useAuthGuard();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = createSignal(false);
  const [toast, setToast] = createSignal(false);
  const [fontScale, setFontScale] = createSignal(100);
  const [compact, setCompact] = createSignal(false);
  const [contentWidth, setContentWidth] = createSignal<ContentWidth>(getContentWidth());

  onMount(() => {
    if (!requireAuth()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const showSaved = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name="Appearance" icon="lucide:palette" slug="superapp" sections={usersNav}>
        <div classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}>
          <div class="space-y-4">
            <Section title="Theme" icon="lucide:palette" description="Choose your preferred color scheme">
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
                  <span class="text-xs font-medium" classList={{ "text-brand": theme() === "dark", "text-text-muted": theme() !== "dark" }}>Dark</span>
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
                  <span class="text-xs font-medium" classList={{ "text-brand": theme() === "light", "text-text-muted": theme() !== "light" }}>Light</span>
                </button>
              </div>
            </Section>

            <Section title="Content Width" icon="lucide:maximize" description="Control how much horizontal space content uses">
              <div class="grid grid-cols-2 gap-3">
                <For each={CONTENT_WIDTHS}>
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

            <Section title="Display" icon="lucide:monitor" description="Adjust visual preferences">
              <div class="space-y-4">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-text-primary">Font Scale</span>
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
                  label="Compact Mode"
                  description="Reduce spacing and padding throughout the UI"
                />
              </div>
            </Section>
          </div>
        </div>

        <Show when={toast()}>
          <div class="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand/90 backdrop-blur-sm text-surface-0 text-sm font-medium shadow-lg">
              <AppIcon icon="lucide:check" size={16} />
              Saved
            </div>
          </div>
        </Show>
      </PrivateLayout>
    </Show>
  );
}

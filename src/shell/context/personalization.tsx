import { createContext, useContext, createSignal, createEffect, onMount, type ParentComponent } from "solid-js";

export type ColorTheme = "green" | "blue" | "purple" | "rose" | "amber" | "cyan";
export type BgPattern = "none" | "dots" | "grid" | "diagonal";
export type ContentWidth = "centered" | "wide";
export type AppLanguage = "en" | "id" | "ja" | "zh";

interface Personalization {
  colorTheme: () => ColorTheme;
  setColorTheme: (v: ColorTheme) => void;
  bgPattern: () => BgPattern;
  setBgPattern: (v: BgPattern) => void;
  contentWidth: () => ContentWidth;
  setContentWidth: (v: ContentWidth) => void;
  language: () => AppLanguage;
  setLanguage: (v: AppLanguage) => void;
  fontSize: () => number;
  setFontSize: (v: number) => void;
  compactMode: () => boolean;
  setCompactMode: (v: boolean) => void;
}

const P = "kentutsuperapp_";

const COLOR_MAP: Record<ColorTheme, { brand: string; brandLight: string }> = {
  green:  { brand: "#06d6a0", brandLight: "#059669" },
  blue:   { brand: "#3b82f6", brandLight: "#2563eb" },
  purple: { brand: "#8b5cf6", brandLight: "#7c3aed" },
  rose:   { brand: "#f43f5e", brandLight: "#e11d48" },
  amber:  { brand: "#f59e0b", brandLight: "#d97706" },
  cyan:   { brand: "#06b6d4", brandLight: "#0891b2" },
};

const PersonalizationCtx = createContext<Personalization>();

export function usePersonalization() {
  const ctx = useContext(PersonalizationCtx);
  if (!ctx) throw new Error("usePersonalization must be used within PersonalizationProvider");
  return ctx;
}

export const PersonalizationProvider: ParentComponent = (props) => {
  const [colorTheme, setColorTheme] = createSignal<ColorTheme>("green");
  const [bgPattern, setBgPattern] = createSignal<BgPattern>("none");
  const [contentWidth, setContentWidth] = createSignal<ContentWidth>("centered");
  const [language, setLanguage] = createSignal<AppLanguage>("en");
  const [fontSize, setFontSize] = createSignal(16);
  const [compactMode, setCompactMode] = createSignal(false);

  const load = (key: string, fallback: string) => localStorage.getItem(P + key) ?? fallback;

  onMount(() => {
    setColorTheme(load("colorTheme", "green") as ColorTheme);
    setBgPattern(load("bgPattern", "none") as BgPattern);
    setContentWidth(load("contentWidth", "centered") as ContentWidth);
    setLanguage(load("language", "en") as AppLanguage);
    setFontSize(Number(load("fontSize", "16")));
    setCompactMode(load("compactMode", "false") === "true");
  });

  const persist = (key: string, value: string) => localStorage.setItem(P + key, value);

  createEffect(() => { const v = colorTheme(); persist("colorTheme", v); applyColorTheme(v); });
  createEffect(() => { const v = bgPattern(); persist("bgPattern", v); applyBgPattern(v); });
  createEffect(() => { const v = contentWidth(); persist("contentWidth", v); });
  createEffect(() => { const v = language(); persist("language", v); });
  createEffect(() => { const v = fontSize(); persist("fontSize", String(v)); document.documentElement.style.fontSize = `${v}px`; });
  createEffect(() => { const v = compactMode(); persist("compactMode", String(v)); });

  return (
    <PersonalizationCtx.Provider value={{ colorTheme, setColorTheme, bgPattern, setBgPattern, contentWidth, setContentWidth, language, setLanguage, fontSize, setFontSize, compactMode, setCompactMode }}>
      {props.children}
    </PersonalizationCtx.Provider>
  );
};

function applyColorTheme(theme: ColorTheme) {
  const root = document.documentElement;
  const c = COLOR_MAP[theme];
  const dim = c.brand.slice(0, 7) + "33";
  const glow = c.brand.slice(0, 7) + "66";
  root.style.setProperty("--color-brand", c.brand);
  root.style.setProperty("--color-brand-dim", dim);
  root.style.setProperty("--color-brand-glow", glow);

  const isLight = root.classList.contains("light");
  if (isLight) {
    root.style.setProperty("--color-brand", c.brandLight);
    root.style.setProperty("--color-brand-dim", c.brandLight.slice(0, 7) + "20");
    root.style.setProperty("--color-brand-glow", c.brandLight.slice(0, 7) + "40");
  }
}

function applyBgPattern(pattern: BgPattern) {
  const root = document.documentElement;
  root.classList.remove("bg-dots", "bg-grid", "bg-diagonal");
  if (pattern !== "none") root.classList.add(`bg-${pattern}`);
}

import { createContext, useContext, createSignal, createMemo, type ParentComponent } from "solid-js";

export type Lang = "en" | "my" | "cn";

export const LANG_META: Record<Lang, { label: string; flag: string }> = {
  en: { label: "English", flag: "EN" },
  my: { label: "Bahasa Melayu", flag: "MY" },
  cn: { label: "中文", flag: "CN" },
};

export type StringMap = Record<string, string>;

const REGISTRY: Record<string, { en: StringMap; my: StringMap; cn: StringMap }> = {};

export function registerSection(section: string, en: StringMap, my?: StringMap, cn?: StringMap) {
  REGISTRY[section] = { en, my: my || {}, cn: cn || {} };
}

const LANG_KEY = "uiden_lang";

const LangCtx = createContext<{
  lang: () => Lang;
  setLang: (l: Lang) => void;
}>();

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export function useT(section: string) {
  const { lang } = useLang();
  return createMemo(() => {
    const entry = REGISTRY[section];
    if (!entry) return {} as StringMap;
    const l = lang();
    const base = entry.en;
    const overlay = l === "en" ? {} : entry[l] || {};
    const out: StringMap = {};
    for (const k of Object.keys(base)) out[k] = overlay[k] || base[k];
    return out;
  });
}

export const LangProvider: ParentComponent = (props) => {
  const [lang, setLangRaw] = createSignal<Lang>(
    (localStorage.getItem(LANG_KEY) as Lang) || "en"
  );
  const setLang = (l: Lang) => { setLangRaw(l); localStorage.setItem(LANG_KEY, l); };
  return <LangCtx.Provider value={{ lang, setLang }}>{props.children}</LangCtx.Provider>;
};

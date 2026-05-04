import { createSignal, createEffect, onMount, createContext, useContext, type ParentComponent } from "solid-js";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: () => Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}>();

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export const ThemeProvider: ParentComponent = (props) => {
  const [theme, setTheme] = createSignal<Theme>("dark");

  onMount(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  });

  createEffect(() => {
    const t = theme();
    document.documentElement.classList.toggle("light", t === "light");
    localStorage.setItem("theme", t);
  });

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

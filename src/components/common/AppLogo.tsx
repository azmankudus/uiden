import { createMemo, onMount, createSignal } from "solid-js";

const cache = new Map<string, string>();

export default function AppLogo(props: { slug: string; size?: number; class?: string }) {
  const s = () => props.size || 40;
  const [loaded, setLoaded] = createSignal("");

  onMount(() => {
    const cached = cache.get(props.slug);
    if (cached) {
      setLoaded(cached);
      return;
    }
    fetch(`/ui/icons/${props.slug}.svg`)
      .then((r) => r.text())
      .then((text) => {
        cache.set(props.slug, text);
        setLoaded(text);
      })
      .catch(() => {});
  });

  const html = createMemo(() => {
    const svg = loaded();
    if (!svg) return "";
    return svg
      .replace(/width="\d+"/, `width="${s()}"`)
      .replace(/height="\d+"/, `height="${s()}"`);
  });

  return (
    <span
      class={`inline-flex items-center justify-center flex-shrink-0 ${props.class || ""}`}
      style={{ width: `${s()}px`, height: `${s()}px` }}
      innerHTML={html()}
    />
  );
}

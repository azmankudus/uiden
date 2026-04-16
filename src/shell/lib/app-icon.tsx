import { createMemo, mergeProps } from "solid-js";
import { buildIconSVG } from "./icons";

interface AppIconProps {
  icon: string;
  size?: number;
  class?: string;
  style?: string | Record<string, string>;
}

export default function AppIcon(props: AppIconProps) {
  const merged = mergeProps({ size: 24 }, props);
  const html = createMemo(() => {
    const result = buildIconSVG(merged.icon, { width: merged.size, height: merged.size });
    if (!result) return "";
    const attrs = Object.entries(result.attrs)
      .map(([k, v]) => `${k}="${v}"`)
      .join(" ");
    return `<svg ${attrs}>${result.body}</svg>`;
  });

  return (
    <span
      class={merged.class}
      style={merged.style}
      innerHTML={html()}
    />
  );
}

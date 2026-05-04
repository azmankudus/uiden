import { createMemo } from "solid-js";
import type { AppDef } from "~/lib/apps/apps";

export function createFilteredApps(
  source: () => AppDef[],
  query: () => string,
) {
  return createMemo(() => {
    const q = query().toLowerCase().trim();
    const base = source();
    if (!q) return base;
    return base.filter(
      (a) => a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)
    );
  });
}

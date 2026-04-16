export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function appColor(idx: number) {
  const h = (idx * 137.508) % 360;
  const s = 72 + (idx % 3) * 6;
  const l = 56 + (idx % 4) * 4;
  return {
    bg: `hsla(${h}, ${s}%, ${l}%, 0.13)`,
    border: `hsla(${h}, ${s}%, ${l}%, 0.28)`,
    text: `hsl(${h}, ${s}%, ${l}%)`,
  };
}

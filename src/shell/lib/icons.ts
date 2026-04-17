import { getIconData, iconToSVG } from "@iconify/utils";
import type { IconifyIcon, IconifyJSON } from "@iconify/utils";
import lucideFull from "@iconify-json/lucide/icons.json";

const USED_LUCIDE_ICONS = [
  "wind", "search", "x", "circle-question-mark", "sun", "moon", "log-in", "fingerprint",
  "shield", "cpu", "database", "globe", "zap", "lock", "bar-chart-3",
  "settings", "layers", "terminal", "mail", "camera", "calendar", "bell",
  "book-open", "briefcase", "cloud", "compass", "credit-card", "rocket",
  "scroll-text", "key-round", "globe-lock", "box", "satellite", "hard-drive",
  "network", "activity", "git-branch", "list-ordered", "text-cursor-input",
  "flask-conical", "wifi", "map-pin", "message-circle", "languages",
  "brain", "droplets", "package", "radar", "piggy-bank", "shield-check",
  "siren", "git-merge", "tag", "share-2", "trending-up", "radio",
  "scan-text", "mic", "eye", "eye-off", "signature", "clipboard-list",
  "notebook-pen", "headset", "kanban", "clock", "video", "monitor",
  "rss", "bookmark", "key", "link", "qr-code", "file-text", "table",
  "presentation", "code", "plug", "table-2", "heart-pulse", "gauge",
  "badge-check", "inbox", "calendar-days", "contact", "receipt", "wallet",
  "package-search", "truck", "line-chart", "grid-3x3", "film", "users",
  "palette", "image", "type", "pipette", "shapes", "layout-grid", "workflow",
  "brain-circuit", "pencil", "sticky-note", "list-todo", "target", "timer",
  "file-code-2", "file-archive", "file-pen", "git-compare", "file-code",
  "chevron-right", "search-x",
  "user", "building-2", "user-plus", "arrow-left", "mail-check",
  "circle-alert", "log-out", "circle-user",
  "layout-dashboard", "boxes", "phone", "info", "chevron-down",
  "panel-left-close", "panel-left-open", "command", "arrow-right",
  "check", "send", "message-square", "folder", "home", "drumstick",
  "maximize", "minimize", "paintbrush", "sparkles",
  "smartphone", "at-sign", "upload", "bell-ring", "trash-2",
  "user-cog", "plus", "filter", "shield-half", "toggle-left", "toggle-right",
  "chevrons-up-down", "external-link", "more-horizontal", "crown", "user-check",
  "user-x", "search-check",
  "folder-search", "server", "play", "triangle-alert", "ticket", "warehouse",
  "dice-5",
  "refresh-cw", "scan",
  "wrench",
  "pause", "hash", "trophy", "flag",
  "download", "pie-chart",
];

function extractIcons(full: IconifyJSON, names: string[]): IconifyJSON {
  const partial: IconifyJSON = { prefix: full.prefix, icons: {} };
  let w = full.width;
  let h = full.height;
  for (const name of names) {
    const icon = full.icons[name];
    if (!icon) continue;
    partial.icons[name] = icon;
    if (icon.width) w = icon.width;
    if (icon.height) h = icon.height;
  }
  if (w) partial.width = w;
  if (h) partial.height = h;
  return partial;
}

const lucideSubset = extractIcons(lucideFull, USED_LUCIDE_ICONS);

const registry: Record<string, IconifyJSON> = {
  lucide: lucideSubset,
};

export function resolveIcon(name: string): IconifyIcon | null {
  const sep = name.indexOf(":");
  if (sep < 0) return null;
  const prefix = name.slice(0, sep);
  const iconName = name.slice(sep + 1);
  const set = registry[prefix];
  if (!set) return null;
  return getIconData(set, iconName) ?? null;
}

export interface IconSVG {
  attrs: Record<string, string>;
  body: string;
}

export function buildIconSVG(
  name: string,
  options?: { width?: number; height?: number }
): IconSVG | null {
  const data = resolveIcon(name);
  if (!data) return null;
  const { attributes, body } = iconToSVG(data, {
    width: options?.width ?? data.width ?? 24,
    height: options?.height ?? data.height ?? 24,
  });
  return {
    attrs: attributes as Record<string, string>,
    body,
  };
}

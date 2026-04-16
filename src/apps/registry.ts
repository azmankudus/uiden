import type { AppConfig } from "./types";
import ayamGoreng from "./ayam-goreng/config";

const registry: Record<string, AppConfig> = {
  "ayam-goreng": ayamGoreng,
};

export function getApp(slug: string): AppConfig | undefined {
  return registry[slug];
}

export function getAllApps(): AppConfig[] {
  return Object.values(registry);
}

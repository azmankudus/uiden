import type { AppConfig } from "../types";
import { APPS } from "~/gateway/lib/apps";
import ayamGoreng from "./ayam-goreng/config";

const registry: Record<string, AppConfig> = {
  "ayam-goreng": ayamGoreng,
};

for (const app of APPS) {
  if (!registry[app.slug]) {
    registry[app.slug] = {
      slug: app.slug,
      name: app.name,
      icon: app.icon,
      defaultRoute: "public",
      nav: [
        { label: "Dashboard", icon: "lucide:layout-dashboard", path: `/${app.slug}/private` },
        { label: "App Launcher", icon: "lucide:layout-grid", path: "/landing" },
      ],
      publicNav: [],
      search: { public: [], private: [] },
    };
  }
}

export function getApp(slug: string): AppConfig | undefined {
  return registry[slug];
}

export function getAllApps(): AppConfig[] {
  return Object.values(registry);
}

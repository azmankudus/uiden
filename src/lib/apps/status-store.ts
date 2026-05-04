import { createSignal } from "solid-js";
import { APPS } from "~/lib/apps/apps";

export type ManageStatus = "online" | "error" | "down" | "hide" | "maintenance";

export interface AppStatusEntry {
  slug: string;
  status: ManageStatus;
  maintenanceFrom?: string;
  maintenanceTo?: string;
}

const [statusMap, setStatusMap] = createSignal<Record<string, AppStatusEntry>>(
  Object.fromEntries(APPS.map(a => [a.slug, { slug: a.slug, status: "online" as ManageStatus }]))
);

export const AppStatusStore = {
  statusMap,
  getStatus: (slug: string): AppStatusEntry => {
    return statusMap()[slug] || { slug, status: "online" };
  },
  setStatus: (slug: string, status: ManageStatus, maintenanceFrom?: string, maintenanceTo?: string) => {
    setStatusMap(prev => ({
      ...prev,
      [slug]: {
        slug,
        status,
        ...(status === "maintenance" ? { maintenanceFrom, maintenanceTo } : {}),
      },
    }));
  },
  resetStatus: (slug: string) => {
    setStatusMap(prev => ({
      ...prev,
      [slug]: { slug, status: "online" },
    }));
  },
  counts: () => {
    const map = statusMap();
    const counts: Record<ManageStatus, number> = { online: 0, error: 0, down: 0, hide: 0, maintenance: 0 };
    for (const entry of Object.values(map)) {
      counts[entry.status]++;
    }
    return counts;
  },
  isAppVisible: (slug: string): boolean => {
    return statusMap()[slug]?.status !== "hide";
  },
  toLegacyStatus: (slug: string): "ok" | "down" | "maintenance" => {
    const s = statusMap()[slug]?.status;
    if (s === "online") return "ok";
    if (s === "down" || s === "error") return "down";
    if (s === "maintenance") return "maintenance";
    return "ok";
  },
};

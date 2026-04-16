import { For } from "solid-js";
import { A } from "@solidjs/router";
import PrivateLayout from "~/components/sample/PrivateLayout";
import AppIcon from "~/components/AppIcon";

const adminCards = [
  {
    icon: "lucide:users",
    label: "Users & Groups",
    desc: "Manage team members, groups, and invitations",
    href: "/sample/private/admin/users",
    color: "#3b82f6",
  },
  {
    icon: "lucide:shield-check",
    label: "Roles & Permissions",
    desc: "Configure access levels and permission policies",
    href: "/sample/private/admin/roles",
    color: "#10b981",
  },
  {
    icon: "lucide:settings",
    label: "System Settings",
    desc: "Application configuration and preferences",
    href: "/sample/private/admin/settings",
    color: "#8b5cf6",
  },
  {
    icon: "lucide:scroll-text",
    label: "Audit Log",
    desc: "Track system events and user actions",
    href: "/sample/private/admin/audit",
    color: "#f59e0b",
  },
  {
    icon: "lucide:credit-card",
    label: "License & Billing",
    desc: "Subscription plans, invoices, and usage",
    href: "/sample/private/admin",
    color: "#f43f5e",
  },
];

export default function AdminIndex() {
  return (
    <PrivateLayout>
      <div class="max-w-6xl mx-auto page-enter">
        <div class="mb-8">
          <h1 class="font-display text-2xl font-bold text-text-primary">Administration</h1>
          <p class="text-sm text-text-secondary mt-1">Manage users, security, and platform settings.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={adminCards}>
            {(card) => (
              <A
                href={card.href}
                class="group p-6 rounded-2xl bg-surface-1 border border-surface-3/30 hover:border-brand/30 transition-all"
              >
                <div
                  class="flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                  style={{ "background-color": card.color + "18" }}
                >
                  <AppIcon icon={card.icon} size={20} style={{ color: card.color }} />
                </div>
                <h3 class="font-display text-sm font-semibold text-text-primary mb-1">{card.label}</h3>
                <p class="text-xs text-text-secondary leading-relaxed">{card.desc}</p>
                <div class="flex items-center gap-1 mt-4 text-xs text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Open</span>
                  <AppIcon icon="lucide:arrow-right" size={12} />
                </div>
              </A>
            )}
          </For>
        </div>
      </div>
    </PrivateLayout>
  );
}

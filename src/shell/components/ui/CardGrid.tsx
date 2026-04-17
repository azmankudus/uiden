import { For } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";
import { Show } from "solid-js";

interface CardGridItem {
  icon: string;
  label: string;
  desc: string;
  href: string;
  color: string;
}

interface CardGridProps {
  cards: CardGridItem[];
}

export default function CardGrid(props: CardGridProps) {
  return (
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <For each={props.cards}>
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
  );
}

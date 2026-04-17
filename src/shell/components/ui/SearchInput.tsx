import AppIcon from "~/shell/lib/app-icon";

interface SearchInputProps {
  value: string;
  onInput: (v: string) => void;
  placeholder?: string;
}

export default function SearchInput(props: SearchInputProps) {
  return (
    <div class="relative">
      <AppIcon
        icon="lucide:search"
        size={16}
        class="absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: "var(--color-text-muted)" }}
      />
      <input
        type="text"
        placeholder={props.placeholder || "Search..."}
        value={props.value}
        onInput={(e) => props.onInput(e.currentTarget.value)}
        class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-1 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand/50"
      />
    </div>
  );
}

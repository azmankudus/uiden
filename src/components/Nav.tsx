import { A } from "@solidjs/router";
import { Icon } from "@iconify-icon/solid";

export default function Nav() {
  return (
    <nav class="flex items-center gap-2 px-6 py-3 border-b border-gray-200 dark:border-gray-800">
      <A href="/" class="flex items-center gap-2 text-lg font-semibold tracking-tight">
        <Icon icon="lucide:wind" width="24" />
        <span>Kentut SuperApp</span>
      </A>
    </nav>
  );
}

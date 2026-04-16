import { useNavigate } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";
import { useAuth } from "~/shell/context/auth";
import UserActions from "~/shell/components/UserActions";

export default function TopBar() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div class="fixed top-0 left-0 right-0 z-50">
      <div class="flex items-center justify-between px-4 py-3 bg-surface-0/10 backdrop-blur-xl border-surface-3/40">
        <button
          type="button"
          onClick={() => navigate(auth.isLoggedIn() ? "/landing" : "/")}
          class="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-surface-1"
        >
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-dim">
            <AppIcon icon="lucide:wind" size={18} style={{ color: "var(--color-brand)" }} />
          </div>
          <span class="font-display text-base font-bold tracking-tight">
            <span style={{ color: "var(--color-brand)" }}>Kentut</span>{" "}
            <span class="text-text-primary">SuperApp</span>
          </span>
        </button>
        <UserActions />
      </div>
    </div>
  );
}

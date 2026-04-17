import { createSignal, onMount } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";
import AppLogo from "~/shell/lib/app-logo";
import { useAuth } from "~/shell/context/auth";

export default function Home() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    if (auth.isLoggedIn()) {
      navigate("/landing", { replace: true });
      return;
    }
    requestAnimationFrame(() => setMounted(true));
  });

  return (
    <div class="min-h-dvh bg-surface-0 flex items-center justify-center overflow-hidden">
      <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-25 blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)" }}
        />
        <div
          class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        />
      </div>

      <div
        class="relative z-10 w-full max-w-sm mx-auto px-6 py-12 text-center"
        classList={{
          "animate-fade-up": mounted(),
          "opacity-0": !mounted(),
        }}
      >
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 animate-float animate-pulse-glow">
          <AppLogo slug="superapp" size={80} />
        </div>

        <h1 class="font-display text-6xl font-extrabold tracking-tight mb-2">
          <span style={{ color: "var(--color-brand)" }}>Kentut</span>
        </h1>
        <p class="text-text-secondary text-xl mb-10">SuperApp</p>

        <A
          href="/user/login"
          class="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl font-semibold text-base bg-brand text-surface-0 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-brand/20"
        >
          <AppIcon icon="lucide:log-in" size={20} />
          Login
        </A>
      </div>
    </div>
  );
}

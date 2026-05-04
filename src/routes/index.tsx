import { createSignal, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { BRAND, ROUTES } from "~/lib/common/branding";

export default function Splash() {
  const navigate = useNavigate();
  const [phase, setPhase] = createSignal<"hidden" | "enter" | "exit">("hidden");

  const lockScroll = () => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  onMount(() => {
    lockScroll();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase("enter");
      });
    });

    setTimeout(() => {
      setPhase("exit");
      setTimeout(() => {
        unlockScroll();
        navigate(ROUTES.apps, { replace: true });
      }, 450);
    }, 1200);
  });

  onCleanup(unlockScroll);

  return (
    <div class="min-h-dvh bg-surface-0 flex items-center justify-center">
      <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div class="ambient-bg" />
      </div>

      <div
        class="relative z-10 text-center"
        classList={{
          "opacity-0": phase() === "hidden",
          "brand-enter": phase() === "enter",
          "brand-exit": phase() === "exit",
        }}
      >
        <h1 class="font-display text-6xl font-extrabold tracking-tight mb-2">
          <span style={{ color: "var(--color-brand)" }}>{BRAND.shortName}</span>
        </h1>
        <p class="text-text-secondary text-xl">{BRAND.tagline}</p>
      </div>
    </div>
  );
}

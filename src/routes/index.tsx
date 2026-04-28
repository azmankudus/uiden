import { createSignal, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function Home() {
  const navigate = useNavigate();
  const [phase, setPhase] = createSignal<"hidden" | "enter" | "exit">("hidden");

  const isBrowser = typeof document !== "undefined";

  const lockScroll = () => {
    if (!isBrowser) return;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    if (!isBrowser) return;
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
        navigate("/apps", { replace: true });
      }, 500);
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
          <span style={{ color: "var(--color-brand)" }}>Kentut</span>
        </h1>
        <p class="text-text-secondary text-xl">SuperApp</p>
      </div>
    </div>
  );
}

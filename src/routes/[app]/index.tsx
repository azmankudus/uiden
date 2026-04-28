import { useParams, useNavigate } from "@solidjs/router";
import { createSignal, onMount, onCleanup } from "solid-js";
import { getApp } from "~/apps/registry";
import { APPS, getBrandColor } from "~/gateway/lib/apps";
import AppLogo from "~/shell/lib/app-logo";

export default function AppIndex() {
  const params = useParams();
  const navigate = useNavigate();
  const app = getApp(params.app);
  const exists = APPS.some((a) => a.slug === params.app);
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
        if (app) {
          navigate(`/${app.slug}/${app.defaultRoute}`, { replace: true });
        } else if (exists) {
          navigate(`/${params.app}/public`, { replace: true });
        }
      }, 500);
    }, 1200);
  });

  onCleanup(unlockScroll);

  const appName = app?.name || params.app;
  const appSlug = app?.slug || params.app;
  const brandColor = getBrandColor(appSlug);

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
        <div class="flex items-center justify-center mb-4">
          <AppLogo slug={appSlug} size={72} />
        </div>
        <h1 class="font-display text-5xl font-extrabold tracking-tight">
          <span style={{ color: brandColor }}>{appName}</span>
        </h1>
      </div>
    </div>
  );
}

import { createSignal, onMount } from "solid-js";
import { A } from "@solidjs/router";
import AppIcon from "~/components/AppIcon";

export default function Register() {
  const [mounted, setMounted] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false);

  onMount(() => {
    requestAnimationFrame(() => setMounted(true));
  });

  return (
    <div class="min-h-dvh bg-surface-0 flex items-center justify-center overflow-hidden">
      <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        />
      </div>

      <div
        class="relative z-10 w-full max-w-md mx-auto px-6 py-12"
        classList={{
          "animate-fade-up": mounted(),
          "opacity-0": !mounted(),
        }}
      >
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-dim border border-accent/20 mb-4">
            <AppIcon icon="lucide:user-plus" size={28} style={{ color: "var(--color-accent)" }} />
          </div>
          <h1 class="font-display text-2xl font-bold tracking-tight text-text-primary">
            Create an account
          </h1>
          <p class="text-text-secondary mt-2 text-sm">
            Get access to the full Kentut SuperApp suite.
          </p>
        </div>

        <div class="bg-surface-1/80 backdrop-blur-sm border border-surface-3/60 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={(e) => e.preventDefault()} class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">First name</label>
                <input
                  type="text"
                  placeholder="John"
                  autocomplete="given-name"
                  class="w-full bg-surface-0 border border-surface-3 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">Last name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  autocomplete="family-name"
                  class="w-full bg-surface-0 border border-surface-3 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  <AppIcon icon="lucide:mail" size={18} />
                </span>
                <input
                  type="email"
                  placeholder="you@company.com"
                  autocomplete="email"
                  required
                  class="w-full bg-surface-0 border border-surface-3 rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  <AppIcon icon="lucide:lock" size={18} />
                </span>
                <input
                  type={showPassword() ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  autocomplete="new-password"
                  required
                  class="w-full bg-surface-0 border border-surface-3 rounded-xl pl-10 pr-11 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition"
                >
                  <AppIcon icon={showPassword() ? "lucide:eye-off" : "lucide:eye"} size={18} />
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Confirm password</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  <AppIcon icon="lucide:lock" size={18} />
                </span>
                <input
                  type={showPassword() ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autocomplete="new-password"
                  required
                  class="w-full bg-surface-0 border border-surface-3 rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
                />
              </div>
            </div>

            <label class="flex items-start gap-2.5 cursor-pointer pt-1">
              <input type="checkbox" required class="w-4 h-4 mt-0.5 rounded border-surface-3 accent-brand" />
              <span class="text-sm text-text-secondary leading-snug">
                I agree to the{" "}
                <button type="button" class="text-brand hover:underline underline-offset-2">Terms of Service</button>{" "}
                and{" "}
                <button type="button" class="text-brand hover:underline underline-offset-2">Privacy Policy</button>
              </span>
            </label>

            <button
              type="submit"
              class="w-full py-3 rounded-xl font-semibold text-base bg-brand text-surface-0 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-brand/20"
            >
              Create account
            </button>
          </form>
        </div>

        <p class="text-center mt-6 text-sm text-text-muted">
          Already have an account?{" "}
          <A href="/login" class="text-brand font-medium hover:underline underline-offset-2">
            Sign in
          </A>
        </p>
      </div>
    </div>
  );
}

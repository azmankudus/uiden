import { createSignal, onMount, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import Section from "~/components/common/Section";
import Toggle from "~/components/common/Toggle";
import Button from "~/components/common/Button";
import Badge from "~/components/common/Badge";
import PrivateLayout from "~/components/common/PrivateLayout";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { usersNav } from "~/lib/users/nav";

export default function SecurityPage() {
  const { requireAuth } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [toast, setToast] = createSignal(false);
  const [twoFactor, setTwoFactor] = createSignal(false);

  onMount(() => {
    if (!requireAuth()) return;
    requestAnimationFrame(() => setMounted(true));
  });

  const showSaved = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name="Security" icon="lucide:shield" slug="superapp" sections={usersNav}>
        <div classList={{ "animate-fade-up": mounted(), "opacity-0": !mounted() }}>
          <div class="space-y-4">
            <Section title="Two-Factor Authentication" icon="lucide:shield" description="Add an extra layer of security to your account">
              <Toggle
                checked={twoFactor()}
                onChange={setTwoFactor}
                label="Enable 2FA"
                description={twoFactor() ? "Two-factor authentication is enabled" : "Protect your account with an authenticator app"}
              />
            </Section>

            <Section title="Active Sessions" icon="lucide:monitor" description="Devices currently signed in to your account">
              <div class="space-y-2">
                <div class="flex items-center justify-between p-3 rounded-lg bg-surface-0 border border-surface-3/30">
                  <div class="flex items-center gap-3">
                    <AppIcon icon="lucide:monitor" size={18} style={{ color: "var(--color-brand)" }} />
                    <div>
                      <div class="text-sm text-text-primary">Current Session</div>
                      <div class="text-xs text-text-muted">Chrome on Linux — Active now</div>
                    </div>
                  </div>
                  <Badge label="Active" variant="success" />
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg bg-surface-0 border border-surface-3/30">
                  <div class="flex items-center gap-3">
                    <AppIcon icon="lucide:smartphone" size={18} style={{ color: "var(--color-text-muted)" }} />
                    <div>
                      <div class="text-sm text-text-primary">Mobile App</div>
                      <div class="text-xs text-text-muted">iOS — 2 hours ago</div>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={showSaved}>Revoke</Button>
                </div>
              </div>
            </Section>

            <Section title="Danger Zone" icon="lucide:triangle-alert" description="Irreversible actions — proceed with caution">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm text-text-primary">Sign Out Everywhere</div>
                    <div class="text-xs text-text-muted">End all active sessions except this one</div>
                  </div>
                  <Button variant="danger" onClick={showSaved}>Sign Out Everywhere</Button>
                </div>
                <div class="border-t border-surface-3/30 my-2" />
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm text-text-primary">Delete Account</div>
                    <div class="text-xs text-text-muted">Permanently delete your account and all data</div>
                  </div>
                  <Button variant="danger" onClick={showSaved}>Delete Account</Button>
                </div>
              </div>
            </Section>
          </div>
        </div>

        <Show when={toast()}>
          <div class="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand/90 backdrop-blur-sm text-surface-0 text-sm font-medium shadow-lg">
              <AppIcon icon="lucide:check" size={16} />
              Saved
            </div>
          </div>
        </Show>
      </PrivateLayout>
    </Show>
  );
}

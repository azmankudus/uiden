import { createSignal, onMount, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import Section from "~/components/common/Section";
import Toggle from "~/components/common/Toggle";
import Button from "~/components/common/Button";
import Badge from "~/components/common/Badge";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { getUsersNav } from "~/lib/users/nav";
import { useT } from "~/lib/common/i18n";

export default function SecurityPage() {
  const t = useT("users");
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
      <PrivateLayout name={t().securityTitle} icon="lucide:shield" slug="superapp" sections={getUsersNav(t)}>
        <div class="pb-12 space-y-4 animate-fade-up">
          <PageHeader title={t().securityTitle} icon="lucide:shield" />

          <Section title={t().twoFactor} icon="lucide:shield" description={t().twoFactorDesc}>
            <Toggle
              checked={twoFactor()}
              onChange={setTwoFactor}
              label={t().enable2fa}
              description={twoFactor() ? t().disable2faDesc : t().enable2faDesc}
            />
          </Section>

          <Section title={t().activeSessions} icon="lucide:monitor" description={t().activeSessionsDesc}>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-3 rounded-lg bg-surface-0 border border-surface-3/30">
                <div class="flex items-center gap-3">
                  <AppIcon icon="lucide:monitor" size={18} style={{ color: "var(--color-brand)" }} />
                  <div>
                    <div class="text-sm text-text-primary">{t().currentSession}</div>
                    <div class="text-xs text-text-muted">{t().chromeLinuxActive}</div>
                  </div>
                </div>
                <Badge label={t().badgeActive} variant="success" />
              </div>
              <div class="flex items-center justify-between p-3 rounded-lg bg-surface-0 border border-surface-3/30">
                <div class="flex items-center gap-3">
                  <AppIcon icon="lucide:smartphone" size={18} style={{ color: "var(--color-text-muted)" }} />
                  <div>
                    <div class="text-sm text-text-primary">{t().mobileApp}</div>
                    <div class="text-xs text-text-muted">{t().iosTwoHoursAgo}</div>
                  </div>
                </div>
                <Button variant="ghost" onClick={showSaved}>{t().revoke}</Button>
              </div>
            </div>
          </Section>

          <Section title={t().dangerZone} icon="lucide:triangle-alert" description={t().dangerDesc}>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-sm text-text-primary">{t().signOutEverywhere}</div>
                  <div class="text-xs text-text-muted">{t().signOutEverywhereDesc}</div>
                </div>
                <Button variant="danger" onClick={showSaved}>{t().signOutEverywhere}</Button>
              </div>
              <div class="border-t border-surface-3/30 my-2" />
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-sm text-text-primary">{t().deleteAccount}</div>
                  <div class="text-xs text-text-muted">{t().deleteAccountDesc}</div>
                </div>
                <Button variant="danger" onClick={showSaved}>{t().deleteAccount}</Button>
              </div>
            </div>
          </Section>
        </div>

        <Show when={toast()}>
          <div class="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand/90 backdrop-blur-sm text-surface-0 text-sm font-medium shadow-lg">
              <AppIcon icon="lucide:check" size={16} />
              {t().saved}
            </div>
          </div>
        </Show>
      </PrivateLayout>
    </Show>
  );
}

import { createSignal, onMount, Show } from "solid-js";
import AppIcon from "~/components/common/AppIcon";
import Section from "~/components/common/Section";
import Input from "~/components/common/Input";
import Textarea from "~/components/common/Textarea";
import Button from "~/components/common/Button";
import Select from "~/components/common/Select";
import PrivateLayout from "~/components/common/PrivateLayout";
import PageHeader from "~/components/common/PageHeader";
import { useAuth } from "~/lib/common/auth";
import { useAuthGuard } from "~/lib/common/auth-guard";
import { getUsersNav } from "~/lib/users/nav";
import { useT } from "~/lib/common/i18n";

const TIMEZONES = ["UTC", "US/Eastern", "US/Pacific", "Europe/London", "Asia/Tokyo", "Asia/Jakarta"].map((tz) => ({ label: tz, value: tz }));

export default function ProfilePage() {
  const t = useT("users");
  const auth = useAuth();
  const { requireAuth } = useAuthGuard();
  const [mounted, setMounted] = createSignal(false);
  const [toast, setToast] = createSignal(false);
  const [fullName, setFullName] = createSignal("");
  const [nickname, setNickname] = createSignal("");
  const [bio, setBio] = createSignal("");
  const [location, setLocation] = createSignal("");
  const [timezone, setTimezone] = createSignal("UTC");

  onMount(() => {
    if (!requireAuth()) return;
    setFullName(auth.user()!.displayName);
    requestAnimationFrame(() => setMounted(true));
  });

  const showSaved = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <Show when={mounted()}>
      <PrivateLayout name={t().profileTitle} icon="lucide:circle-user" slug="superapp" sections={getUsersNav(t)}>
        <div class="pb-12 animate-fade-up">
          <PageHeader title={t().profileTitle} icon="lucide:circle-user" />

          <Section title={t().profileDetails} icon="lucide:circle-user" description={t().profileDesc}>
            <div class="space-y-3">
              <Input label={t().fullName} value={fullName()} onInput={setFullName} placeholder={t().phYourFullName} />
              <Input label={t().nickname} value={nickname()} onInput={setNickname} placeholder={t().phPreferredName} />
              <Textarea label={t().bio} value={bio()} onInput={setBio} rows={3} placeholder={t().phTellAboutYourself} />
              <div class="grid grid-cols-2 gap-3">
                <Input label={t().location} value={location()} onInput={setLocation} placeholder={t().phCityCountry} />
                <Select label={t().timezone} value={timezone()} onChange={setTimezone} options={TIMEZONES} />
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <Button onClick={showSaved}>{t().saveProfile}</Button>
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

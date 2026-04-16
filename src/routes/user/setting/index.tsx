import { createSignal, onMount, onCleanup, Show, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AppIcon from "~/shell/lib/app-icon";
import { useAuth } from "~/shell/context/auth";
import { useTheme } from "~/shell/context/theme";
import { usePersonalization, type ColorTheme, type BgPattern, type ContentWidth, type AppLanguage } from "~/shell/context/personalization";
import PrivateLayout from "~/shell/layouts/PrivateLayout";
import type { NavItem } from "~/shell/components/SideNav";
import type { SearchItem } from "~/shell/components/SearchBar";

const colorThemes: { label: string; color: string; value: ColorTheme }[] = [
  { label: "Green", color: "#06d6a0", value: "green" },
  { label: "Blue", color: "#3b82f6", value: "blue" },
  { label: "Purple", color: "#8b5cf6", value: "purple" },
  { label: "Rose", color: "#f43f5e", value: "rose" },
  { label: "Amber", color: "#f59e0b", value: "amber" },
  { label: "Cyan", color: "#06b6d4", value: "cyan" },
];

const bgPatterns: { label: string; value: BgPattern }[] = [
  { label: "None", value: "none" },
  { label: "Dots", value: "dots" },
  { label: "Grid", value: "grid" },
  { label: "Diagonal", value: "diagonal" },
];

const languages: { label: string; value: AppLanguage }[] = [
  { label: "English", value: "en" },
  { label: "Bahasa Indonesia", value: "id" },
  { label: "日本語", value: "ja" },
  { label: "中文", value: "zh" },
];

const contentWidths: { label: string; value: ContentWidth; icon: string }[] = [
  { label: "Centered", value: "centered", icon: "lucide:minimize" },
  { label: "Wide", value: "wide", icon: "lucide:maximize" },
];

const modes = [
  { label: "Dark", value: "dark", icon: "lucide:moon" },
  { label: "Light", value: "light", icon: "lucide:sun" },
];

const timezones = [
  "(UTC+00:00) London", "(UTC+01:00) Paris", "(UTC+02:00) Cairo",
  "(UTC+07:00) Jakarta", "(UTC+08:00) Singapore", "(UTC+08:00) Shanghai",
  "(UTC+09:00) Tokyo", "(UTC+09:30) Sydney", "(UTC-05:00) New York", "(UTC-08:00) Los Angeles",
];

function Field(props: { label: string; hint?: string; children: any }) {
  return (
    <div>
      <label class="block text-xs font-medium text-text-secondary mb-1.5">{props.label}</label>
      {props.children}
      {props.hint && <p class="text-[11px] text-text-muted mt-1">{props.hint}</p>}
    </div>
  );
}

function Section(props: { title: string; icon: string; description?: string; children: any }) {
  return (
    <div class="p-5 rounded-2xl bg-surface-1 border border-surface-3/30">
      <div class="flex items-center gap-2.5 mb-1">
        <AppIcon icon={props.icon} size={18} style={{ color: "var(--color-brand)" }} />
        <h2 class="font-display text-sm font-semibold text-text-primary">{props.title}</h2>
      </div>
      {props.description && <p class="text-xs text-text-muted mb-4 ml-7">{props.description}</p>}
      {!props.description && <div class="mb-3" />}
      {props.children}
    </div>
  );
}

export default function UserSettingPage() {
  const auth = useAuth();
  const { theme, setTheme } = useTheme();
  const p = usePersonalization();
  const navigate = useNavigate();
  const [mounted, setMounted] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal("account");
  const [saved, setSaved] = createSignal(false);

  const [email, setEmail] = createSignal("admin@kentut.superapp");
  const [currentPassword, setCurrentPassword] = createSignal("");
  const [newPassword, setNewPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);

  const [fullName, setFullName] = createSignal("");
  const [nickname, setNickname] = createSignal("");
  const [birthDate, setBirthDate] = createSignal("");
  const [location, setLocation] = createSignal("");
  const [bio, setBio] = createSignal("");
  const [timezone, setTimezone] = createSignal("(UTC+07:00) Jakarta");
  const [emailNotif, setEmailNotif] = createSignal(true);
  const [mfaEnabled, setMfaEnabled] = createSignal(false);

  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  onMount(() => {
    if (!auth.isLoggedIn()) { navigate("/user/login", { replace: true }); return; }
    const u = auth.user();
    if (u) { setFullName(u.displayName); setNickname(u.username); setEmail(`${u.username}@kentut.superapp`); }
    const s = localStorage.getItem("kentutsuperapp_profile");
    if (s) { try { const d = JSON.parse(s); if (d.bio) setBio(d.bio); if (d.location) setLocation(d.location); if (d.birthDate) setBirthDate(d.birthDate); if (d.timezone) setTimezone(d.timezone); if (d.emailNotif !== undefined) setEmailNotif(d.emailNotif); if (d.mfaEnabled !== undefined) setMfaEnabled(d.mfaEnabled); } catch {} }
    const syncHash = () => {
      const h = window.location.hash.slice(1) || "account";
      setActiveTab(h);
      if (!window.location.hash) window.history.replaceState(null, "", "/user/setting#account");
    };
    syncHash();
    requestAnimationFrame(() => setMounted(true));
    window.addEventListener("hashchange", syncHash);
    onCleanup(() => window.removeEventListener("hashchange", syncHash));
  });

  const saveProfile = () => {
    localStorage.setItem("kentutsuperapp_profile", JSON.stringify({ bio: bio(), location: location(), birthDate: birthDate(), timezone: timezone(), emailNotif: emailNotif(), mfaEnabled: mfaEnabled() }));
    flash();
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-surface-3/30 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand/50 transition-colors";

  const nav: NavItem[] = [
    { label: "Account", icon: "lucide:circle-user", path: "/user/setting#account", onClick: () => setActiveTab("account") },
    { label: "Profile", icon: "lucide:user", path: "/user/setting#profile", onClick: () => setActiveTab("profile") },
    { label: "Personalization", icon: "lucide:palette", path: "/user/setting#personalization", onClick: () => setActiveTab("personalization") },
    { label: "Notifications", icon: "lucide:bell", path: "/user/setting#notifications", onClick: () => setActiveTab("notifications") },
    { label: "Security", icon: "lucide:shield", path: "/user/setting#security", onClick: () => setActiveTab("security") },
  ];

  const searchItems: SearchItem[] = [
    { label: "User Settings", path: "/user/setting", icon: "lucide:settings", section: "Settings" },
  ];

  return (
    <Show when={mounted()}>
      <PrivateLayout name="User Settings" icon="lucide:settings" slug="ayam-goreng" nav={nav} searchItems={searchItems}>
        <div class="max-w-6xl mx-auto page-enter">
          <Show when={activeTab() === "account"}>
            <div class="space-y-4">
              <Section title="Account Information" icon="lucide:circle-user" description="Your login credentials and account details.">
                <div class="space-y-4">
                  <Field label="Username">
                    <div class="flex items-center gap-2">
                      <span class="text-sm text-text-primary bg-surface-2 px-4 py-2.5 rounded-xl border border-surface-3/30 flex-1">@{auth.user()?.username}</span>
                      <span class="text-[10px] px-2 py-1 rounded-lg bg-surface-2 text-text-muted border border-surface-3/30">Read-only</span>
                    </div>
                  </Field>
                  <Field label="Email Address" hint="Used for notifications and password recovery.">
                    <input type="email" value={email()} onInput={(e) => setEmail(e.currentTarget.value)} class={inputCls} />
                  </Field>
                  <div class="flex justify-end pt-2">
                    <button type="button" onClick={flash} class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">Save Email</button>
                  </div>
                </div>
              </Section>
              <Section title="Change Password" icon="lucide:key-round" description="Update your password to keep your account secure.">
                <div class="space-y-4">
                  <Field label="Current Password">
                    <div class="relative">
                      <input type={showPassword() ? "text" : "password"} value={currentPassword()} onInput={(e) => setCurrentPassword(e.currentTarget.value)} placeholder="Enter current password" class={inputCls + " pr-10"} />
                      <button type="button" onClick={() => setShowPassword((v) => !v)} class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary">
                        <AppIcon icon={showPassword() ? "lucide:eye-off" : "lucide:eye"} size={16} />
                      </button>
                    </div>
                  </Field>
                  <Field label="New Password" hint="Minimum 8 characters with at least one number.">
                    <input type="password" value={newPassword()} onInput={(e) => setNewPassword(e.currentTarget.value)} placeholder="Enter new password" class={inputCls} />
                  </Field>
                  <Field label="Confirm New Password">
                    <input type="password" value={confirmPassword()} onInput={(e) => setConfirmPassword(e.currentTarget.value)} placeholder="Confirm new password" class={inputCls} />
                  </Field>
                  <div class="flex items-center justify-between pt-2">
                    <Show when={newPassword() && confirmPassword() && newPassword() !== confirmPassword()}>
                      <span class="text-xs text-red-400">Passwords do not match</span>
                    </Show>
                    <button type="button" onClick={flash} class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110 ml-auto">Update Password</button>
                  </div>
                </div>
              </Section>
            </div>
          </Show>

          <Show when={activeTab() === "profile"}>
            <div class="space-y-4">
              <Section title="Profile Picture" icon="lucide:image" description="Your avatar is visible to other team members.">
                <div class="flex items-center gap-5">
                  <div class="relative group">
                    <div class="w-20 h-20 rounded-2xl bg-brand-dim border border-brand/20 flex items-center justify-center overflow-hidden">
                      <AppIcon icon="lucide:circle-user" size={40} style={{ color: "var(--color-brand)" }} />
                    </div>
                    <button type="button" class="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <AppIcon icon="lucide:upload" size={20} style={{ color: "white" }} />
                    </button>
                  </div>
                  <div class="space-y-2">
                    <button type="button" class="px-4 py-2 rounded-xl text-xs font-medium bg-surface-2 border border-surface-3/30 text-text-primary hover:bg-surface-3">
                      <span class="flex items-center gap-1.5"><AppIcon icon="lucide:upload" size={14} /> Upload Photo</span>
                    </button>
                    <button type="button" class="px-4 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10">
                      <span class="flex items-center gap-1.5"><AppIcon icon="lucide:trash-2" size={14} /> Remove</span>
                    </button>
                    <p class="text-[11px] text-text-muted">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
              </Section>
              <Section title="Personal Information" icon="lucide:user" description="This information is used across all apps in the platform.">
                <div class="space-y-4">
                  <div class="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name"><input type="text" value={fullName()} onInput={(e) => setFullName(e.currentTarget.value)} class={inputCls} /></Field>
                    <Field label="Nickname"><input type="text" value={nickname()} onInput={(e) => setNickname(e.currentTarget.value)} placeholder="How should we call you?" class={inputCls} /></Field>
                  </div>
                  <div class="grid sm:grid-cols-2 gap-4">
                    <Field label="Birth Date"><input type="date" value={birthDate()} onInput={(e) => setBirthDate(e.currentTarget.value)} class={inputCls} /></Field>
                    <Field label="Location">
                      <div class="relative">
                        <AppIcon icon="lucide:map-pin" size={14} style={{ color: "var(--color-text-muted)", position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                        <input type="text" value={location()} onInput={(e) => setLocation(e.currentTarget.value)} placeholder="City, Country" class={inputCls + " pl-8"} />
                      </div>
                    </Field>
                  </div>
                  <Field label="Bio"><textarea value={bio()} onInput={(e) => setBio(e.currentTarget.value)} placeholder="Tell us about yourself..." rows={3} class={inputCls + " resize-none"} /></Field>
                  <Field label="Timezone">
                    <select value={timezone()} onChange={(e) => setTimezone(e.currentTarget.value)} class={inputCls + " appearance-none"}>
                      <For each={timezones}>{(tz) => <option value={tz}>{tz}</option>}</For>
                    </select>
                  </Field>
                  <div class="flex justify-end pt-2">
                    <button type="button" onClick={saveProfile} class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand text-surface-0 hover:brightness-110">Save Profile</button>
                  </div>
                </div>
              </Section>
            </div>
          </Show>

          <Show when={activeTab() === "personalization"}>
            <div class="space-y-4">
              <Section title="Color Theme" icon="lucide:palette">
                <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  <For each={colorThemes}>
                    {(t) => (
                      <button type="button" onClick={() => p.setColorTheme(t.value)}
                        class="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all"
                        classList={{ "border-brand bg-brand-dim": p.colorTheme() === t.value, "border-surface-3 hover:border-surface-3/80 bg-surface-2/50": p.colorTheme() !== t.value }}>
                        <div class="w-6 h-6 rounded-full" style={{ "background-color": t.color }} />
                        <span class="text-[11px] text-text-secondary">{t.label}</span>
                      </button>
                    )}
                  </For>
                </div>
              </Section>
              <Section title="Dark / Light Mode" icon="lucide:sparkles">
                <div class="flex gap-2">
                  <For each={modes}>
                    {(m) => (
                      <button type="button" onClick={() => setTheme(m.value as any)}
                        class="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all"
                        classList={{ "border-brand bg-brand-dim": theme() === m.value, "border-surface-3 hover:border-surface-3/80 bg-surface-2/50": theme() !== m.value }}>
                        <AppIcon icon={m.icon} size={16} style={{ color: theme() === m.value ? "var(--color-brand)" : "var(--color-text-muted)" }} />
                        <span class="text-sm text-text-secondary">{m.label}</span>
                      </button>
                    )}
                  </For>
                </div>
              </Section>
              <Section title="Background Pattern" icon="lucide:paintbrush">
                <div class="grid grid-cols-4 gap-2">
                  <For each={bgPatterns}>
                    {(pt) => (
                      <button type="button" onClick={() => p.setBgPattern(pt.value)}
                        class="flex items-center justify-center gap-1.5 p-3 rounded-xl border transition-all text-sm"
                        classList={{ "border-brand bg-brand-dim text-brand": p.bgPattern() === pt.value, "border-surface-3 hover:border-surface-3/80 bg-surface-2/50 text-text-secondary": p.bgPattern() !== pt.value }}>
                        {pt.label}
                      </button>
                    )}
                  </For>
                </div>
              </Section>
              <Section title="Language" icon="lucide:languages">
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <For each={languages}>
                    {(l) => (
                      <button type="button" onClick={() => p.setLanguage(l.value)}
                        class="flex items-center justify-center p-3 rounded-xl border transition-all text-sm"
                        classList={{ "border-brand bg-brand-dim text-brand": p.language() === l.value, "border-surface-3 hover:border-surface-3/80 bg-surface-2/50 text-text-secondary": p.language() !== l.value }}>
                        {l.label}
                      </button>
                    )}
                  </For>
                </div>
              </Section>
              <Section title="Content Width" icon="lucide:layout-grid">
                <div class="flex gap-2">
                  <For each={contentWidths}>
                    {(w) => (
                      <button type="button" onClick={() => p.setContentWidth(w.value)}
                        class="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all"
                        classList={{ "border-brand bg-brand-dim": p.contentWidth() === w.value, "border-surface-3 hover:border-surface-3/80 bg-surface-2/50": p.contentWidth() !== w.value }}>
                        <AppIcon icon={w.icon} size={16} style={{ color: p.contentWidth() === w.value ? "var(--color-brand)" : "var(--color-text-muted)" }} />
                        <span class="text-sm text-text-secondary">{w.label}</span>
                      </button>
                    )}
                  </For>
                </div>
              </Section>
              <Section title="Font Size" icon="lucide:type">
                <div class="flex items-center gap-4">
                  <span class="text-xs text-text-muted">Aa</span>
                  <input type="range" min={12} max={18} step={1} value={p.fontSize()} onInput={(e) => p.setFontSize(Number(e.currentTarget.value))} class="flex-1 accent-brand" />
                  <span class="text-lg text-text-muted">Aa</span>
                  <span class="text-xs text-text-secondary w-8 text-right">{p.fontSize()}px</span>
                </div>
              </Section>
              <Section title="Compact Mode" icon="lucide:minimize" description="Reduce spacing and padding throughout the interface.">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-text-primary">Enable Compact Mode</p>
                    <p class="text-xs text-text-muted mt-0.5">Tighter spacing for information-dense views.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={p.compactMode()} onChange={(e) => { p.setCompactMode(e.currentTarget.checked); document.documentElement.classList.toggle("compact", e.currentTarget.checked); }} class="sr-only peer" />
                    <div class="w-10 h-5 rounded-full bg-surface-3 peer-checked:bg-brand peer-focus:ring-2 peer-focus:ring-brand/30 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5" />
                  </label>
                </div>
              </Section>
            </div>
          </Show>

          <Show when={activeTab() === "notifications"}>
            <div class="space-y-4">
              <Section title="Email Notifications" icon="lucide:mail" description="Choose which emails you want to receive.">
                <div class="space-y-0">
                  <For each={[
                    { label: "Security Alerts", desc: "Login attempts, password changes, and suspicious activity.", key: "security" },
                    { label: "Product Updates", desc: "New features, improvements, and platform announcements.", key: "product" },
                    { label: "Weekly Digest", desc: "Summary of your activity and platform usage stats.", key: "weekly" },
                  ]}>
                    {(item, i) => (
                      <div class="flex items-center justify-between py-3" classList={{ "border-b border-surface-3/20": i() < 2 }}>
                        <div><p class="text-sm font-medium text-text-primary">{item.label}</p><p class="text-xs text-text-muted mt-0.5">{item.desc}</p></div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={item.key === "security" ? emailNotif() : item.key === "product"} onChange={(e) => { if (item.key === "security") { setEmailNotif(e.currentTarget.checked); saveProfile(); } }} class="sr-only peer" />
                          <div class="w-10 h-5 rounded-full bg-surface-3 peer-checked:bg-brand peer-focus:ring-2 peer-focus:ring-brand/30 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5" />
                        </label>
                      </div>
                    )}
                  </For>
                </div>
              </Section>
            </div>
          </Show>

          <Show when={activeTab() === "security"}>
            <div class="space-y-4">
              <Section title="Two-Factor Authentication" icon="lucide:shield-check" description="Add an extra layer of security to your account.">
                <div class="flex items-center justify-between py-3 border-b border-surface-3/20">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center justify-center w-10 h-10 rounded-xl" classList={{ "bg-brand-dim": mfaEnabled(), "bg-surface-2": !mfaEnabled() }}>
                      <AppIcon icon="lucide:smartphone" size={20} style={{ color: mfaEnabled() ? "var(--color-brand)" : "var(--color-text-muted)" }} />
                    </div>
                    <div><p class="text-sm font-medium text-text-primary">Authenticator App</p><p class="text-xs text-text-muted mt-0.5">Use Google Authenticator or Authy.</p></div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={mfaEnabled()} onChange={(e) => { setMfaEnabled(e.currentTarget.checked); saveProfile(); }} class="sr-only peer" />
                    <div class="w-10 h-5 rounded-full bg-surface-3 peer-checked:bg-brand peer-focus:ring-2 peer-focus:ring-brand/30 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5" />
                  </label>
                </div>
                <Show when={mfaEnabled()}>
                  <div class="mt-4 p-4 rounded-xl bg-brand-dim/30 border border-brand/20">
                    <div class="flex items-center gap-2 mb-2">
                      <AppIcon icon="lucide:badge-check" size={16} style={{ color: "var(--color-brand)" }} />
                      <span class="text-sm font-medium text-brand">2FA Enabled</span>
                    </div>
                    <p class="text-xs text-text-secondary">Your account is protected with two-factor authentication.</p>
                  </div>
                </Show>
                <Show when={!mfaEnabled()}>
                  <div class="mt-4 p-4 rounded-xl bg-surface-2/50 border border-surface-3/20">
                    <p class="text-xs text-text-muted mb-3">Enable 2FA to protect your account.</p>
                    <button type="button" onClick={() => { setMfaEnabled(true); saveProfile(); }} class="px-4 py-2 rounded-xl text-xs font-medium bg-surface-2 border border-surface-3/30 text-text-primary hover:bg-surface-3">
                      <span class="flex items-center gap-1.5"><AppIcon icon="lucide:smartphone" size={14} /> Set Up Authenticator</span>
                    </button>
                  </div>
                </Show>
              </Section>
              <Section title="Active Sessions" icon="lucide:monitor" description="Devices where you are currently logged in.">
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 rounded-xl bg-brand-dim/20 border border-brand/20">
                    <div class="flex items-center gap-3">
                      <AppIcon icon="lucide:monitor" size={18} style={{ color: "var(--color-brand)" }} />
                      <div><p class="text-sm text-text-primary">Current Session</p><p class="text-[11px] text-text-muted">Linux · Chrome · Last active just now</p></div>
                    </div>
                    <span class="text-[10px] px-2 py-0.5 rounded-full bg-brand/20 text-brand">Active</span>
                  </div>
                  <div class="flex items-center justify-between p-3 rounded-xl bg-surface-2/50">
                    <div class="flex items-center gap-3">
                      <AppIcon icon="lucide:smartphone" size={18} style={{ color: "var(--color-text-muted)" }} />
                      <div><p class="text-sm text-text-primary">Mobile App</p><p class="text-[11px] text-text-muted">iOS · Safari · Last active 2 hours ago</p></div>
                    </div>
                    <button type="button" class="text-[11px] text-red-400 hover:text-red-300">Revoke</button>
                  </div>
                </div>
              </Section>
              <Section title="Danger Zone" icon="lucide:circle-alert" description="Irreversible actions. Proceed with caution.">
                <div class="space-y-0">
                  <div class="flex items-center justify-between py-3 border-b border-surface-3/20">
                    <div><p class="text-sm font-medium text-text-primary">Sign Out Everywhere</p><p class="text-xs text-text-muted mt-0.5">Revoke all sessions except the current one.</p></div>
                    <button type="button" class="px-4 py-2 rounded-xl text-xs font-medium bg-surface-2 border border-surface-3/30 text-text-secondary hover:bg-surface-3">Sign Out All</button>
                  </div>
                  <div class="flex items-center justify-between py-3">
                    <div><p class="text-sm font-medium text-red-400">Delete Account</p><p class="text-xs text-text-muted mt-0.5">Permanently delete your account and all data.</p></div>
                    <button type="button" class="px-4 py-2 rounded-xl text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20">Delete</button>
                  </div>
                </div>
              </Section>
            </div>
          </Show>
        </div>

        <Show when={saved()}>
          <div class="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-surface-0 text-sm font-medium shadow-lg shadow-brand/20 animate-scale-in z-50">
            <AppIcon icon="lucide:check" size={16} /> Settings saved
          </div>
        </Show>
      </PrivateLayout>
    </Show>
  );
}

import { createContext, useContext, createSignal, createMemo, onMount, type ParentComponent } from "solid-js";
import { APPS, type AppDef } from "~/lib/apps";

export interface User {
  username: string;
  displayName: string;
  role: string;
  appCount: number;
}

const SESSION_KEY = "kentut_session";

const DUMMY_USERS: Record<string, { password: string; displayName: string; role: string; appCount: number }> = {
  admin: { password: "admin", displayName: "Administrator", role: "Admin", appCount: 100 },
  director: { password: "director", displayName: "Director", role: "Director", appCount: 30 },
  manager: { password: "manager", displayName: "Manager", role: "Manager", appCount: 20 },
  staff: { password: "staff", displayName: "Staff", role: "Staff", appCount: 10 },
};

const AuthContext = createContext<{
  user: () => User | null;
  isLoggedIn: () => boolean;
  userApps: () => AppDef[];
  login: (username: string, password: string) => string | null;
  logout: () => void;
}>();

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const AuthProvider: ParentComponent = (props) => {
  const [user, setUser] = createSignal<User | null>(null);

  const isLoggedIn = createMemo(() => !!user());

  const userApps = createMemo(() => {
    const u = user();
    if (!u) return [];
    return APPS.slice(0, u.appCount);
  });

  onMount(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  });

  const persist = (u: User | null) => {
    if (u) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(u));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  };

  const login = (username: string, password: string): string | null => {
    const entry = DUMMY_USERS[username.toLowerCase()];
    if (!entry) return "User not found";
    if (entry.password !== password) return "Invalid password";
    const u: User = {
      username: username.toLowerCase(),
      displayName: entry.displayName,
      role: entry.role,
      appCount: entry.appCount,
    };
    setUser(u);
    persist(u);
    return null;
  };

  const logout = () => {
    setUser(null);
    persist(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, userApps, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

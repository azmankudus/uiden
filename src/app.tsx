import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createContext, useContext, createMemo } from "solid-js";
import { ThemeProvider } from "~/lib/common/theme";
import { AuthProvider } from "~/lib/common/auth";
import { LangProvider, useT } from "~/lib/common/i18n";
import { BRAND, ROUTES } from "~/lib/common/branding";
import TopNav from "~/components/common/TopNav";
import type { NavLink } from "~/components/common/TopNav";

import "~/lib/apps/i18n";
import "~/lib/login/i18n";
import "~/lib/users/i18n";
import "~/lib/setup/i18n";
import "~/lib/common/i18n-register";

import "./app.css";

const BASE = "/ui";

const LocationCtx = createContext(() => "");

export const usePageKey = () => useContext(LocationCtx);

function stripBase(path: string) {
  return path.startsWith(BASE) ? path.slice(BASE.length) || "/" : path;
}

function GatewayHeader() {
  const t = useT("common");
  const loc = useLocation();
  const isApps = createMemo(() => stripBase(loc.pathname) === ROUTES.apps);

  const appSlug = createMemo(() => {
    const p = stripBase(loc.pathname);
    const m = p.match(/^\/([^/]+)\/(public|private)/);
    return m ? m[1] : null;
  });

  const navLinks = createMemo((): NavLink[] => {
    const slug = appSlug();
    if (slug) {
      return [
        { label: t().docsTitle, path: `/${slug}/public/docs` },
        { label: t().helpTitle, path: `/${slug}/public/help` },
        { label: t().aboutTitle, path: `/${slug}/public/about` },
      ];
    }
    return [
      { label: t().docsTitle, path: "/setup/docs" },
      { label: t().helpTitle, path: "/setup/help" },
      { label: t().aboutTitle, path: "/about" },
    ];
  });

  const headerSlug = createMemo(() => appSlug() || BRAND.slug);
  const headerName = createMemo(() => {
    if (appSlug()) return appSlug()!;
    return BRAND.name;
  });

  return (
    <TopNav
      name={headerName()}
      slug={headerSlug()}
      link={isApps() ? "/" : `/${appSlug() || ""}/public`}
      links={navLinks()}
      hideSearch={isApps()}
    />
  );
}

export default function App() {
  return (
    <LangProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router base={BASE}
            root={props => {
              const loc = useLocation();
              const hideTopNav = createMemo(() => {
                const p = stripBase(loc.pathname);
                return p === "/" ||
                  p.startsWith("/setup") ||
                  p.startsWith("/login") ||
                  p.startsWith("/users") ||
                  p.startsWith("/apps/manage") ||
                  /^\/[^/]+\/(public|private)/.test(p);
              });
              return (
                <>
                  <Suspense>
                    {hideTopNav() ? null : <GatewayHeader />}
                  </Suspense>
                  <LocationCtx.Provider value={loc.pathname}>
                    <Suspense>
                      <div key={loc.pathname} class="page-enter">
                        {props.children}
                      </div>
                    </Suspense>
                  </LocationCtx.Provider>
                </>
              );
            }}
          >
            <FileRoutes />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </LangProvider>
  );
}

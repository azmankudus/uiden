import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createContext, useContext, createMemo } from "solid-js";
import { ThemeProvider } from "~/shell/context/theme";
import { AuthProvider } from "~/shell/context/auth";
import { PersonalizationProvider } from "~/shell/context/personalization";
import TopNav from "~/shell/components/TopNav";
import "./app.css";

const LocationCtx = createContext(() => "");

export const usePageKey = () => useContext(LocationCtx);

function GatewayHeader() {
  const loc = useLocation();
  const isApps = createMemo(() => loc.pathname === "/apps");
  return (
    <TopNav
      name="Kentut SuperApp"
      slug="superapp"
      link="/"
      hideSearch={isApps()}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PersonalizationProvider>
        <AuthProvider>
          <Router
            root={props => {
              const loc = useLocation();
              const isAppRoute = createMemo(() => /^\/[^/]+\/(public|private)/.test(loc.pathname) || /^\/user\//.test(loc.pathname) || loc.pathname === "/");
              return (
                <>
                  <Suspense>
                    {isAppRoute() ? null : <GatewayHeader />}
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
      </PersonalizationProvider>
    </ThemeProvider>
  );
}

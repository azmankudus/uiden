import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createContext, useContext, type ParentComponent } from "solid-js";
import { ThemeProvider } from "~/components/ThemeProvider";
import { AuthProvider } from "~/components/AuthProvider";
import TopBar from "~/components/TopBar";
import "./app.css";

const LocationCtx = createContext(() => "");

export const usePageKey = () => useContext(LocationCtx);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router
          root={props => {
            const loc = useLocation();
            return (
              <>
                <TopBar />
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
  );
}

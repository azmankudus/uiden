import { useNavigate } from "@solidjs/router";
import { useAuth } from "~/lib/common/auth";
import { ROUTES } from "~/lib/common/branding";

export function useAuthGuard() {
  const auth = useAuth();
  const navigate = useNavigate();

  return {
    requireAuth: (redirectTo: string = ROUTES.login) => {
      if (!auth.isLoggedIn()) {
        navigate(redirectTo, { replace: true });
        return false;
      }
      return true;
    },
    requireAdmin: (redirectTo: string = ROUTES.userAccount) => {
      if (!auth.isLoggedIn()) {
        navigate(ROUTES.login, { replace: true });
        return false;
      }
      if (auth.user()?.role !== "Admin") {
        navigate(redirectTo, { replace: true });
        return false;
      }
      return true;
    },
  };
}

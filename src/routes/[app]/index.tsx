import { useParams, useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import { getApp } from "~/apps/registry";
import { APPS } from "~/gateway/lib/apps";

export default function AppIndex() {
  const params = useParams();
  const navigate = useNavigate();
  const app = getApp(params.app);
  const exists = APPS.some((a) => a.slug === params.app);

  onMount(() => {
    if (app) {
      navigate(`/${app.slug}/${app.defaultRoute}`, { replace: true });
    } else if (exists) {
      navigate(`/${params.app}/public`, { replace: true });
    }
  });

  return (
    <div class="flex items-center justify-center min-h-screen">
      <p class="text-text-muted">Loading...</p>
    </div>
  );
}

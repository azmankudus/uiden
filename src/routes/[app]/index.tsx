import { useParams, useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import { getApp } from "~/apps/registry";

export default function AppIndex() {
  const params = useParams();
  const navigate = useNavigate();
  const app = getApp(params.app);

  onMount(() => {
    if (app) {
      navigate(`/${app.slug}/${app.defaultRoute}`, { replace: true });
    }
  });

  return (
    <div class="flex items-center justify-center min-h-screen">
      <p class="text-text-muted">Loading...</p>
    </div>
  );
}

import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function UserSettingsRedirect() {
  const navigate = useNavigate();
  onMount(() => navigate("/user/settings", { replace: true }));
  return null;
}

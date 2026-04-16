import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function SettingsRedirect() {
  const navigate = useNavigate();
  onMount(() => navigate("/user/setting", { replace: true }));
  return null;
}

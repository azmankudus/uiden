import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function LoginRedirect() {
  const navigate = useNavigate();
  onMount(() => navigate("/user/login", { replace: true }));
  return null;
}

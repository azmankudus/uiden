import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function ForgotPasswordRedirect() {
  const navigate = useNavigate();
  onMount(() => navigate("/user/login/forgot-password", { replace: true }));
  return null;
}

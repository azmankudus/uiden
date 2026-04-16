import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function SampleIndex() {
  const navigate = useNavigate();
  onMount(() => navigate("/sample/public", { replace: true }));
  return null;
}

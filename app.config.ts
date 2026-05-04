import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.NODE_ENV === "production" || process.env.VINXI_BUILD === "1";

export default defineConfig({
  ssr: false,
  server: {
    preset: isProd ? "static" : undefined,
    baseURL: "/ui",
    ...(isProd ? { prerender: { crawlLinks: false, routes: [] } } : {}),
  },
  vite: {
    ...(isProd ? { base: "/ui" } : {}),
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@iconify/utils"],
    },
  },
});

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // Subpath GitHub Pages: https://cyclonep2.github.io/work-innet/
  base: "/work-innet/",
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});

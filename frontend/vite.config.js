import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite settings. The react() plugin lets Vite understand JSX.
export default defineConfig({
  plugins: [react()],
});

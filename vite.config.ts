import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-draft-wysiwyg"], // Explicitly optimize react-draft-wysiwyg
    exclude: [], // Optional: you can exclude other libraries here if needed
  },
});

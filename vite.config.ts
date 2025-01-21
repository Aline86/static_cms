import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Split large dependency into its own chunk
            if (id.includes("draft-wysiwyg")) {
              return "large-dependency"; // This will create a chunk for the large dependency
            }
            // Other vendor libraries could be grouped into a 'vendor' chunk
            return "vendor";
          }
        },
      },
    },
  },
});

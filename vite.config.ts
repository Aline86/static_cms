import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  /*server: {
    host: "0.0.0.0", // Permet d'écouter sur toutes les interfaces réseau
    port: 5173, // Garder le même port (5173)
  },*/
  plugins: [react()],
  optimizeDeps: {
    include: ["react-draft-wysiwyg"], // Explicitly optimize react-draft-wysiwyg
    exclude: [], // Optional: you can exclude other libraries here if needed
  },
});

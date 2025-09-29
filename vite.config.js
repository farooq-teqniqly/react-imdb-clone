import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          bootstrap: ["bootstrap", "react-bootstrap"],
        },
      },
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Set reasonable chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Enable aggressive dependency pre-bundling
  optimizeDeps: {
    include: ["react", "react-dom", "bootstrap", "react-bootstrap"],
  },
});

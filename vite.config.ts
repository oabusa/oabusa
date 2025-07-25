import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
server: {
  host: "::",
  port: 8080,
  historyApiFallback: true,   
// Dev proxy for local API server (only used during `npm run dev`)  
  proxy: {
    "/api": {
      target: "http://localhost:4000",
      changeOrigin: true,
      secure: false,
    },
  },
},

  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'api-server', 'dist', "public"),
    emptyOutDir: true,
  },
}));

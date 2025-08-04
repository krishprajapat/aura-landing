import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createServer } from "./server";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 8080,
      allowedHosts: [
        'de1e6208-4758-4cc7-8a2d-11e06adac39f-00-hg8vev7cd206.sisko.replit.dev'
      ],
      
    },
    build: {
      outDir: "dist/spa",
    },
  };
});
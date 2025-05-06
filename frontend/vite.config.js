import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __BACKEND_URL__: JSON.stringify(process.env.VITE_BACKEND_URL || "https://hackfolio-backend.onrender.com"),
  },
})

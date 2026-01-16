// vite.config.ts   (recommended to use .ts if you're using TypeScript)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Keep the React Compiler if you really want/need it (it's experimental in many cases)
      // Comment out or remove if you don't actively use it — most projects don't need it yet
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),

    // Official Tailwind CSS v4+ plugin — fastest integration, no PostCSS needed!
    tailwindcss(),
  ],
})
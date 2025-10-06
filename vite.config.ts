import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [tailwindcss(),solid()],
  server: {
    proxy: {
      '/api/zenn': {
        target: 'https://zenn.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/zenn/, '/api/articles'),
      },
    },
  },
});

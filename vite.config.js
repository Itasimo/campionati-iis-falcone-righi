import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Campionati IIS Falcone-Righi',
        short_name: 'Campionati',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'src/assets/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          }
        ],
      },
    }),
  ],
});

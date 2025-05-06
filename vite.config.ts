import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), analyzer({ openAnalyzer: false })],
    define: {
        __IS_DEV__: JSON.stringify(true),
        __IS_STORYBOOK__: JSON.stringify(false),
        __API__: JSON.stringify('http://localhost:8000'),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3005,
        allowedHosts: [
            '8989-83-27-210-99.ngrok-free.app',
            // Можно добавить дополнительные хосты при необходимости
        ],
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/app/styles/_variables.scss" as *; @use "@/app/styles/_mixins.scss" as *;`,
            },
        },
    },
});

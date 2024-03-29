import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    build: {
        rollupOptions: {
            // external: [/.*\.js/],
        },
    },
    plugins: [
        tsconfigPaths(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
        svgr(),
    ],
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
        return pages[`./Pages/${name}.tsx`]
    },
});

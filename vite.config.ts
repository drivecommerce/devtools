/// <reference types="vitest" />

import fs from 'fs';
import path from 'path';
import { dirname, relative } from 'node:path';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';

import Vue from '@vitejs/plugin-vue';

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

import { isDev, port, r } from './scripts/utils';

import packageJson from './package.json';

export const sharedConfig: UserConfig = {
    root: r('src'),
    resolve: {
        alias: {
            '@/': `${r('src')}/`,
        },
    },
    define: {
        __DEV__: isDev,
        __NAME__: JSON.stringify(packageJson.name),
    },
    plugins: [
        Vue({
            template: {
                compilerOptions: {
                },
            },
        }),

        AutoImport({
            imports: [
                'vue',
                {
                    'webextension-polyfill': [['*', 'browser']],
                },
            ],
            dts: r('src/auto-imports.d.ts'),
        }),

        // https://github.com/antfu/unplugin-vue-components
        Components({
            dirs: [r('src/components')],
            // generate `components.d.ts` for ts support with Volar
            dts: r('src/components.d.ts'),
            resolvers: [
                // auto import icons
                IconsResolver({
                    prefix: '',
                }),
            ],
        }),

        // https://github.com/antfu/unplugin-icons
        Icons(),

        {
            name: 'copy-assets',
            buildStart() {
                const assetsDir = path.resolve(__dirname, 'src/assets');
                const publicDir = path.resolve(__dirname, 'extension/assets');

                // Create the public/assets directory if it doesn't exist
                if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir, { recursive: true });
                }

                // Copy each asset from src/assets to public/assets
                fs.readdirSync(assetsDir).forEach((file) => {
                    fs.copyFileSync(
                        path.join(assetsDir, file),
                        path.join(publicDir, file),
                    );
                });
            },
        },

        // rewrite assets to use relative path
        {
            name: 'assets-rewrite',
            enforce: 'post',
            apply: 'build',
            transformIndexHtml(html, { path }) {
                return html.replace(
                    /"\/assets\//g,
                    `"${relative(dirname(path), '/assets')}/`,
                );
            },
        },
    ],

    optimizeDeps: {
        include: ['vue', '@vueuse/core', 'webextension-polyfill'],
        exclude: ['vue-demi'],
    },
};

export default defineConfig(({ command }) => ({
    ...sharedConfig,

    base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',

    server: {
        port,
        hmr: {
            host: 'localhost',
        },
    },

    build: {
        watch: isDev ? {} : undefined,

        outDir: r('extension/dist'),

        emptyOutDir: false,

        sourcemap: 'inline', // isDev ? 'inline' : false,

        minify: false,

        // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
        terserOptions: {
            mangle: false,
        },

        rollupOptions: {
            input: {
                options: r('src/options/index.html'),
                devtools: r('src/devtools/index.html'),
            },
        },
    },

    test: {
        globals: true,
        environment: 'jsdom',
    },
}));

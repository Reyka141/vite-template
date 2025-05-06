import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
    stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-essentials', '@chromatic-com/storybook', '@storybook/experimental-addon-test'],
    framework: {
        name: '@storybook/react-vite',
        options: {
            builder: {
                viteConfigPath: 'vite.config.ts',
            },
        },
    },
    core: {
        disableTelemetry: true,
        enableCrashReports: false,
    },
    typescript: {
        check: false,
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
    async viteFinal(config) {
        return {
            ...config,
            plugins: [...(config.plugins || []), svgr()],
            define: {
                __IS_DEV__: JSON.stringify(true),
                __IS_STORYBOOK__: JSON.stringify(true),
                __API__: JSON.stringify(process.env.API_URL),
            },
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, '../../src'),
                },
            },
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: `@use "@/app/styles/_variables.scss" as *; @use "@/app/styles/_mixins.scss" as *;`,
                    },
                },
            },
            build: {
                sourcemap: true,
                rollupOptions: {
                    output: {
                        manualChunks: undefined,
                    },
                },
            },
        };
    },
};

export default config;

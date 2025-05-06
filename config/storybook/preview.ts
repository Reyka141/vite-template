import type { Preview } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
const preview: Preview = {
    decorators: [StyleDecorator],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: 'dark',
        },
        viewport: {
            defaultViewport: 'desktop',
        },
        screenshot: {
            viewport: {
                width: 1280,
                height: 720,
            },
            fullPage: false,
        },
    },
};

export default preview;

import type { Meta, StoryObj } from '@storybook/react';
import { PageLoader } from './PageLoader';

const meta = {
    title: 'widgets/PageLoader',
    component: PageLoader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithCustomClass: Story = {
    args: {
        className: 'custom-class',
    },
};

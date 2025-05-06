import type { Meta, StoryObj } from '@storybook/react';
import { Loader, LoaderSize } from './Loader';

const meta = {
    title: 'shared/Loader',
    component: Loader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tiny: Story = {
    args: {
        size: LoaderSize.TINY,
    },
};

export const Small: Story = {
    args: {
        size: LoaderSize.SMALL,
    },
};

export const Medium: Story = {
    args: {
        size: LoaderSize.MEDIUM,
    },
};

export const Large: Story = {
    args: {
        size: LoaderSize.LARGE,
    },
};

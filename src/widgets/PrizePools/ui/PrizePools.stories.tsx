import type { Meta, StoryObj } from '@storybook/react';
import { PrizePools } from './PrizePools';

const meta = {
    title: 'widgets/PrizePools',
    component: PrizePools,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PrizePools>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomClass: Story = {
    args: {
        className: 'custom-class',
    },
};

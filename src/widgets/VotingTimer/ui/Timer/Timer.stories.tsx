import type { Meta, StoryObj } from '@storybook/react';
import { Timer, TimerTheme } from './Timer';

const meta = {
    title: 'widgets/VotingTimer/Timer',
    component: Timer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof Timer>;

export const Primary: Story = {
    args: {
        time: 3665, // 1h 1m 5s
        label: 'Time left',
        theme: TimerTheme.PRIMARY,
    },
};

export const Secondary: Story = {
    args: {
        time: 7200, // 2h 0m 0s
        label: 'Duration',
        theme: TimerTheme.SECONDARY,
    },
};

export const PrimaryLoading: Story = {
    args: {
        time: 3600,
        label: 'Time left',
        isLoading: true,
        theme: TimerTheme.PRIMARY,
    },
};

export const SecondaryLoading: Story = {
    args: {
        time: 3600,
        label: 'Time left',
        isLoading: true,
        theme: TimerTheme.SECONDARY,
    },
};
export const PrimarySmallTime: Story = {
    args: {
        time: 45, // 0h 0m 45s
        label: 'Almost finished',
        theme: TimerTheme.PRIMARY,
    },
};

export const SecondarySmallTime: Story = {
    args: {
        time: 45, // 0h 0m 45s
        label: 'Almost finished',
        theme: TimerTheme.SECONDARY,
    },
};

export const PrimaryLongTime: Story = {
    args: {
        time: 86400, // 24h 0m 0s
        label: 'Time to end',
        theme: TimerTheme.PRIMARY,
    },
};

export const SecondaryLongTime: Story = {
    args: {
        time: 86400, // 24h 0m 0s
        label: 'Time to end',
        theme: TimerTheme.SECONDARY,
    },
};

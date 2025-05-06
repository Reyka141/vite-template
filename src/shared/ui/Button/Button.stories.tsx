import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ButtonTheme } from './types';

const meta: Meta<typeof Button> = {
    title: 'Shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        theme: {
            control: 'select',
            options: Object.values(ButtonTheme),
        },
        disabled: {
            control: 'boolean',
        },
        isLoading: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Кнопка',
        theme: ButtonTheme.PRIMARY,
    },
};

export const PrimaryContrast: Story = {
    args: {
        children: 'Кнопка',
        theme: ButtonTheme.PRIMARY_CONTRAST,
    },
};

export const SecondaryGreen: Story = {
    args: {
        children: 'Кнопка',
        theme: ButtonTheme.SECONDARY_GREEN,
    },
};

export const SecondaryClear: Story = {
    args: {
        children: 'Кнопка',
        theme: ButtonTheme.SECONDARY_CLEAR,
    },
};

export const SecondaryRed: Story = {
    args: {
        children: 'Кнопка',
        theme: ButtonTheme.SECONDARY_RED,
    },
};

export const Tertiary: Story = {
    args: {
        children: 'Кнопка',
        theme: ButtonTheme.TERTIARY,
    },
};

export const PrimaryDisabled: Story = {
    args: {
        children: 'Кнопка',
        disabled: true,
    },
};

export const Clear: Story = {
    args: {
        children: 'Кнопка',
        theme: ButtonTheme.CLEAR,
    },
};

export const Loading: Story = {
    args: {
        children: 'Кнопка',
        isLoading: true,
    },
};

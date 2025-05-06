import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextSize, TextTheme } from './Text';

const meta: Meta<typeof Text> = {
    title: 'shared/Text',
    component: Text,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
        text: { control: 'text' },
        theme: {
            control: 'select',
            options: Object.values(TextTheme),
        },
        size: {
            control: 'select',
            options: Object.values(TextSize),
        },
    },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
    args: {
        text: 'Пример обычного текста',
    },
};

export const ErrorText: Story = {
    args: {
        text: 'Текст ошибки',
        theme: TextTheme.ERROR,
    },
};

export const Caps: Story = {
    args: {
        text: 'Текст капсом',
        theme: TextTheme.CAPS,
    },
};

export const Large: Story = {
    args: {
        text: 'Большой текст',
        size: TextSize.LARGE,
    },
};

export const Mini: Story = {
    args: {
        text: 'Маленький текст',
        size: TextSize.MINI,
    },
};

export const BigCaps: Story = {
    args: {
        text: 'Текст большими буквами',
        size: TextSize.BIG_CAPS,
    },
};

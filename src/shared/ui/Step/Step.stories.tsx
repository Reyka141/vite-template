import type { Meta, StoryObj } from '@storybook/react';
import { Step } from './Step';

const meta = {
    title: 'shared/Step',
    component: Step,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof Step>;

export const Primary: Story = {
    args: {
        step: {
            numberOfStep: 1,
            description: 'Выберите тип тренировки',
        },
    },
};

export const Secondary: Story = {
    args: {
        step: {
            numberOfStep: 2,
            description: 'Настройте параметры тренировки',
        },
    },
};

export const WithLongDescription: Story = {
    args: {
        step: {
            numberOfStep: 3,
            description:
                'Это очень длинное описание шага, которое может занимать несколько строк и показывает, как компонент обрабатывает длинный текст',
        },
    },
};

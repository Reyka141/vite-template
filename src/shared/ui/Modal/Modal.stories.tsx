import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
    title: 'Shared/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen',
        loki: {
            waitForSelector: '[data-testid="modal"]',
        },
        backgrounds: {
            default: 'dark',
        },
        docs: {
            story: {
                inline: false,
                iframeHeight: 500,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: 'boolean',
            description: 'Управляет видимостью модального окна',
        },
        onClose: {
            action: 'clicked',
        },
    },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    args: {
        children: 'Контент модального окна',
        isOpen: true,
        onClose: () => {},
    },
};

export const Closed: Story = {
    args: {
        children: 'Контент модального окна',
        isOpen: false,
        onClose: () => {},
    },
};

export const WithLongContent: Story = {
    args: {
        children: (
            <div>
                <h2>Заголовок модального окна</h2>
                <p>Это длинный текст для демонстрации работы модального окна с большим количеством контента.</p>
                <p>Дополнительный параграф текста для проверки прокрутки и отображения.</p>
            </div>
        ),
        isOpen: true,
        onClose: () => {},
    },
};

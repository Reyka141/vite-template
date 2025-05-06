import { NavbarItemStatus } from '@/pages/RacePage/model/NavbarItem.types';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { GameStatus } from '@/shared/lib/components/getGameStatus/getGameStatus';
import type { Meta, StoryObj } from '@storybook/react';
import MainPage from './MainPage';

const meta = {
    title: 'pages/MainPage',
    component: MainPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof MainPage>;

export const Default: Story = {
    args: {
        className: 'storybook_container',
    },
    decorators: [StoreDecorator({})],
};

export const withLogin: Story = {
    args: {
        className: 'storybook_container',
    },
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    username: 'test',
                    id: '1',
                    prizes: [],
                },
                _initialized: true,
            },
            event: {
                event: {
                    id: 1,
                    isActive: false,
                    location: 'Online',
                    startTime: '2025-03-21T11:58:48.463Z',
                    endTime: '2025-03-21T12:03:48.463Z',
                    timeLeft: 300,
                    raceData: [],
                },
                eventStatus: GameStatus.IN_PROGRESS,
                isLoading: false,
                activeRaceId: 1,
                navItems: [
                    {
                        id: 1,
                        name: 'Race 1',
                        status: NavbarItemStatus.ACTIVE,
                    },
                    {
                        id: 2,
                        name: 'Race 2',
                        status: NavbarItemStatus.INACTIVE,
                    },
                    {
                        id: 3,
                        name: 'Race 3',
                        status: NavbarItemStatus.INACTIVE,
                    },
                ],
            },
        }),
    ],
};

export const loading: Story = {
    args: {
        className: 'storybook_container',
    },
    decorators: [
        StoreDecorator({
            event: {
                isLoading: true,
            },
        }),
    ],
};

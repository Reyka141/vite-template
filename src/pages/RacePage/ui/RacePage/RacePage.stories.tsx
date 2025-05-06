import { NavbarItemStatus } from '@/entities/Event/model/types/eventSchema';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { GameStatus } from '@/shared/lib/components/getGameStatus/getGameStatus';
import type { Meta, StoryObj } from '@storybook/react';
import RacePage from './RacePage';

const meta = {
    title: 'pages/RacePage',
    component: RacePage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RacePage>;

export default meta;
type Story = StoryObj<typeof RacePage>;

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

export const Primary: Story = {
    args: {
        className: 'storybook_container',
    },
    decorators: [
        StoreDecorator({
            event: {
                event: {
                    id: 1,
                    isActive: false,
                    location: 'Online',
                    startTime: '2025-03-21T11:58:48.463Z',
                    endTime: '2025-03-21T12:03:48.463Z',
                    timeLeft: 300,
                    raceData: [
                        {
                            id: 1,
                            title: 'Race 1',
                            description: 'Race 1 of the day',
                            startTime: '2025-03-21T11:58:48.463Z',
                            horseData: [
                                {
                                    id: 1,
                                    name: 'Thunder',
                                    age: 8,
                                    color: 'birch',
                                    weight: '548 kg',
                                    stats: '5/3',
                                },
                                {
                                    id: 2,
                                    name: 'Storm',
                                    age: 6,
                                    color: 'green',
                                    weight: '459 kg',
                                    stats: '3/4',
                                },
                                {
                                    id: 3,
                                    name: 'Winner',
                                    age: 8,
                                    color: 'pink',
                                    weight: '460 kg',
                                    stats: '1/5',
                                },
                                {
                                    id: 4,
                                    name: 'Wind',
                                    age: 5,
                                    color: 'red',
                                    weight: '451 kg',
                                    stats: '15/2',
                                },
                                {
                                    id: 5,
                                    name: 'Lightning',
                                    age: 3,
                                    color: 'birch',
                                    weight: '513 kg',
                                    stats: '3/5',
                                },
                                {
                                    id: 6,
                                    name: 'Star',
                                    age: 5,
                                    color: 'blue',
                                    weight: '548 kg',
                                    stats: '14/1',
                                },
                                {
                                    id: 7,
                                    name: 'Runner',
                                    age: 3,
                                    color: 'black',
                                    weight: '505 kg',
                                    stats: '4/5',
                                },
                                {
                                    id: 8,
                                    name: 'Flash',
                                    age: 5,
                                    color: 'red',
                                    weight: '528 kg',
                                    stats: '5/4',
                                },
                                {
                                    id: 9,
                                    name: 'Champion',
                                    age: 8,
                                    color: 'white',
                                    weight: '541 kg',
                                    stats: '14/2',
                                },
                                {
                                    id: 10,
                                    name: 'Spirit',
                                    age: 5,
                                    color: 'birch',
                                    weight: '534 kg',
                                    stats: '11/5',
                                },
                            ],
                        },
                        {
                            id: 2,
                            title: 'Race 2',
                            description: 'Race 2 of the day',
                            startTime: '2025-03-21T12:13:48.463Z',
                            horseData: [
                                {
                                    id: 1,
                                    name: 'Thunder',
                                    age: 8,
                                    color: 'birch',
                                    weight: '548 kg',
                                    stats: '5/3',
                                },
                                {
                                    id: 2,
                                    name: 'Storm',
                                    age: 6,
                                    color: 'green',
                                    weight: '459 kg',
                                    stats: '3/4',
                                },
                                {
                                    id: 3,
                                    name: 'Winner',
                                    age: 8,
                                    color: 'pink',
                                    weight: '460 kg',
                                    stats: '1/5',
                                },
                                {
                                    id: 4,
                                    name: 'Wind',
                                    age: 5,
                                    color: 'red',
                                    weight: '451 kg',
                                    stats: '15/2',
                                },
                                {
                                    id: 5,
                                    name: 'Lightning',
                                    age: 3,
                                    color: 'birch',
                                    weight: '513 kg',
                                    stats: '3/5',
                                },
                                {
                                    id: 6,
                                    name: 'Star',
                                    age: 5,
                                    color: 'blue',
                                    weight: '548 kg',
                                    stats: '14/1',
                                },
                                {
                                    id: 7,
                                    name: 'Runner',
                                    age: 3,
                                    color: 'black',
                                    weight: '505 kg',
                                    stats: '4/5',
                                },
                                {
                                    id: 8,
                                    name: 'Flash',
                                    age: 5,
                                    color: 'red',
                                    weight: '528 kg',
                                    stats: '5/4',
                                },
                                {
                                    id: 9,
                                    name: 'Champion',
                                    age: 8,
                                    color: 'white',
                                    weight: '541 kg',
                                    stats: '14/2',
                                },
                                {
                                    id: 10,
                                    name: 'Spirit',
                                    age: 5,
                                    color: 'birch',
                                    weight: '534 kg',
                                    stats: '11/5',
                                },
                            ],
                        },
                        {
                            id: 3,
                            title: 'Race 3',
                            description: 'Race 3 of the day',
                            startTime: '2025-03-21T12:28:48.463Z',
                            horseData: [
                                {
                                    id: 1,
                                    name: 'Thunder',
                                    age: 8,
                                    color: 'birch',
                                    weight: '548 kg',
                                    stats: '5/3',
                                },
                                {
                                    id: 2,
                                    name: 'Storm',
                                    age: 6,
                                    color: 'green',
                                    weight: '459 kg',
                                    stats: '3/4',
                                },
                                {
                                    id: 3,
                                    name: 'Winner',
                                    age: 8,
                                    color: 'pink',
                                    weight: '460 kg',
                                    stats: '1/5',
                                },
                                {
                                    id: 4,
                                    name: 'Wind',
                                    age: 5,
                                    color: 'red',
                                    weight: '451 kg',
                                    stats: '15/2',
                                },
                                {
                                    id: 5,
                                    name: 'Lightning',
                                    age: 3,
                                    color: 'birch',
                                    weight: '513 kg',
                                    stats: '3/5',
                                },
                                {
                                    id: 6,
                                    name: 'Star',
                                    age: 5,
                                    color: 'blue',
                                    weight: '548 kg',
                                    stats: '14/1',
                                },
                                {
                                    id: 7,
                                    name: 'Runner',
                                    age: 3,
                                    color: 'black',
                                    weight: '505 kg',
                                    stats: '4/5',
                                },
                                {
                                    id: 8,
                                    name: 'Flash',
                                    age: 5,
                                    color: 'red',
                                    weight: '528 kg',
                                    stats: '5/4',
                                },
                                {
                                    id: 9,
                                    name: 'Champion',
                                    age: 8,
                                    color: 'white',
                                    weight: '541 kg',
                                    stats: '14/2',
                                },
                                {
                                    id: 10,
                                    name: 'Spirit',
                                    age: 5,
                                    color: 'birch',
                                    weight: '534 kg',
                                    stats: '11/5',
                                },
                            ],
                        },
                    ],
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

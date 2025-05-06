import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import type { Meta, StoryObj } from '@storybook/react';
import { Reducer } from 'redux';
import { raceResultReducer } from '../../model/slice/raceResultSlice';
import { RaceResultSchema } from '../../model/types/raceResultSchema';
import RaceResultPage from './RaceResultPage';

const raceResultLost = {
    success: false,
    raceData: {
        id: 3,
        title: 'Race 3',
        description: 'Race 3 of the day',
        startTime: '2025-03-31T09:05:20.938Z',
        endTime: '2025-03-31T09:07:20.938Z',
        isFinished: true,
        finishTime: '2025-03-31T09:07:27.379Z',
    },
    userChoice: {
        raceId: 3,
        horseId: 1,
        horseName: 'Flash',
        horseColor: 'pink',
        horseStats: '4/3',
        position: 3,
        isWinner: false,
    },
    horses: [
        {
            id: 4,
            name: 'Victor',
            age: 4,
            color: 'red',
            weight: '488 kg',
            stats: '2/5',
            position: 1,
        },
        {
            id: 10,
            name: 'Champion',
            age: 5,
            color: 'birch',
            weight: '473 kg',
            stats: '11/5',
            position: 2,
        },
        {
            id: 1,
            name: 'Flash',
            age: 6,
            color: 'pink',
            weight: '519 kg',
            stats: '4/3',
            position: 3,
        },
        {
            id: 7,
            name: 'Storm',
            age: 7,
            color: 'red',
            weight: '529 kg',
            stats: '3/5',
            position: 4,
        },
        {
            id: 3,
            name: 'Thunder',
            age: 4,
            color: 'white',
            weight: '548 kg',
            stats: '14/1',
            position: 5,
        },
        {
            id: 5,
            name: 'Wind',
            age: 8,
            color: 'blue',
            weight: '517 kg',
            stats: '7/5',
            position: 6,
        },
        {
            id: 6,
            name: 'Star',
            age: 7,
            color: 'blue',
            weight: '498 kg',
            stats: '8/5',
            position: 7,
        },
        {
            id: 9,
            name: 'Racer',
            age: 5,
            color: 'blue',
            weight: '458 kg',
            stats: '10/1',
            position: 8,
        },
        {
            id: 2,
            name: 'Winner',
            age: 6,
            color: 'black',
            weight: '514 kg',
            stats: '3/4',
            position: 9,
        },
        {
            id: 8,
            name: 'Spirit',
            age: 4,
            color: 'purple',
            weight: '530 kg',
            stats: '10/5',
            position: 10,
        },
    ],
    winnerHorse: {
        id: 4,
        name: 'Victor',
        color: 'red',
    },
    isLoading: false,
    error: '',
};

const raceResultWin = {
    success: true,
    raceData: {
        id: 3,
        title: 'Race 3',
        description: 'Race 3 of the day',
        startTime: '2025-03-31T09:05:20.938Z',
        endTime: '2025-03-31T09:07:20.938Z',
        isFinished: true,
        finishTime: '2025-03-31T09:07:27.379Z',
    },
    userChoice: {
        raceId: 3,
        horseId: 4,
        horseName: 'Victor',
        horseColor: 'red',
        horseStats: '2/5',
        position: 1,
        isWinner: true,
    },
    horses: [
        {
            id: 4,
            name: 'Victor',
            age: 4,
            color: 'red',
            weight: '488 kg',
            stats: '2/5',
            position: 1,
        },
        {
            id: 10,
            name: 'Champion',
            age: 5,
            color: 'birch',
            weight: '473 kg',
            stats: '11/5',
            position: 2,
        },
        {
            id: 1,
            name: 'Flash',
            age: 6,
            color: 'pink',
            weight: '519 kg',
            stats: '4/3',
            position: 3,
        },
        {
            id: 7,
            name: 'Storm',
            age: 7,
            color: 'red',
            weight: '529 kg',
            stats: '3/5',
            position: 4,
        },
        {
            id: 3,
            name: 'Thunder',
            age: 4,
            color: 'white',
            weight: '548 kg',
            stats: '14/1',
            position: 5,
        },
        {
            id: 5,
            name: 'Wind',
            age: 8,
            color: 'blue',
            weight: '517 kg',
            stats: '7/5',
            position: 6,
        },
        {
            id: 6,
            name: 'Star',
            age: 7,
            color: 'blue',
            weight: '498 kg',
            stats: '8/5',
            position: 7,
        },
        {
            id: 9,
            name: 'Racer',
            age: 5,
            color: 'blue',
            weight: '458 kg',
            stats: '10/1',
            position: 8,
        },
        {
            id: 2,
            name: 'Winner',
            age: 6,
            color: 'black',
            weight: '514 kg',
            stats: '3/4',
            position: 9,
        },
        {
            id: 8,
            name: 'Spirit',
            age: 4,
            color: 'purple',
            weight: '530 kg',
            stats: '10/5',
            position: 10,
        },
    ],
    winnerHorse: {
        id: 8,
        name: 'Victor',
        color: 'red',
    },
    isLoading: false,
    error: '',
};

const raceResultNotFinished = {
    success: true,
    raceData: {
        id: 3,
        title: 'Race 3',
        description: 'Race 3 of the day',
        startTime: '2025-03-31T09:05:20.938Z',
        endTime: '2025-03-31T09:07:20.938Z',
        isFinished: true,
        finishTime: '2025-03-31T09:07:27.379Z',
    },
    userChoice: {
        raceId: 3,
        horseId: 4,
        horseName: 'Victor',
        horseColor: 'red',
        horseStats: '2/5',
        position: null,
        isWinner: null,
    },
    horses: [
        {
            id: 4,
            name: 'Victor',
            age: 4,
            color: 'red',
            weight: '488 kg',
            stats: '2/5',
            position: null,
        },
        {
            id: 10,
            name: 'Champion',
            age: 5,
            color: 'birch',
            weight: '473 kg',
            stats: '11/5',
            position: null,
        },
        {
            id: 1,
            name: 'Flash',
            age: 6,
            color: 'pink',
            weight: '519 kg',
            stats: '4/3',
            position: null,
        },
        {
            id: 7,
            name: 'Storm',
            age: 7,
            color: 'red',
            weight: '529 kg',
            stats: '3/5',
            position: null,
        },
        {
            id: 3,
            name: 'Thunder',
            age: 4,
            color: 'white',
            weight: '548 kg',
            stats: '14/1',
            position: null,
        },
        {
            id: 5,
            name: 'Wind',
            age: 8,
            color: 'blue',
            weight: '517 kg',
            stats: '7/5',
            position: null,
        },
        {
            id: 6,
            name: 'Star',
            age: 7,
            color: 'blue',
            weight: '498 kg',
            stats: '8/5',
            position: null,
        },
        {
            id: 9,
            name: 'Racer',
            age: 5,
            color: 'blue',
            weight: '458 kg',
            stats: '10/1',
            position: null,
        },
        {
            id: 2,
            name: 'Winner',
            age: 6,
            color: 'black',
            weight: '514 kg',
            stats: '3/4',
            position: null,
        },
        {
            id: 8,
            name: 'Spirit',
            age: 4,
            color: 'purple',
            weight: '530 kg',
            stats: '10/5',
            position: null,
        },
    ],
    winnerHorse: null,
    isLoading: false,
    error: '',
};

const meta = {
    title: 'pages/RaceResultPage',
    component: RaceResultPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RaceResultPage>;

export default meta;
type Story = StoryObj<typeof RaceResultPage>;

export const PageWithNotFinished: Story = {
    args: {
        className: 'storybook_container',
    },
    decorators: [
        StoreDecorator(
            { raceResult: raceResultNotFinished },
            { raceResult: raceResultReducer as Reducer<RaceResultSchema | undefined> },
        ),
    ],
};

export const PageWithLost: Story = {
    args: {
        className: 'storybook_container',
    },
    decorators: [
        StoreDecorator(
            { raceResult: raceResultLost },
            { raceResult: raceResultReducer as Reducer<RaceResultSchema | undefined> },
        ),
    ],
};

export const PageWithWin: Story = {
    args: {
        className: 'storybook_container',
    },
    decorators: [
        StoreDecorator(
            { raceResult: raceResultWin },
            { raceResult: raceResultReducer as Reducer<RaceResultSchema | undefined> },
        ),
    ],
};

export const loading: Story = {
    args: {
        className: 'storybook_container',
    },
    decorators: [
        StoreDecorator(
            {
                raceResult: {
                    isLoading: true,
                    success: false,
                    raceData: null,
                    userChoice: null,
                    horses: [],
                    winnerHorse: null,
                    error: '',
                },
            },
            { raceResult: raceResultReducer as Reducer<RaceResultSchema | undefined> },
        ),
    ],
};

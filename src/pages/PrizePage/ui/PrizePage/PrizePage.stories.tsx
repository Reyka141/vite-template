import { PrizeStatus } from '@/entities/User';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import type { Meta, StoryObj } from '@storybook/react';
import { Reducer } from 'redux';
import { prizeReducer } from '../../model/slice/prizeSlice';
import { PrizeSchema } from '../../model/types/prizeSchema';
import PrizePage from './PrizePage';
const prizeData: PrizeSchema = {
    ids: [1, 2, 3],
    entities: {
        '1': {
            id: 1,
            eventId: 1,
            prizeText: '5 000 $',
            winsCount: 3,
            totalRaces: 3,
            status: PrizeStatus.NEW,
            timestamp: '2024-04-07T12:15:35.635Z',
            updateTime: '2024-04-07T12:24:35.635Z',
        },
        '2': {
            id: 2,
            eventId: 1,
            prizeText: '2 500 $',
            winsCount: 2,
            totalRaces: 3,
            status: PrizeStatus.NEW,
            timestamp: '2024-04-07T12:15:35.635Z',
            updateTime: '2024-04-07T12:24:35.635Z',
        },

        '3': {
            id: 3,
            eventId: 1,
            prizeText: 'no problem, you can try your luck on our website',
            winsCount: 0,
            totalRaces: 3,
            status: PrizeStatus.NEW,
            timestamp: '2024-04-07T12:15:35.635Z',
            updateTime: '2024-04-07T12:24:35.635Z',
        },
    },
    isLoading: false,
    error: '',
};

const prizeNoData: PrizeSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: '',
};

const prizeLoading: PrizeSchema = {
    ids: [],
    entities: {},
    isLoading: true,
    error: '',
};

const meta = {
    title: 'pages/PrizePage',
    component: PrizePage,
    args: {
        className: 'storybook_container',
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PrizePage>;

export default meta;
type Story = StoryObj<typeof PrizePage>;

export const MainPage: Story = {
    decorators: [
        StoreDecorator({ prize: prizeData }, { prize: prizeReducer as Reducer<PrizeSchema | undefined> }, false),
        RouteDecorator(['/prize/1'], '/prize/:id'),
    ],
};
export const PrizeTwo: Story = {
    decorators: [
        StoreDecorator({ prize: prizeData }, { prize: prizeReducer as Reducer<PrizeSchema | undefined> }, false),
        RouteDecorator(['/prize/2'], '/prize/:id'),
    ],
};
export const PrizeThree: Story = {
    decorators: [
        StoreDecorator({ prize: prizeData }, { prize: prizeReducer as Reducer<PrizeSchema | undefined> }, false),
        RouteDecorator(['/prize/3'], '/prize/:id'),
    ],
};

export const NoData: Story = {
    decorators: [
        StoreDecorator({ prize: prizeNoData }, { prize: prizeReducer as Reducer<PrizeSchema | undefined> }, false),
        RouteDecorator(['/prize/1'], '/prize/:id'),
    ],
};

export const Loading: Story = {
    decorators: [StoreDecorator({ prize: prizeLoading }, { prize: prizeReducer as Reducer<PrizeSchema | undefined> })],
};

// export const MainPageWithNotFinishedRaces: Story = {
//     decorators: [
//         StoreDecorator(
//             { prize: prizeDataWithNotFinishedRaces },
//             { prize: prizeReducer as Reducer<PrizeSchema | undefined> },
//         ),
//     ],
// };

// export const NoData: Story = {
//     decorators: [
//         StoreDecorator({ history: historyNoData }, { history: historyReducer as Reducer<HistorySchema | undefined> }),
//     ],
// };

// export const Loading: Story = {
//     decorators: [
//         StoreDecorator({ history: historyLoading }, { history: historyReducer as Reducer<HistorySchema | undefined> }),
//     ],
// };

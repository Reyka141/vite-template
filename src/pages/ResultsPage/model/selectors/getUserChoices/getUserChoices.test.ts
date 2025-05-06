import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getUserChoices } from './getUserChoices';

describe('getUserChoices', () => {
    const initialState: DeepPartial<StateSchema> = {
        result: {
            userChoices: [],
            isLoading: false,
            error: undefined,
        },
    };
    const StateWithUserChoices: DeepPartial<StateSchema> = {
        result: {
            userChoices: [
                {
                    id: 1,
                    userId: 1,
                    eventId: 1,
                    raceId: 1,
                    horseId: 1,
                    reOpen: false,
                    timestamp: '2025-03-31T11:58:40.397Z',
                    horseName: 'Winner',
                    horseColor: 'blue',
                    horseStats: '13/5',
                    raceTitle: 'Race 1',
                    raceDescription: 'Race 1 of the day',
                    raceStartTime: '2025-03-31T11:46:36.784Z',
                    raceEndTime: '2025-03-31T11:48:36.784Z',
                    raceStatus: 'finished',
                    raceEnded: true,
                    raceInProgress: false,
                    raceResult: {
                        winnerHorseId: 5,
                        winnerHorseName: 'Star',
                        winnerHorseColor: 'white',
                        isUserWinner: false,
                        finishTime: '2025-03-31T11:48:41.962Z',
                    },
                    isActiveEvent: false,
                },
                {
                    id: 2,
                    userId: 1,
                    eventId: 1,
                    raceId: 2,
                    horseId: 1,
                    reOpen: false,
                    timestamp: '2025-03-31T11:58:40.397Z',
                    horseName: 'Thunder',
                    horseColor: 'green',
                    horseStats: '1/3',
                    raceTitle: 'Race 2',
                    raceDescription: 'Race 2 of the day',
                    raceStartTime: '2025-03-31T11:49:36.784Z',
                    raceEndTime: '2025-03-31T11:51:36.784Z',
                    raceStatus: 'finished',
                    raceEnded: true,
                    raceInProgress: false,
                    raceResult: {
                        winnerHorseId: 9,
                        winnerHorseName: 'Storm',
                        winnerHorseColor: 'yellow',
                        isUserWinner: false,
                        finishTime: '2025-03-31T11:51:37.077Z',
                    },
                    isActiveEvent: false,
                },
                {
                    id: 3,
                    userId: 1,
                    eventId: 1,
                    raceId: 3,
                    horseId: 2,
                    reOpen: false,
                    timestamp: '2025-03-31T11:58:40.397Z',
                    horseName: 'Champion',
                    horseColor: 'black',
                    horseStats: '9/4',
                    raceTitle: 'Race 3',
                    raceDescription: 'Race 3 of the day',
                    raceStartTime: '2025-03-31T11:52:36.784Z',
                    raceEndTime: '2025-03-31T11:54:36.784Z',
                    raceStatus: 'finished',
                    raceEnded: true,
                    raceInProgress: false,
                    raceResult: {
                        winnerHorseId: 3,
                        winnerHorseName: 'Arrow',
                        winnerHorseColor: 'pink',
                        isUserWinner: false,
                        finishTime: '2025-03-31T11:54:42.440Z',
                    },
                    isActiveEvent: false,
                },
            ],
            isLoading: false,
            error: undefined,
        },
    };
    test('должен вернуть userChoices', () => {
        expect(getUserChoices(initialState as StateSchema)).toEqual(initialState.result?.userChoices);
        expect(getUserChoices(StateWithUserChoices as StateSchema)).toEqual(StateWithUserChoices.result?.userChoices);
    });
});

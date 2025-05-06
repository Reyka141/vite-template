import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getHistoryData, getHistoryError, getHistoryIsLoading } from './historySelectors';

describe('history', () => {
    const initialState: DeepPartial<StateSchema> = {
        history: {
            historyData: null,
            isLoading: false,
            error: undefined,
        },
    };
    const StateWithHistoryData: DeepPartial<StateSchema> = {
        history: {
            historyData: {
                success: true,
                totalWins: 3,
                totalSuccessful: 6,
                totalFail: 3,
                history: [
                    {
                        eventId: 2,
                        location: 'Online',
                        startTime: '2025-04-01T08:35:55.732Z',
                        endTime: '2025-04-01T08:37:55.732Z',
                        isActive: false,
                        totalRaces: 3,
                        winRaces: 1,
                        races: [
                            {
                                raceId: 3,
                                title: 'Race 3',
                                description: 'Race 3 of the day',
                                startTime: '2025-04-01T08:41:55.732Z',
                                endTime: '2025-04-01T08:43:55.732Z',
                                isFinished: true,
                                userChoice: {
                                    horseId: 1,
                                    horseName: 'Wind',
                                    horseColor: 'birch',
                                    horseStats: '4/2',
                                    horsePosition: 1,
                                },
                                result: {
                                    isWinner: true,
                                    winnerHorseId: 1,
                                    winnerHorseName: 'Wind',
                                    winnerHorseColor: 'birch',
                                    finishTime: '2025-04-01T08:44:02.359Z',
                                },
                                timestamp: '2025-04-01T08:38:00.529Z',
                            },
                            {
                                raceId: 2,
                                title: 'Race 2',
                                description: 'Race 2 of the day',
                                startTime: '2025-04-01T08:38:55.732Z',
                                endTime: '2025-04-01T08:40:55.732Z',
                                isFinished: true,
                                userChoice: {
                                    horseId: 2,
                                    horseName: 'Lightning',
                                    horseColor: 'white',
                                    horseStats: '3/4',
                                    horsePosition: 9,
                                },
                                result: {
                                    isWinner: false,
                                    winnerHorseId: 6,
                                    winnerHorseName: 'Star',
                                    winnerHorseColor: 'blue',
                                    finishTime: '2025-04-01T08:40:58.294Z',
                                },
                                timestamp: '2025-04-01T08:38:00.529Z',
                            },
                            {
                                raceId: 1,
                                title: 'Race 1',
                                description: 'Race 1 of the day',
                                startTime: '2025-04-01T08:35:55.732Z',
                                endTime: '2025-04-01T08:37:55.732Z',
                                isFinished: true,
                                userChoice: {
                                    horseId: 1,
                                    horseName: 'Arrow',
                                    horseColor: 'purple',
                                    horseStats: '10/1',
                                    horsePosition: 5,
                                },
                                result: {
                                    isWinner: false,
                                    winnerHorseId: 5,
                                    winnerHorseName: 'Star',
                                    winnerHorseColor: 'red',
                                    finishTime: '2025-04-01T08:37:57.015Z',
                                },
                                timestamp: '2025-04-01T08:38:00.529Z',
                            },
                        ],
                    },
                    {
                        eventId: 1,
                        location: 'Moscow',
                        startTime: '2025-03-25T08:34:55.733Z',
                        endTime: '2025-03-25T08:36:55.733Z',
                        isActive: false,
                        totalRaces: 3,
                        winRaces: 2,
                        races: [
                            {
                                raceId: 3,
                                title: 'Race 3',
                                description: 'Race 3 of the past event',
                                startTime: '2025-03-25T08:40:55.733Z',
                                endTime: '2025-03-25T08:42:55.733Z',
                                isFinished: true,
                                userChoice: {
                                    horseId: 2,
                                    horseName: 'Storm',
                                    horseColor: 'black',
                                    horseStats: '14/5',
                                    horsePosition: 4,
                                },
                                result: {
                                    isWinner: false,
                                    winnerHorseId: 7,
                                    winnerHorseName: 'Blaze',
                                    winnerHorseColor: 'pink',
                                    finishTime: '2025-03-25T08:43:00.733Z',
                                },
                                timestamp: '2025-03-25T08:31:55.733Z',
                            },
                            {
                                raceId: 2,
                                title: 'Race 2',
                                description: 'Race 2 of the past event',
                                startTime: '2025-03-25T08:37:55.733Z',
                                endTime: '2025-03-25T08:39:55.733Z',
                                isFinished: true,
                                userChoice: {
                                    horseId: 5,
                                    horseName: 'Spirit',
                                    horseColor: 'black',
                                    horseStats: '11/1',
                                    horsePosition: 1,
                                },
                                result: {
                                    isWinner: true,
                                    winnerHorseId: 5,
                                    winnerHorseName: 'Spirit',
                                    winnerHorseColor: 'black',
                                    finishTime: '2025-03-25T08:39:59.733Z',
                                },
                                timestamp: '2025-03-25T08:30:55.733Z',
                            },
                            {
                                raceId: 1,
                                title: 'Race 1',
                                description: 'Race 1 of the past event',
                                startTime: '2025-03-25T08:34:55.733Z',
                                endTime: '2025-03-25T08:36:55.733Z',
                                isFinished: true,
                                userChoice: {
                                    horseId: 3,
                                    horseName: 'Lightning',
                                    horseColor: 'black',
                                    horseStats: '5/3',
                                    horsePosition: 1,
                                },
                                result: {
                                    isWinner: true,
                                    winnerHorseId: 3,
                                    winnerHorseName: 'Lightning',
                                    winnerHorseColor: 'black',
                                    finishTime: '2025-03-25T08:37:03.733Z',
                                },
                                timestamp: '2025-03-25T08:29:55.733Z',
                            },
                        ],
                    },
                ],
            },
            isLoading: false,
            error: '',
        },
    };
    test('должен вернуть historyData', () => {
        expect(getHistoryData(initialState as StateSchema)).toBeNull();
        expect(getHistoryData(StateWithHistoryData as StateSchema)).toEqual(StateWithHistoryData.history?.historyData);
    });
    test('должен вернуть isLoading', () => {
        expect(getHistoryIsLoading(initialState as StateSchema)).toEqual(initialState.history?.isLoading);
        expect(getHistoryIsLoading(StateWithHistoryData as StateSchema)).toEqual(
            StateWithHistoryData.history?.isLoading,
        );
    });
    test('должен вернуть error', () => {
        expect(getHistoryError(initialState as StateSchema)).toBeUndefined();
        expect(getHistoryError(StateWithHistoryData as StateSchema)).toEqual(StateWithHistoryData.history?.error);
    });
});

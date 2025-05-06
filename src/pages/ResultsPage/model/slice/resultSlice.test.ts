import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import fetchUserChoices from '../services/fetchUserChoices/fetchUserChoices';
import { ResultSchema } from '../types/resultSchema';
import { resultActions, resultReducer } from './resultSlice';

describe('resultSlice', () => {
    const mockDate = new Date('2024-01-01T12:00:00.000Z');

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(mockDate);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('Должен возвращать начальное состояние', () => {
        const initialState: DeepPartial<ResultSchema> = {
            userChoices: [],
            isLoading: false,
            error: undefined,
        };
        expect(resultReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('setRaceData', () => {
        test('Должен обрабатывать reducer setRaceData', () => {
            const initialState: DeepPartial<ResultSchema> = {
                userChoices: [],
            };

            const mockRaceData = {
                id: 1,
                raceId: 123,
                position: 1,
            };

            const newState = resultReducer(initialState as ResultSchema, resultActions.setRaceData(mockRaceData));

            expect(newState.userChoices).toEqual(mockRaceData);
        });
    });

    describe('fetchRaceResult', () => {
        test('Должен обрабатывать fetchRaceResult.pending', () => {
            const initialState: DeepPartial<ResultSchema> = {
                userChoices: [],
                isLoading: false,
                error: undefined,
            };

            const newState = resultReducer(initialState as ResultSchema, {
                type: fetchUserChoices.pending.type,
            });

            expect(newState.isLoading).toBe(true);
            expect(newState.error).toBe('');
        });

        test('Должен обрабатывать fetchUserChoices.fulfilled', () => {
            const initialState: DeepPartial<ResultSchema> = {
                userChoices: [],
                isLoading: true,
                error: undefined,
            };

            const mockPayload = {
                success: true,
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
            };

            const newState = resultReducer(initialState as ResultSchema, {
                type: fetchUserChoices.fulfilled.type,
                payload: mockPayload,
            });

            expect(newState.isLoading).toBe(false);
            expect(newState.userChoices).toEqual(mockPayload.userChoices);
        });

        test('Должен обрабатывать fetchUserChoices.rejected', () => {
            const initialState: DeepPartial<ResultSchema> = {
                userChoices: [],
                isLoading: true,
                error: undefined,
            };

            const error = 'Не удалось получить результаты гонки';

            const newState = resultReducer(initialState as ResultSchema, {
                type: fetchUserChoices.rejected.type,
                payload: error,
            });

            expect(newState.isLoading).toBe(false);
            expect(newState.error).toBe(error);
        });
    });
});

import { apiRequest } from '@/shared/api/api';
import { TestAsyncThunk } from '@/shared/lib/TestAsyncThunk/TestAsyncThunk';
import { FetchUserChoicesResponse } from '../../types/resultSchema';
import fetchUserChoices, { FetchUserChoicesProps } from './fetchUserChoices';
jest.mock('@/shared/api/api');

const mockedApiRequest = jest.mocked(apiRequest);

describe('fetchActiveUserChoices', () => {
    test('должен успешно получить событие', async () => {
        const eventData: FetchUserChoicesResponse = {
            success: true,
            userChoices: [
                {
                    id: 1,
                    userId: 1,
                    eventId: 1,
                    raceId: 1,
                    horseId: 1,
                    reOpen: false,
                    timestamp: '2025-03-31T08:58:26.037Z',
                    horseName: 'Star',
                    horseColor: 'birch',
                    horseStats: '7/1',
                    raceTitle: 'Race 1',
                    raceDescription: 'Race 1 of the day',
                    raceStartTime: '2025-03-31T08:59:20.938Z',
                    raceEndTime: '2025-03-31T09:01:20.938Z',
                    raceStatus: 'finished',
                    raceEnded: true,
                    raceInProgress: false,
                    raceResult: {
                        winnerHorseId: 2,
                        winnerHorseName: 'Shadow',
                        winnerHorseColor: 'red',
                        isUserWinner: false,
                        finishTime: '2025-03-31T09:01:22.992Z',
                    },
                    isActiveEvent: false,
                },
                {
                    id: 2,
                    userId: 1,
                    eventId: 1,
                    raceId: 2,
                    horseId: 2,
                    reOpen: false,
                    timestamp: '2025-03-31T08:58:26.037Z',
                    horseName: 'Arrow',
                    horseColor: 'red',
                    horseStats: '7/3',
                    raceTitle: 'Race 2',
                    raceDescription: 'Race 2 of the day',
                    raceStartTime: '2025-03-31T09:02:20.938Z',
                    raceEndTime: '2025-03-31T09:04:20.938Z',
                    raceStatus: 'finished',
                    raceEnded: true,
                    raceInProgress: false,
                    raceResult: {
                        winnerHorseId: 10,
                        winnerHorseName: 'Victor',
                        winnerHorseColor: 'red',
                        isUserWinner: false,
                        finishTime: '2025-03-31T09:04:25.107Z',
                    },
                    isActiveEvent: false,
                },
                {
                    id: 3,
                    userId: 1,
                    eventId: 1,
                    raceId: 3,
                    horseId: 1,
                    reOpen: false,
                    timestamp: '2025-03-31T08:58:26.037Z',
                    horseName: 'Flash',
                    horseColor: 'pink',
                    horseStats: '4/3',
                    raceTitle: 'Race 3',
                    raceDescription: 'Race 3 of the day',
                    raceStartTime: '2025-03-31T09:05:20.938Z',
                    raceEndTime: '2025-03-31T09:07:20.938Z',
                    raceStatus: 'finished',
                    raceEnded: true,
                    raceInProgress: false,
                    raceResult: {
                        winnerHorseId: 8,
                        winnerHorseName: 'Spirit',
                        winnerHorseColor: 'purple',
                        isUserWinner: false,
                        finishTime: '2025-03-31T09:07:27.379Z',
                    },
                    isActiveEvent: false,
                },
            ],
        };

        mockedApiRequest.mockResolvedValue(eventData);

        const thunk = new TestAsyncThunk<FetchUserChoicesResponse, FetchUserChoicesProps, string>(fetchUserChoices);
        const result = await thunk.callThunk({ eventId: '1' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toEqual(eventData);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url: '/myChoices?eventId=1',
            method: 'GET',
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('должен вернуть пустой массив при неуспешном ответе', async () => {
        const eventData = {
            success: false,
            userChoices: [],
        };

        mockedApiRequest.mockResolvedValue(eventData);

        const thunk = new TestAsyncThunk<FetchUserChoicesResponse, FetchUserChoicesProps, string>(fetchUserChoices);
        const result = await thunk.callThunk({ eventId: '1' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url: '/myChoices?eventId=1',
            method: 'GET',
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });

    test('должен вернуть ошибку при отсутствии данных', async () => {
        mockedApiRequest.mockResolvedValue(null);

        const thunk = new TestAsyncThunk<FetchUserChoicesResponse, FetchUserChoicesProps, string>(fetchUserChoices);
        const result = await thunk.callThunk({ eventId: '1' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url: '/myChoices?eventId=1',
            method: 'GET',
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });

    test('должен вернуть ошибку при ошибке сети', async () => {
        mockedApiRequest.mockRejectedValue(new Error('Network Error'));

        const thunk = new TestAsyncThunk<FetchUserChoicesResponse, FetchUserChoicesProps, string>(fetchUserChoices);
        const result = await thunk.callThunk({ eventId: '1' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url: '/myChoices?eventId=1',
            method: 'GET',
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});

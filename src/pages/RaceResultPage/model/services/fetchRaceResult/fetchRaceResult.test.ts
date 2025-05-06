import { TestAsyncThunk } from '@/shared/lib/TestAsyncThunk/TestAsyncThunk';
import { apiRequest } from '@/shared/api/api';
import { FetchRaceResultResponse } from '../../types/raceResultSchema';
import fetchRaceResult, { FetchRaceResultProps } from './fetchRaceResult';
jest.mock('@/shared/api/api');

const mockedApiRequest = jest.mocked(apiRequest);

describe('fetchRaceResult', () => {
    const url = '/raceResult';
    const method = 'GET';
    test('должен успешно получить событие', async () => {
        const eventData: FetchRaceResultResponse = {
            success: true,
            raceData: {
                id: 1,
                title: 'Race 1',
                description: 'Race 1 of the day',
                startTime: '2025-03-31T11:46:36.784Z',
                endTime: '2025-03-31T11:48:36.784Z',
                isFinished: true,
                finishTime: '2025-03-31T11:48:41.962Z',
            },
            userChoice: {
                raceId: 1,
                horseId: 1,
                horseName: 'Winner',
                horseColor: 'blue',
                horseStats: '13/5',
                position: 4,
                isWinner: false,
            },
            horses: [
                {
                    id: 5,
                    name: 'Star',
                    age: 4,
                    color: 'white',
                    weight: '486 kg',
                    stats: '9/3',
                    position: 1,
                },
                {
                    id: 2,
                    name: 'Lightning',
                    age: 5,
                    color: 'white',
                    weight: '515 kg',
                    stats: '13/1',
                    position: 2,
                },
                {
                    id: 4,
                    name: 'Spirit',
                    age: 4,
                    color: 'white',
                    weight: '471 kg',
                    stats: '3/4',
                    position: 3,
                },
                {
                    id: 1,
                    name: 'Winner',
                    age: 4,
                    color: 'blue',
                    weight: '483 kg',
                    stats: '13/5',
                    position: 4,
                },
                {
                    id: 8,
                    name: 'Racer',
                    age: 3,
                    color: 'yellow',
                    weight: '534 kg',
                    stats: '1/1',
                    position: 5,
                },
                {
                    id: 7,
                    name: 'Victor',
                    age: 3,
                    color: 'white',
                    weight: '526 kg',
                    stats: '7/4',
                    position: 6,
                },
                {
                    id: 9,
                    name: 'Storm',
                    age: 5,
                    color: 'yellow',
                    weight: '515 kg',
                    stats: '14/1',
                    position: 7,
                },
                {
                    id: 10,
                    name: 'Wind',
                    age: 7,
                    color: 'red',
                    weight: '528 kg',
                    stats: '4/3',
                    position: 8,
                },
                {
                    id: 6,
                    name: 'Arrow',
                    age: 5,
                    color: 'purple',
                    weight: '461 kg',
                    stats: '3/5',
                    position: 9,
                },
                {
                    id: 3,
                    name: 'Flash',
                    age: 8,
                    color: 'pink',
                    weight: '480 kg',
                    stats: '10/2',
                    position: 10,
                },
            ],
            winnerHorse: {
                id: 5,
                name: 'Star',
                color: 'white',
            },
        };

        mockedApiRequest.mockResolvedValue(eventData);

        const thunk = new TestAsyncThunk<FetchRaceResultResponse, FetchRaceResultProps, string>(fetchRaceResult);
        const result = await thunk.callThunk({ raceId: '1', eventId: '1' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toEqual(eventData);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url: `${url}/1?eventId=1`,
            method,
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('должен вернуть ошибку при неуспешном ответе', async () => {
        const eventData = {
            success: false,
            raceData: null,
        };

        mockedApiRequest.mockResolvedValue(eventData);

        const thunk = new TestAsyncThunk<FetchRaceResultResponse, FetchRaceResultProps, string>(fetchRaceResult);
        const result = await thunk.callThunk({ raceId: '1', eventId: '1' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url: `${url}/1?eventId=1`,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('fetchRaceResult error');
    });

    test('должен вернуть ошибку при отсутствии данных', async () => {
        mockedApiRequest.mockResolvedValue(null);

        const thunk = new TestAsyncThunk<FetchRaceResultResponse, FetchRaceResultProps, string>(fetchRaceResult);
        const result = await thunk.callThunk({ raceId: '1', eventId: '1' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url: `${url}/1?eventId=1`,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('fetchRaceResult error');
    });

    test('должен вернуть ошибку при ошибке сети', async () => {
        mockedApiRequest.mockRejectedValue(new Error('Network Error'));

        const thunk = new TestAsyncThunk<FetchRaceResultResponse, FetchRaceResultProps, string>(fetchRaceResult);
        const result = await thunk.callThunk({ raceId: '1', eventId: '1' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url: `${url}/1?eventId=1`,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('fetchRaceResult error');
    });
});

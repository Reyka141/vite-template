import { apiRequest } from '@/shared/api/api';
import { TestAsyncThunk } from '@/shared/lib/TestAsyncThunk/TestAsyncThunk';
import { Event } from '../../types/eventSchema';
import type { FetchLastEventResponse } from './fetchLastEvent';
import { fetchLastEvent } from './fetchLastEvent';

jest.mock('@/shared/api/api');

const mockedApiRequest = jest.mocked(apiRequest);

describe('fetchLastEvent', () => {
    const url = '/lastEvent';
    const method = 'GET';
    test('должен успешно получить событие', async () => {
        const eventData = {
            success: true,
            event: {
                id: 1,
                isActive: true,
                location: 'Test Location',
                startTime: '2024-03-11T10:00:00',
                endTime: '2024-03-11T12:00:00',
                timeLeft: 3600,
                raceData: [
                    {
                        id: 1,
                        title: 'Test Race',
                        description: 'Test Description',
                        startTime: '2024-03-11T10:30:00',
                        horseData: [
                            {
                                id: 1,
                                name: 'Test Horse',
                                age: 5,
                                color: 'Brown',
                                weight: '500kg',
                                stats: 'Good',
                            },
                        ],
                    },
                ],
            } as Event,
        };

        mockedApiRequest.mockResolvedValue(eventData);

        const thunk = new TestAsyncThunk<FetchLastEventResponse, undefined, string>(fetchLastEvent);
        const result = await thunk.callThunk(undefined);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toEqual(eventData);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('должен вернуть ошибку при неуспешном ответе', async () => {
        const eventData = {
            success: false,
            event: null,
        };

        mockedApiRequest.mockResolvedValue(eventData);

        const thunk = new TestAsyncThunk<FetchLastEventResponse, undefined, string>(fetchLastEvent);
        const result = await thunk.callThunk(undefined);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });

    test('должен вернуть ошибку при отсутствии данных', async () => {
        mockedApiRequest.mockResolvedValue(null);

        const thunk = new TestAsyncThunk<FetchLastEventResponse, undefined, string>(fetchLastEvent);
        const result = await thunk.callThunk(undefined);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });

    test('должен вернуть ошибку при ошибке сети', async () => {
        mockedApiRequest.mockRejectedValue(new Error('Network Error'));

        const thunk = new TestAsyncThunk<FetchLastEventResponse, undefined, string>(fetchLastEvent);
        const result = await thunk.callThunk(undefined);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});

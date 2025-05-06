import { apiRequest } from '@/shared/api/api';
import { TestAsyncThunk } from '@/shared/lib/TestAsyncThunk/TestAsyncThunk';
import type { CreateEventResponse } from '../../types/eventSchema';
import { createEvent } from './createEvent';

jest.mock('@/shared/api/api');

const mockedApiRequest = jest.mocked(apiRequest);

describe('createEvent', () => {
    const url = '/createEvent';
    const method = 'POST';
    test('должен успешно получить событие', async () => {
        const eventData: CreateEventResponse = {
            success: true,
            message: 'Event created successfully',
        };

        mockedApiRequest.mockResolvedValue(eventData);

        const thunk = new TestAsyncThunk<CreateEventResponse, undefined, string>(createEvent);
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
        const eventData: CreateEventResponse = {
            success: false,
            message: 'Event creation failed',
        };

        mockedApiRequest.mockResolvedValue(eventData);

        const thunk = new TestAsyncThunk<CreateEventResponse, undefined, string>(createEvent);
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

        const thunk = new TestAsyncThunk<CreateEventResponse, undefined, string>(createEvent);
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

        const thunk = new TestAsyncThunk<CreateEventResponse, undefined, string>(createEvent);
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

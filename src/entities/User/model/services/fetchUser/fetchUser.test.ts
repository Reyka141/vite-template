import { apiRequest } from '@/shared/api/api';
import { TestAsyncThunk } from '@/shared/lib/TestAsyncThunk/TestAsyncThunk';
import type { FetchUserResponse } from '../../types/userSchema';
import { fetchUser } from './fetchUser';

jest.mock('@/shared/api/api');

const mockedApiRequest = jest.mocked(apiRequest);

describe('fetchUser', () => {
    const url = '/user';
    const method = 'GET';
    test('должен успешно получить пользователя', async () => {
        const userData: FetchUserResponse = {
            success: true,
            user: {
                id: '1',
                username: 'admin',
                prizes: [],
            },
            userChoices: [],
        };

        mockedApiRequest.mockResolvedValue(userData);

        const thunk = new TestAsyncThunk<FetchUserResponse, undefined, string>(fetchUser);
        const result = await thunk.callThunk(undefined);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toEqual(userData);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('должен вернуть ошибку при неуспешном ответе', async () => {
        const userData: FetchUserResponse = {
            success: false,
            user: {
                id: '1',
                username: 'admin',
                prizes: [],
            },
            userChoices: [],
        };

        mockedApiRequest.mockResolvedValue(userData);

        const thunk = new TestAsyncThunk<FetchUserResponse, undefined, string>(fetchUser);
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

        const thunk = new TestAsyncThunk<FetchUserResponse, undefined, string>(fetchUser);
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

        const thunk = new TestAsyncThunk<FetchUserResponse, undefined, string>(fetchUser);
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

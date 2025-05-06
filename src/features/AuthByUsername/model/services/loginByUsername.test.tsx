import { apiRequest } from '@/shared/api/api';
import { TestAsyncThunk } from '@/shared/lib/TestAsyncThunk/TestAsyncThunk';
import loginByUsername, { LoginByUsernameProps, LoginByUsernameResponse } from './loginByUsername';
jest.mock('@/shared/api/api');

const mockedApiRequest = jest.mocked(apiRequest);

describe('loginByUsername', () => {
    const url = '/login';
    const method = 'POST';
    test('должен вернуть пользователя', async () => {
        const userValue: LoginByUsernameResponse = {
            id: '1',
            username: 'admin',
            prizes: [],
            userChoices: [],
        };
        mockedApiRequest.mockResolvedValue(userValue);
        const thunk = new TestAsyncThunk<LoginByUsernameResponse, LoginByUsernameProps, string>(loginByUsername);
        const result = await thunk.callThunk({ username: 'admin', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toEqual(userValue);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            data: { username: 'admin', password: '123' },
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('должен вернуть ошибку', async () => {
        mockedApiRequest.mockRejectedValue({ response: { status: 403 } });
        const thunk = new TestAsyncThunk<LoginByUsernameResponse, LoginByUsernameProps, string>(loginByUsername);
        const result = await thunk.callThunk({ username: '123', password: '1234' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            data: { username: '123', password: '1234' },
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Invalid username or password');
    });
});

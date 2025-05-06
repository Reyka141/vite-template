import { apiRequest } from '@/shared/api/api';
import { TestAsyncThunk } from '@/shared/lib/TestAsyncThunk/TestAsyncThunk';
import { PrizeStatus } from '@/entities/User';
import { FetchPrizesResponse } from '../../types/prizeSchema';
import fetchUserPrizes from './fetchUserPrizes';
jest.mock('@/shared/api/api');

const mockedApiRequest = jest.mocked(apiRequest);

describe('fetchUserHistory', () => {
    const url = '/userPrizes';
    const method = 'GET';
    test('должен успешно получить событие', async () => {
        const data: FetchPrizesResponse = {
            success: true,
            userId: 1,
            userName: 'admin',
            prizes: [
                {
                    id: 1,
                    eventId: 1,
                    prizeText: '2 500 $',
                    winsCount: 2,
                    totalRaces: 3,
                    status: PrizeStatus.TAKEN,
                    timestamp: '2024-04-07T12:15:35.635Z',
                    updateTime: '2024-04-07T12:24:35.635Z',
                },
            ],
            totalPrizes: 1,
        };

        mockedApiRequest.mockResolvedValue(data);

        const thunk = new TestAsyncThunk<FetchPrizesResponse, undefined, string>(fetchUserPrizes);
        const result = await thunk.callThunk(undefined);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toEqual(data);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('должен вернуть пустой массив при неуспешном ответе', async () => {
        const eventData: FetchPrizesResponse = {
            success: false,
            userId: 0,
            userName: 'user',
            prizes: [],
            totalPrizes: 0,
        };

        mockedApiRequest.mockResolvedValue(eventData);

        const thunk = new TestAsyncThunk<FetchPrizesResponse, undefined, string>(fetchUserPrizes);
        const result = await thunk.callThunk(undefined);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(eventData);
    });

    test('должен вернуть ошибку при отсутствии данных', async () => {
        mockedApiRequest.mockResolvedValue(null);

        const thunk = new TestAsyncThunk<FetchPrizesResponse, undefined, string>(fetchUserPrizes);
        const result = await thunk.callThunk(undefined);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toBeNull();
    });

    test('должен вернуть ошибку при ошибке сети', async () => {
        mockedApiRequest.mockRejectedValue(new Error('Network Error'));

        const thunk = new TestAsyncThunk<FetchPrizesResponse, undefined, string>(fetchUserPrizes);
        const result = await thunk.callThunk(undefined);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('fetchUserPrizes error');
    });
});

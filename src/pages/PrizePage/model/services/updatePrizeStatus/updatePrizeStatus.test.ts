import { PrizeStatus } from '@/entities/User';
import { apiRequest } from '@/shared/api/api';
import { TestAsyncThunk } from '@/shared/lib/TestAsyncThunk/TestAsyncThunk';
import { UpdatePrizeStatusProps, UpdatePrizeStatusResponse } from '../../types/prizeSchema';
import updatePrizeStatus from './updatePrizeStatus';

jest.mock('@/shared/api/api');

const mockedApiRequest = jest.mocked(apiRequest);

describe('updatePrizeStatus', () => {
    const url = '/updatePrizeStatus';
    const method = 'POST';
    test('должен успешно обновить статус приза', async () => {
        const prizeData: UpdatePrizeStatusResponse = {
            success: true,
            message: 'success',
            prize: {
                id: 1,
                eventId: 1,
                prizeText: 'Test Prize',
                winsCount: 0,
                totalRaces: 0,
                status: PrizeStatus.TAKEN,
                timestamp: '2024-03-11T10:00:00',
                updateTime: '2024-03-11T10:00:00',
            },
        };

        mockedApiRequest.mockResolvedValue(prizeData);

        const thunk = new TestAsyncThunk<UpdatePrizeStatusResponse, UpdatePrizeStatusProps, string>(updatePrizeStatus);
        const result = await thunk.callThunk({
            prizeId: 1,
            status: PrizeStatus.TAKEN,
        });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toEqual(prizeData);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            data: {
                prizeId: 1,
                status: PrizeStatus.TAKEN,
            },
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('должен вернуть ошибку при неуспешном ответе', async () => {
        const prizeData: UpdatePrizeStatusResponse = {
            success: false,
            prize: null,
            message: 'error',
        };

        mockedApiRequest.mockResolvedValue(prizeData);

        const thunk = new TestAsyncThunk<UpdatePrizeStatusResponse, UpdatePrizeStatusProps, string>(updatePrizeStatus);
        const result = await thunk.callThunk({
            prizeId: 1,
            status: PrizeStatus.TAKEN,
        });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            data: {
                prizeId: 1,
                status: PrizeStatus.TAKEN,
            },
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('updatePrizeStatus error');
    });

    test('должен вернуть ошибку при отсутствии данных', async () => {
        mockedApiRequest.mockResolvedValue(null);

        const thunk = new TestAsyncThunk<UpdatePrizeStatusResponse, UpdatePrizeStatusProps, string>(updatePrizeStatus);
        const result = await thunk.callThunk({
            prizeId: 1,
            status: PrizeStatus.TAKEN,
        });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            data: {
                prizeId: 1,
                status: PrizeStatus.TAKEN,
            },
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('updatePrizeStatus error');
    });

    test('должен вернуть ошибку при ошибке сети', async () => {
        mockedApiRequest.mockRejectedValue(new Error('Network Error'));

        const thunk = new TestAsyncThunk<UpdatePrizeStatusResponse, UpdatePrizeStatusProps, string>(updatePrizeStatus);
        const result = await thunk.callThunk({
            prizeId: 1,
            status: PrizeStatus.TAKEN,
        });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedApiRequest).toHaveBeenCalledWith(expect.anything(), {
            data: {
                prizeId: 1,
                status: PrizeStatus.TAKEN,
            },
            url,
            method,
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('updatePrizeStatus error');
    });
});

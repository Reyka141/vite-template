import { PrizeStatus } from '@/entities/User';
import fetchUserPrizes from '../services/fetchUserPrizes/fetchUserPrizes';
import updatePrizeStatus from '../services/updatePrizeStatus/updatePrizeStatus';
import { FetchPrizesResponse, PrizeSchema, UpdatePrizeStatusResponse } from '../types/prizeSchema';
import { prizeReducer } from './prizeSlice';
describe('prizeSlice', () => {
    test('Должен вернуть начальное состояние', () => {
        const initialState: PrizeSchema = {
            isLoading: false,
            error: undefined,
            ids: [],
            entities: {},
        };
        expect(prizeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('fetchUserPrizes', () => {
        test('Должен вернуть начальное состояние', () => {
            const initialState: PrizeSchema = {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            };
            expect(prizeReducer(initialState, { type: fetchUserPrizes.pending.type })).toEqual({
                ...initialState,
                error: '',
                isLoading: true,
            });
        });
        test('Должен вернуть состояние при успешном запросе', () => {
            const initialState: PrizeSchema = {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            };
            const mockData: FetchPrizesResponse = {
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
            const newState = prizeReducer(initialState, {
                type: fetchUserPrizes.fulfilled.type,
                payload: mockData,
            });
            expect(newState.isLoading).toBe(false);
            expect(newState.ids).toEqual([1]);
            expect(newState.entities[1]).toEqual(mockData.prizes[0]);
        });
        test('Должен вернуть состояние при ошибке запроса', () => {
            const initialState: PrizeSchema = {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            };
            const newState = prizeReducer(initialState, {
                type: fetchUserPrizes.rejected.type,
                payload: 'error',
            });
            expect(newState.isLoading).toBe(false);
            expect(newState.error).toBe('error');
        });
    });
    describe('updatePrizeStatus', () => {
        test('Должен вернуть начальное состояние', () => {
            const initialState: PrizeSchema = {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            };
            expect(prizeReducer(initialState, { type: updatePrizeStatus.pending.type })).toEqual({
                ...initialState,
                error: '',
                isLoading: true,
            });
        });
        test('Должен вернуть состояние при успешном запросе', () => {
            const initialState: PrizeSchema = {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            };
            const mockData: UpdatePrizeStatusResponse = {
                success: true,
                message: 'success',
                prize: {
                    id: 1,
                    eventId: 1,
                    prizeText: '2 500 $',
                    winsCount: 2,
                    totalRaces: 3,
                    status: PrizeStatus.TAKEN,
                    timestamp: '2024-04-07T12:15:35.635Z',
                    updateTime: '2024-04-07T12:24:35.635Z',
                },
            };
            const newState = prizeReducer(initialState, {
                type: updatePrizeStatus.fulfilled.type,
                payload: mockData,
            });
            expect(newState.isLoading).toBe(false);
            expect(newState.ids).toEqual([1]);
            expect(newState.entities[1]).toEqual(mockData.prize);
        });
        test('Должен вернуть состояние при ошибке запроса', () => {
            const initialState: PrizeSchema = {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            };
            const newState = prizeReducer(initialState, {
                type: updatePrizeStatus.rejected.type,
                payload: 'error',
            });
            expect(newState.isLoading).toBe(false);
            expect(newState.error).toBe('error');
        });
    });
});

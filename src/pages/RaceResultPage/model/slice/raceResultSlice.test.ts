import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import fetchRaceResult from '../services/fetchRaceResult/fetchRaceResult';
import { RaceResultSchema } from '../types/raceResultSchema';
import { raceResultActions, raceResultReducer } from './raceResultSlice';

describe('raceResultSlice', () => {
    const mockDate = new Date('2024-01-01T12:00:00.000Z');

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(mockDate);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('Должен возвращать начальное состояние', () => {
        const initialState: DeepPartial<RaceResultSchema> = {
            success: false,
            raceData: null,
            userChoice: null,
            horses: [],
            winnerHorse: null,
            isLoading: false,
            error: undefined,
        };
        expect(raceResultReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('setRaceData', () => {
        test('Должен обрабатывать reducer setRaceData', () => {
            const initialState: DeepPartial<RaceResultSchema> = {
                raceData: null,
            };

            const mockRaceData = {
                id: 1,
                raceId: 123,
                position: 1,
            };

            const newState = raceResultReducer(
                initialState as RaceResultSchema,
                raceResultActions.setRaceData(mockRaceData),
            );

            expect(newState.raceData).toEqual(mockRaceData);
        });
    });

    describe('fetchRaceResult', () => {
        test('Должен обрабатывать fetchRaceResult.pending', () => {
            const initialState: DeepPartial<RaceResultSchema> = {
                success: false,
                raceData: null,
                userChoice: null,
                horses: [],
                winnerHorse: null,
                isLoading: false,
                error: undefined,
            };

            const newState = raceResultReducer(initialState as RaceResultSchema, {
                type: fetchRaceResult.pending.type,
            });

            expect(newState.isLoading).toBe(true);
            expect(newState.error).toBe('');
        });

        test('Должен обрабатывать fetchRaceResult.fulfilled', () => {
            const initialState: DeepPartial<RaceResultSchema> = {
                success: false,
                raceData: null,
                userChoice: null,
                horses: [],
                winnerHorse: null,
                isLoading: true,
                error: undefined,
            };

            const mockPayload = {
                raceData: { id: 1, raceId: 123 },
                userChoice: { horseId: 2, amount: 100 },
                horses: [
                    { id: 1, name: 'Молния', coefficient: 1.5 },
                    { id: 2, name: 'Буран', coefficient: 2.0 },
                ],
                winnerHorse: { id: 1, name: 'Молния', coefficient: 1.5 },
            };

            const newState = raceResultReducer(initialState as RaceResultSchema, {
                type: fetchRaceResult.fulfilled.type,
                payload: mockPayload,
            });

            expect(newState.isLoading).toBe(false);
            expect(newState.raceData).toEqual(mockPayload.raceData);
            expect(newState.userChoice).toEqual(mockPayload.userChoice);
            expect(newState.horses).toEqual(mockPayload.horses);
            expect(newState.winnerHorse).toEqual(mockPayload.winnerHorse);
        });

        test('Должен обрабатывать fetchRaceResult.rejected', () => {
            const initialState: DeepPartial<RaceResultSchema> = {
                success: false,
                raceData: null,
                userChoice: null,
                horses: [],
                winnerHorse: null,
                isLoading: true,
                error: undefined,
            };

            const error = 'Не удалось получить результаты гонки';

            const newState = raceResultReducer(initialState as RaceResultSchema, {
                type: fetchRaceResult.rejected.type,
                payload: error,
            });

            expect(newState.isLoading).toBe(false);
            expect(newState.error).toBe(error);
        });
    });
});

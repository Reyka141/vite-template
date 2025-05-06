import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getEvent } from './getEvent';

describe('getEvent селектор', () => {
    const mockEvent = {
        id: 1,
        isActive: true,
        location: 'Test Location',
        startTime: '2024-03-11T10:00:00',
        endTime: '2024-03-11T12:00:00',
        timeLeft: 3600,
    };

    test('должен корректно извлекать данные события из стейта', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                event: mockEvent,
                isLoading: false,
                error: '',
            },
        };

        expect(getEvent(state as StateSchema)).toEqual({
            event: mockEvent,
            isLoading: false,
            error: '',
        });
    });

    test('должен возвращать undefined при пустом стейте', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getEvent(state as StateSchema)).toBeUndefined();
    });

    test('должен возвращать состояние загрузки и ошибки', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                event: undefined,
                isLoading: true,
                error: 'Ошибка загрузки',
            },
        };

        expect(getEvent(state as StateSchema)).toEqual({
            event: undefined,
            isLoading: true,
            error: 'Ошибка загрузки',
        });
    });
});

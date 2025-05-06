import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getIsActive } from './getIsActive';

describe('getIsActive', () => {
    test('должен вернуть статус активности true', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                event: {
                    id: 1,
                    isActive: true,
                    location: 'Test Location',
                    startTime: '2024-03-11T10:00:00',
                    endTime: '2024-03-11T12:00:00',
                    timeLeft: 3600,
                },
                isLoading: false,
                error: '',
            },
        };
        expect(getIsActive(state as StateSchema)).toEqual(true);
    });

    test('должен вернуть статус активности false', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                event: {
                    id: 1,
                    isActive: false,
                    location: 'Test Location',
                    startTime: '2024-03-11T10:00:00',
                    endTime: '2024-03-11T12:00:00',
                    timeLeft: 0,
                },
                isLoading: false,
                error: '',
            },
        };
        expect(getIsActive(state as StateSchema)).toEqual(false);
    });

    test('должен работать с пустым стейтом', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getIsActive(state as StateSchema)).toEqual(false);
    });
});

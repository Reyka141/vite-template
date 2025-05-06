import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getIsLoading } from './getIsLoading';

describe('getIsLoading', () => {
    test('должен вернуть статус загрузки true', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                event: {
                    id: 1,
                    isActive: false,
                    location: '',
                    startTime: '',
                    endTime: '',
                    timeLeft: 0,
                },
                isLoading: true,
                error: '',
            },
        };
        expect(getIsLoading(state as StateSchema)).toEqual(true);
    });

    test('должен вернуть статус загрузки false', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                event: {
                    id: 1,
                    isActive: false,
                    location: '',
                    startTime: '',
                    endTime: '',
                    timeLeft: 0,
                },
                isLoading: false,
                error: '',
            },
        };
        expect(getIsLoading(state as StateSchema)).toEqual(false);
    });

    test('должен работать с пустым стейтом', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getIsLoading(state as StateSchema)).toEqual(false);
    });
});

import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getUserInitialized } from './getUserInitialized';

describe('getUserInitialized', () => {
    test('должен вернуть true, если пользователь инициализирован', () => {
        const initialized = true;

        const state: DeepPartial<StateSchema> = {
            user: {
                _initialized: initialized,
            },
        };

        expect(getUserInitialized(state as StateSchema)).toEqual(initialized);
    });

    test('должен вернуть false, если пользователь не инициализирован', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                _initialized: false,
            },
        };

        expect(getUserInitialized(state as StateSchema)).toBe(false);
    });
});

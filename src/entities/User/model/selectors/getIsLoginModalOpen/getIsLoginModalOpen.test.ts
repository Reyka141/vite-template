import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getIsLoginModalOpen } from './getIsLoginModalOpen';

describe('getIsLoginModalOpen', () => {
    test('должен вернуть true, если модалка открыта', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                isLoginModalOpen: true,
            },
        };

        expect(getIsLoginModalOpen(state as StateSchema)).toBe(true);
    });

    test('должен вернуть false, если модалка закрыта', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                isLoginModalOpen: false,
            },
        };

        expect(getIsLoginModalOpen(state as StateSchema)).toBe(false);
    });
});

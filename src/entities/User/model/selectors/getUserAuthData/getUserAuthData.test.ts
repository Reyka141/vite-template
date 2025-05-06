import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { User } from '../../types/userSchema';
import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData', () => {
    test('должен вернуть данные приза, если он есть в стейте', () => {
        const authData: User = {
            id: '1',
            username: 'Test User',
            prizes: [],
        };

        const state: DeepPartial<StateSchema> = {
            user: {
                authData,
            },
        };

        expect(getUserAuthData(state as StateSchema)).toEqual(authData);
    });

    test('должен вернуть дефолтные значения, если приз отсутствует', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: undefined,
            },
        };

        expect(getUserAuthData(state as StateSchema)).toBeUndefined();
    });
});

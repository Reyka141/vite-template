import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername', () => {
    test('должен вернуть имя пользователя', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'admin',
                password: '123456',
                isLoading: false,
            },
        };
        expect(getLoginUsername(state as StateSchema)).toEqual('admin');
    });

    test('должен работать с пустым стейтом', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    });
});

import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';

describe('getLoginPassword', () => {
    test('должен вернуть пароль', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: '',
                password: '123123',
                isLoading: false,
            },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('123123');
    });

    test('должен работать с пустым стейтом', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});

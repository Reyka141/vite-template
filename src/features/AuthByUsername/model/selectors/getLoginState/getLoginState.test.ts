import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginState } from './getLoginState';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';

describe('getLoginState', () => {
    test('должен вернуть состояние логина', () => {
        const loginForm = {
            username: 'admin',
            password: '123',
            isLoading: false,
            error: '',
        };
        const state: DeepPartial<StateSchema> = {
            loginForm,
        };
        expect(getLoginState(state as StateSchema)).toEqual(loginForm);
    });

    test('должен работать с пустым стейтом', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginState(state as StateSchema)).toEqual(undefined);
    });
});

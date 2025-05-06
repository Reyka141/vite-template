import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginError } from './getLoginError';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';

describe('getLoginError', () => {
    test('должен вернуть ошибку', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: '',
                password: '',
                isLoading: false,
                error: 'error',
            },
        };
        expect(getLoginError(state as StateSchema)).toEqual('error');
    });

    test('должен работать с пустым стейтом', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginError(state as StateSchema)).toEqual('');
    });
});

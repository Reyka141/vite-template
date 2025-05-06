import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getIsLoading } from './getIsLoading';

describe('getIsLoading', () => {
    const initialState: DeepPartial<StateSchema> = {
        result: {
            userChoices: [],
            isLoading: false,
            error: undefined,
        },
    };

    const StateWithIsLoading: DeepPartial<StateSchema> = {
        result: {
            userChoices: [],
            isLoading: true,
            error: undefined,
        },
    };

    test('должен вернуть isLoading', () => {
        expect(getIsLoading(initialState as StateSchema)).toEqual(initialState.result?.isLoading);
        expect(getIsLoading(StateWithIsLoading as StateSchema)).toEqual(StateWithIsLoading.result?.isLoading);
    });
});

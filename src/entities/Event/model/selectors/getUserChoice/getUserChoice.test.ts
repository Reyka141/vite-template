import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getUserChoices } from './getUserChoice';

describe('getUserChoices', () => {
    test('должен возвращать userChoices из state', () => {
        const userChoices = [
            { raceId: 1, horseId: 2, reOpen: false },
            { raceId: 2, horseId: 3, reOpen: true },
        ];

        const state: DeepPartial<StateSchema> = {
            event: {
                userChoices,
            },
        };

        expect(getUserChoices(state as StateSchema)).toEqual(userChoices);
    });

    test('должен возвращать undefined если userChoices отсутствует', () => {
        const state: DeepPartial<StateSchema> = {
            event: {},
        };

        expect(getUserChoices(state as StateSchema)).toBeUndefined();
    });
});

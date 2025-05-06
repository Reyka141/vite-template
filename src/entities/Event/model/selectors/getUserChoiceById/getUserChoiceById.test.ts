import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getUserChoiceById } from './getUserChoiceById';

describe('getUserChoiceById', () => {
    test('должен возвращать выбор пользователя по id гонки', () => {
        const userChoices = [
            { raceId: 1, horseId: 2, reOpen: false },
            { raceId: 2, horseId: 3, reOpen: true },
        ];

        const state: DeepPartial<StateSchema> = {
            event: {
                userChoices,
            },
        };

        expect(getUserChoiceById(state as StateSchema, 1)).toEqual(userChoices[0]);
        expect(getUserChoiceById(state as StateSchema, 2)).toEqual(userChoices[1]);
    });

    test('должен возвращать undefined если выбор с таким id не найден', () => {
        const userChoices = [
            { raceId: 1, horseId: 2, reOpen: false },
            { raceId: 2, horseId: 3, reOpen: true },
        ];

        const state: DeepPartial<StateSchema> = {
            event: {
                userChoices,
            },
        };

        expect(getUserChoiceById(state as StateSchema, 3)).toBeUndefined();
    });

    test('должен возвращать undefined если userChoices отсутствует', () => {
        const state: DeepPartial<StateSchema> = {
            event: {},
        };

        expect(getUserChoiceById(state as StateSchema, 1)).toBeUndefined();
    });
});

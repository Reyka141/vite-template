import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { GameStatus } from '@/shared/lib/components/getGameStatus/getGameStatus';
import { getEventStatus } from './getEventStatus';

describe('getEventStatus', () => {
    test('должен вернуть статус события', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                eventStatus: GameStatus.IN_PROGRESS,
            },
        };
        expect(getEventStatus(state as StateSchema)).toBe(GameStatus.IN_PROGRESS);
    });

    test('должен вернуть undefined если state пустой', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getEventStatus(state as StateSchema)).toBeUndefined();
    });

    test('должен вернуть undefined если event пустой', () => {
        const state: DeepPartial<StateSchema> = {
            event: {},
        };
        expect(getEventStatus(state as StateSchema)).toBeUndefined();
    });
});

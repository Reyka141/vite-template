import { StateSchema } from '@/app/providers/StoreProvider';
import { PrizeStatus } from '@/entities/User';
import { Prize } from '@/pages/PrizePage/model/types/prizeSchema';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getPrizeById } from './getPrizeById';

describe('getPrizeById', () => {
    test('должен вернуть данные приза, если он есть в стейте', () => {
        const prize: Prize = {
            id: 1,
            eventId: 1,
            prizeText: 'Test Prize',
            winsCount: 0,
            totalRaces: 0,
            status: PrizeStatus.TAKEN,
            timestamp: '2024-03-11T10:00:00',
            updateTime: '2024-03-11T10:00:00',
        };

        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    id: '1',
                    username: 'Test User',
                    prizes: [prize],
                },
            },
        };

        expect(getPrizeById(state as StateSchema, 1)).toEqual(prize);
    });

    test('должен вернуть дефолтные значения, если приз отсутствует', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    id: '1',
                    username: 'Test User',
                    prizes: [],
                },
            },
        };

        expect(getPrizeById(state as StateSchema, 1)).toBeUndefined();
    });
});

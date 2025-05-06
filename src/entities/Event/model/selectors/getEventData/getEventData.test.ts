import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getEventData } from './getEventData';

describe('getEventData', () => {
    test('должен вернуть данные события, если они есть в стейте', () => {
        const event = {
            id: 1,
            isActive: true,
            location: 'Москва',
            startTime: '2024-03-20T10:00:00',
            endTime: '2024-03-20T18:00:00',
            timeLeft: 3600,
            raceData: [],
        };

        const state: DeepPartial<StateSchema> = {
            event: {
                event,
            },
        };

        expect(getEventData(state as StateSchema)).toEqual(event);
    });

    test('должен вернуть дефолтные значения, если событие отсутствует', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                event: undefined,
            },
        };

        const expectedDefault = {
            id: 0,
            isActive: false,
            location: '',
            startTime: '',
            endTime: '',
            timeLeft: 0,
            raceData: [],
        };

        expect(getEventData(state as StateSchema)).toEqual(expectedDefault);
    });
});

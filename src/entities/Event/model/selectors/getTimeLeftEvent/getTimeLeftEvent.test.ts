import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getTimeLeftEvent } from './getTimeLeftEvent';

describe('getTimeLeftEvent', () => {
    test('должен вернуть оставшееся время', () => {
        const timeLeft = 3600;
        const state: DeepPartial<StateSchema> = {
            event: {
                event: {
                    id: 1,
                    isActive: true,
                    location: 'Test Location',
                    startTime: '2024-03-11T10:00:00',
                    endTime: '2024-03-11T12:00:00',
                    timeLeft,
                },
                isLoading: false,
                error: '',
            },
        };
        expect(getTimeLeftEvent(state as StateSchema)).toEqual(timeLeft);
    });

    test('должен вернуть 0 при отсутствии времени', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                event: {
                    id: 1,
                    isActive: false,
                    location: 'Test Location',
                    startTime: '2024-03-11T10:00:00',
                    endTime: '2024-03-11T12:00:00',
                    timeLeft: 0,
                },
                isLoading: false,
                error: '',
            },
        };
        expect(getTimeLeftEvent(state as StateSchema)).toEqual(0);
    });

    test('должен работать с пустым стейтом', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getTimeLeftEvent(state as StateSchema)).toEqual(0);
    });
});

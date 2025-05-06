import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getEventTimes } from './getEventTimes';

describe('Event Time Selectors', () => {
    const mockState: DeepPartial<StateSchema> = {
        event: {
            event: {
                id: 1,
                isActive: true,
                location: 'Test Location',
                startTime: '2024-03-11T10:00:00',
                endTime: '2024-03-11T12:00:00',
                timeLeft: 3600,
            },
            isLoading: false,
            error: '',
        },
    };

    const emptyTimeState: DeepPartial<StateSchema> = {
        event: {
            event: {
                id: 1,
                isActive: false,
                location: 'Test Location',
                startTime: '',
                endTime: '',
                timeLeft: 0,
            },
            isLoading: false,
            error: '',
        },
    };

    describe('getEventTimes', () => {
        test('должен вернуть время начала и конца события', () => {
            expect(getEventTimes(mockState as StateSchema)).toEqual({
                startTime: '2024-03-11T10:00:00',
                endTime: '2024-03-11T12:00:00',
            });
        });

        test('должен вернуть пустые строки при отсутствии времени', () => {
            expect(getEventTimes(emptyTimeState as StateSchema)).toEqual({
                startTime: '',
                endTime: '',
            });
        });

        test('должен вернуть пустые строки при пустом стейте', () => {
            expect(getEventTimes({} as StateSchema)).toEqual({
                startTime: '',
                endTime: '',
            });
        });
    });
});

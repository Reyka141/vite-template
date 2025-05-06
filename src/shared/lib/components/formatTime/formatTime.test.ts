import { formatTime } from './formatTime.ts';

describe('formatTime', () => {
    const timeFormat = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    } as const;

    const getExpectedTime = (time: string) => {
        return new Date(time).toLocaleTimeString('ru-RU', timeFormat);
    };

    const testCases = [
        {
            name: 'должен форматировать время в формате ЧЧ:ММ',
            time: '2025-03-10T09:40:00.000Z',
        },
        {
            name: 'должен корректно обрабатывать полночь',
            time: '2025-03-10T00:00:00.000Z',
        },
        {
            name: 'должен корректно обрабатывать полдень',
            time: '2025-03-10T12:00:00.000Z',
        },
        {
            name: 'должен корректно обрабатывать время перед полуночью',
            time: '2025-03-10T23:59:00.000Z',
        },
        {
            name: 'должен корректно форматировать минуты < 10',
            time: '2025-03-10T10:05:00.000Z',
        },
    ];

    testCases.forEach(({ name, time }) => {
        it(name, () => {
            const formattedTime = formatTime(time);
            expect(formattedTime).toBe(getExpectedTime(time));
        });
    });

    it('должен обрабатывать некорректную дату', () => {
        expect(formatTime('invalid-date')).toBe('00:00');
    });
});

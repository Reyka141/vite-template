import { getTimeLeft } from './getTimeLeft';

describe('getTimeLeft', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-03-20T10:00:00Z'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('должен вернуть положительное количество секунд до начала события', () => {
        const startTime = '2024-03-20T10:30:00Z';
        const endTime = '2024-03-20T11:00:00Z';
        expect(getTimeLeft(startTime, endTime)).toBe(1800); // 30 минут = 1800 секунд
    });

    test('должен вернуть положительное количество секунд во время события', () => {
        const startTime = '2024-03-20T09:30:00Z';
        const endTime = '2024-03-20T10:30:00Z';
        expect(getTimeLeft(startTime, endTime)).toBe(1800); // 30 минут = 1800 секунд
    });

    test('должен вернуть 0 для времени после окончания события', () => {
        const startTime = '2024-03-20T09:00:00Z';
        const endTime = '2024-03-20T09:30:00Z';
        expect(getTimeLeft(startTime, endTime)).toBe(0);
    });

    test('должен вернуть 0 для текущего времени в момент окончания события', () => {
        const startTime = '2024-03-20T09:00:00Z';
        const endTime = '2024-03-20T10:00:00Z';
        expect(getTimeLeft(startTime, endTime)).toBe(0);
    });
});

import { GameStatus, getGameStatus } from './getGameStatus';

describe('getGameStatus', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('должен вернуть NOT_STARTED, когда текущее время меньше времени начала', () => {
        const now = new Date('2024-03-20T10:00:00');
        jest.setSystemTime(now);

        const startTime = '2024-03-20T11:00:00';
        const endTime = '2024-03-20T12:00:00';

        expect(getGameStatus(startTime, endTime)).toBe(GameStatus.NOT_STARTED);
    });

    test('должен вернуть IN_PROGRESS, когда текущее время между началом и концом', () => {
        const now = new Date('2024-03-20T11:30:00');
        jest.setSystemTime(now);

        const startTime = '2024-03-20T11:00:00';
        const endTime = '2024-03-20T12:00:00';

        expect(getGameStatus(startTime, endTime)).toBe(GameStatus.IN_PROGRESS);
    });

    test('должен вернуть FINISHED, когда текущее время больше времени окончания', () => {
        const now = new Date('2024-03-20T13:00:00');
        jest.setSystemTime(now);

        const startTime = '2024-03-20T11:00:00';
        const endTime = '2024-03-20T12:00:00';

        expect(getGameStatus(startTime, endTime)).toBe(GameStatus.FINISHED);
    });

    test('должен вернуть IN_PROGRESS, когда текущее время равно времени начала', () => {
        const now = new Date('2024-03-20T11:00:00');
        jest.setSystemTime(now);

        const startTime = '2024-03-20T11:00:00';
        const endTime = '2024-03-20T12:00:00';

        expect(getGameStatus(startTime, endTime)).toBe(GameStatus.IN_PROGRESS);
    });

    test('должен вернуть FINISHED, когда текущее время равно времени окончания', () => {
        const now = new Date('2024-03-20T12:00:00');
        jest.setSystemTime(now);

        const startTime = '2024-03-20T11:00:00';
        const endTime = '2024-03-20T12:00:00';

        expect(getGameStatus(startTime, endTime)).toBe(GameStatus.FINISHED);
    });
});

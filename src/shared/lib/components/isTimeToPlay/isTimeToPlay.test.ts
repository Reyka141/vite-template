import { isTimeToPlay } from './isTimeToPlay';

describe('isTimeToPlay', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-03-20T12:00:00Z'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('должен вернуть true, когда текущее время находится между начальным и конечным временем', () => {
        const startTime = '2024-03-20T11:00:00Z';
        const endTime = '2024-03-20T13:00:00Z';

        expect(isTimeToPlay(startTime, endTime)).toBe(true);
    });

    test('должен вернуть false, когда текущее время раньше начального времени', () => {
        const startTime = '2024-03-20T13:00:00Z';
        const endTime = '2024-03-20T14:00:00Z';

        expect(isTimeToPlay(startTime, endTime)).toBe(false);
    });

    test('должен вернуть false, когда текущее время позже конечного времени', () => {
        const startTime = '2024-03-20T10:00:00Z';
        const endTime = '2024-03-20T11:00:00Z';

        expect(isTimeToPlay(startTime, endTime)).toBe(false);
    });

    test('должен вернуть true, когда текущее время равно начальному времени', () => {
        const startTime = '2024-03-20T12:00:00Z';
        const endTime = '2024-03-20T13:00:00Z';

        expect(isTimeToPlay(startTime, endTime)).toBe(true);
    });

    test('должен вернуть false, когда текущее время равно конечному времени', () => {
        const startTime = '2024-03-20T11:00:00Z';
        const endTime = '2024-03-20T12:00:00Z';

        expect(isTimeToPlay(startTime, endTime)).toBe(false);
    });
});

import { formatDate } from './formatDate';

describe('formatDate', () => {
    test('форматирует действительную дату корректно', () => {
        expect(formatDate('2023-05-15')).toBe('May 15, 2023');
    });

    test('возвращает специальную строку для некорректной даты', () => {
        expect(formatDate('invalid-date')).toBe('-/-/-');
    });

    test('корректно обрабатывает пустую строку', () => {
        expect(formatDate('')).toBe('-/-/-');
    });

    test('корректно форматирует дату с временем', () => {
        expect(formatDate('2023-05-15T14:30:00')).toBe('May 15, 2023');
    });

    test('корректно форматирует дату в формате ISO', () => {
        expect(formatDate('2023-05-15T14:30:00.000Z')).toBe('May 15, 2023');
    });

    test('корректно обрабатывает граничные даты', () => {
        expect(formatDate('1970-01-01')).toBe('Jan 1, 1970');
        expect(formatDate('2100-12-31')).toBe('Dec 31, 2100');
    });
});

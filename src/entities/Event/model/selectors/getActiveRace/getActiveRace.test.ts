import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getActiveRace } from './getActiveRace';

describe('getActiveRace', () => {
    test('должен вернуть активную гонку по id', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                activeRaceId: 1,
                event: {
                    id: 1,
                    isActive: true,
                    location: 'Москва',
                    startTime: '2024-03-20T10:00:00',
                    endTime: '2024-03-20T18:00:00',
                    timeLeft: 3600,
                    raceData: [
                        {
                            id: 1,
                            title: 'Гонка 1',
                            description: 'Описание 1',
                            startTime: '2024-03-20T10:00:00',
                            horseData: [],
                        },
                        {
                            id: 2,
                            title: 'Гонка 2',
                            description: 'Описание 2',
                            startTime: '2024-03-20T12:00:00',
                            horseData: [],
                        },
                    ],
                },
            },
        };

        expect(getActiveRace(state as StateSchema)).toEqual({
            id: 1,
            title: 'Гонка 1',
            description: 'Описание 1',
            startTime: '2024-03-20T10:00:00',
            horseData: [],
        });
    });

    test('должен вернуть undefined если активная гонка не найдена', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                activeRaceId: 3,
                event: {
                    id: 1,
                    isActive: true,
                    location: 'Москва',
                    startTime: '2024-03-20T10:00:00',
                    endTime: '2024-03-20T18:00:00',
                    timeLeft: 3600,
                    raceData: [
                        {
                            id: 1,
                            title: 'Гонка 1',
                            description: 'Описание 1',
                            startTime: '2024-03-20T10:00:00',
                            horseData: [],
                        },
                        {
                            id: 2,
                            title: 'Гонка 2',
                            description: 'Описание 2',
                            startTime: '2024-03-20T12:00:00',
                            horseData: [],
                        },
                    ],
                },
            },
        };

        expect(getActiveRace(state as StateSchema)).toBeUndefined();
    });

    test('должен вернуть undefined если нет данных о гонках', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                activeRaceId: 1,
                event: {
                    id: 1,
                    isActive: true,
                    location: 'Москва',
                    startTime: '2024-03-20T10:00:00',
                    endTime: '2024-03-20T18:00:00',
                    timeLeft: 3600,
                    raceData: [],
                },
            },
        };

        expect(getActiveRace(state as StateSchema)).toBeUndefined();
    });
});

import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { GameStatus } from '@/shared/lib/components/getGameStatus/getGameStatus';
import { getRaceData } from './getRaceData';

describe('getRaceData', () => {
    test('должен вернуть массив данных о гонках', () => {
        const mockRaceData = [
            {
                id: 1,
                title: 'Тестовая гонка',
                description: 'Описание тестовой гонки',
                startTime: '2024-03-20T10:00:00',
                horseData: [
                    {
                        id: 1,
                        name: 'Буцефал',
                        age: 5,
                        color: 'Гнедой',
                        weight: '500кг',
                        stats: 'Победы: 3',
                    },
                ],
            },
        ];

        const state: DeepPartial<StateSchema> = {
            event: {
                event: {
                    id: 1,
                    isActive: true,
                    location: 'Ипподром',
                    startTime: '2024-03-20T10:00:00',
                    endTime: '2024-03-20T18:00:00',
                    timeLeft: 3600,
                    raceData: mockRaceData,
                },
                eventStatus: GameStatus.NOT_STARTED,
                isLoading: false,
            },
        };

        expect(getRaceData(state as StateSchema)).toBe(mockRaceData);
    });

    test('должен работать с пустым массивом данных о гонках', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                event: {
                    id: 1,
                    isActive: true,
                    location: 'Ипподром',
                    startTime: '2024-03-20T10:00:00',
                    endTime: '2024-03-20T18:00:00',
                    timeLeft: 3600,
                    raceData: [],
                },
                eventStatus: GameStatus.NOT_STARTED,
                isLoading: false,
            },
        };

        expect(getRaceData(state as StateSchema)).toEqual([]);
    });
});

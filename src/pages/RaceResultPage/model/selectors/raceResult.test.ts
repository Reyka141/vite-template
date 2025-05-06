import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import {
    getRaceResult,
    getRaceResultData,
    getRaceResultError,
    getRaceResultHorses,
    getRaceResultIsLoading,
    getRaceResultUserChoice,
    getRaceResultWinnerHorse,
} from './raceResult';

describe('raceResult', () => {
    const initialState: DeepPartial<StateSchema> = {
        raceResult: {
            success: true,
            raceData: null,
            userChoice: null,
            horses: [],
            winnerHorse: null,
            isLoading: false,
            error: undefined,
        },
    };
    const StateWithRaceData: DeepPartial<StateSchema> = {
        raceResult: {
            success: false,
            raceData: {
                id: 1,
                title: 'Race 1',
                description: 'Race 1 of the day',
                startTime: '2025-03-31T11:46:36.784Z',
                endTime: '2025-03-31T11:48:36.784Z',
                isFinished: true,
                finishTime: '2025-03-31T11:48:41.962Z',
            },
            userChoice: {
                raceId: 1,
                horseId: 1,
                horseName: 'Winner',
                horseColor: 'blue',
                horseStats: '13/5',
                position: 4,
                isWinner: false,
            },
            horses: [
                {
                    id: 5,
                    name: 'Star',
                    age: 4,
                    color: 'white',
                    weight: '486 kg',
                    stats: '9/3',
                    position: 1,
                },
                {
                    id: 2,
                    name: 'Lightning',
                    age: 5,
                    color: 'white',
                    weight: '515 kg',
                    stats: '13/1',
                    position: 2,
                },
                {
                    id: 4,
                    name: 'Spirit',
                    age: 4,
                    color: 'white',
                    weight: '471 kg',
                    stats: '3/4',
                    position: 3,
                },
                {
                    id: 1,
                    name: 'Winner',
                    age: 4,
                    color: 'blue',
                    weight: '483 kg',
                    stats: '13/5',
                    position: 4,
                },
                {
                    id: 8,
                    name: 'Racer',
                    age: 3,
                    color: 'yellow',
                    weight: '534 kg',
                    stats: '1/1',
                    position: 5,
                },
                {
                    id: 7,
                    name: 'Victor',
                    age: 3,
                    color: 'white',
                    weight: '526 kg',
                    stats: '7/4',
                    position: 6,
                },
                {
                    id: 9,
                    name: 'Storm',
                    age: 5,
                    color: 'yellow',
                    weight: '515 kg',
                    stats: '14/1',
                    position: 7,
                },
                {
                    id: 10,
                    name: 'Wind',
                    age: 7,
                    color: 'red',
                    weight: '528 kg',
                    stats: '4/3',
                    position: 8,
                },
                {
                    id: 6,
                    name: 'Arrow',
                    age: 5,
                    color: 'purple',
                    weight: '461 kg',
                    stats: '3/5',
                    position: 9,
                },
                {
                    id: 3,
                    name: 'Flash',
                    age: 8,
                    color: 'pink',
                    weight: '480 kg',
                    stats: '10/2',
                    position: 10,
                },
            ],
            winnerHorse: {
                id: 5,
                name: 'Star',
                color: 'white',
            },
            isLoading: false,
            error: '',
        },
    };
    test('должен вернуть весь слайс', () => {
        expect(getRaceResult(initialState as StateSchema)).toEqual(initialState.raceResult);
        expect(getRaceResult(StateWithRaceData as StateSchema)).toEqual(StateWithRaceData.raceResult);
    });
    test('должен вернуть raceData', () => {
        expect(getRaceResultData(initialState as StateSchema)).toEqual(initialState.raceResult?.raceData);
        expect(getRaceResultData(StateWithRaceData as StateSchema)).toEqual(StateWithRaceData.raceResult?.raceData);
    });
    test('должен вернуть userChoice', () => {
        expect(getRaceResultUserChoice(initialState as StateSchema)).toEqual(initialState.raceResult?.userChoice);
        expect(getRaceResultUserChoice(StateWithRaceData as StateSchema)).toEqual(
            StateWithRaceData.raceResult?.userChoice,
        );
    });
    test('должен вернуть horses', () => {
        expect(getRaceResultHorses(initialState as StateSchema)).toEqual(initialState.raceResult?.horses);
        expect(getRaceResultHorses(StateWithRaceData as StateSchema)).toEqual(StateWithRaceData.raceResult?.horses);
    });
    test('должен вернуть winnerHorse', () => {
        expect(getRaceResultWinnerHorse(initialState as StateSchema)).toEqual(initialState.raceResult?.winnerHorse);
        expect(getRaceResultWinnerHorse(StateWithRaceData as StateSchema)).toEqual(
            StateWithRaceData.raceResult?.winnerHorse,
        );
    });
    test('должен вернуть isLoading', () => {
        expect(getRaceResultIsLoading(initialState as StateSchema)).toEqual(initialState.raceResult?.isLoading);
        expect(getRaceResultIsLoading(StateWithRaceData as StateSchema)).toEqual(
            StateWithRaceData.raceResult?.isLoading,
        );
    });
    test('должен вернуть error', () => {
        expect(getRaceResultError(initialState as StateSchema)).toEqual(initialState.raceResult?.error);
        expect(getRaceResultError(StateWithRaceData as StateSchema)).toEqual(StateWithRaceData.raceResult?.error);
    });
});

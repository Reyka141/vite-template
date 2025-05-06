export interface ResultSchema {
    userChoices: UserChoice[];
    isLoading: boolean;
    error?: string;
}

// Интерфейс для ответа на запрос выбора пользователя
export interface FetchUserChoicesResponse {
    success: boolean;
    userChoices: UserChoice[];
}

export interface FetchUserChoicesParams {
    eventId?: number;
}

// Интерфейс для описания выбора пользователя
export interface UserChoice {
    id: number;
    userId: number;
    eventId: number;
    raceId: number;
    horseId: number;
    reOpen: boolean;
    timestamp: string;
    horseName: string;
    horseColor: string;
    horseStats: string;
    raceTitle: string;
    raceDescription: string;
    raceStartTime: string;
    raceEndTime: string;
    raceStatus: string;
    raceEnded: boolean;
    raceInProgress: boolean;
    raceResult: RaceResult | null;
    isActiveEvent: boolean;
}

// Интерфейс для описания результата гонки
export interface RaceResult {
    winnerHorseId: number;
    winnerHorseName: string;
    winnerHorseColor: string;
    isUserWinner: boolean;
    finishTime: string;
}

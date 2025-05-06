// Определение типов для схемы результатов гонки

export interface Horse {
    id: number;
    name: string;
    age: number;
    color: string;
    weight: string; // вес в килограммах
    stats: string;
    position: number | null;
}

export interface RaceData {
    id: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    isFinished: boolean;
    finishTime: string | null;
}

export interface UserChoice {
    raceId: number;
    horseId: number;
    horseName: string;
    horseColor: string;
    horseStats: string;
    position: number | null;
    isWinner: boolean | null;
}

export interface WinnerHorse {
    id: number;
    name: string;
    color: string;
}

export interface FetchRaceResultResponse {
    success: boolean;
    raceData: RaceData | null;
    userChoice: UserChoice | null;
    horses: Horse[];
    winnerHorse: WinnerHorse | null;
}

export interface RaceResultSchema {
    success: boolean;
    raceData: RaceData | null;
    userChoice: UserChoice | null;
    horses: Horse[];
    winnerHorse: WinnerHorse | null;
    isLoading: boolean;
    error: string | undefined;
}

// Описание схемы данных для истории гонок

export interface UserChoice {
    horseId: number;
    horseName: string;
    horseColor: string;
    horseStats: string;
    horsePosition: number;
}

export interface RaceResult {
    isWinner: boolean;
    winnerHorseId: number;
    winnerHorseName: string;
    winnerHorseColor: string;
    finishTime: string;
}

export interface Race {
    raceId: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    isFinished: boolean;
    userChoice: UserChoice;
    result: RaceResult | null;
    timestamp: string;
}

export interface Event {
    eventId: number;
    location: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    totalRaces: number;
    winRaces: number;
    races: Race[];
}

export interface UserHistoryResponse {
    success: boolean;
    totalWins: number;
    totalSuccessful: number;
    totalFail: number;
    history: Event[];
}

export interface HistorySchema {
    historyData: UserHistoryResponse | null;
    isLoading: boolean;
    error?: string;
}

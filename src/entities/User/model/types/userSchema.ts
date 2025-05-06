export interface User {
    id: string;
    username: string;
}

export enum PrizeStatus {
    NEW = 'new',
    TAKEN = 'taked',
    NOT_TAKEN = 'noTaked',
}

export interface Prize {
    id: number;
    eventId: number;
    prizeText: string;
    winsCount: number;
    totalRaces: number;
    status: PrizeStatus;
    timestamp: string;
    updateTime: string;
}

export interface User {
    id: string;
    username: string;
    prizes: Prize[];
}
export interface UserChoices {
    raceId: number;
    horseId: number | null;
    reOpen: boolean;
}

export interface UserSchema {
    authData?: User;
    isLoginModalOpen: boolean;
    isLoading: boolean;
    error?: string;
    _initialized: boolean;
}

// api

export interface FetchUserResponse {
    success: boolean;
    user: User;
    userChoices?: UserChoices[];
}

//

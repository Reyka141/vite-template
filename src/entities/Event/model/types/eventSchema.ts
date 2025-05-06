import { GameStatus } from '@/shared/lib/components/getGameStatus/getGameStatus';

export interface Event {
    id: number;
    isActive: boolean;
    location: string;
    startTime: string;
    endTime: string;
    timeLeft: number;
    raceData: RaceData[];
}

export interface RaceData {
    id: number;
    title: string;
    description: string;
    startTime: string;
    horseData: HorseData[];
}

export interface HorseData {
    id: number;
    name: string;
    age: number;
    color: string;
    weight: string;
    stats: string;
}

export interface UserChoices {
    raceId: number;
    horseId: number | null;
    reOpen: boolean;
}

export enum NavbarItemStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    FINISHED = 'finished',
}

export interface NavItem {
    id: number;
    name: string;
    status: NavbarItemStatus;
}

export interface EventSchema {
    event: Event;
    eventStatus: GameStatus;
    isLoading: boolean;
    error?: string;
    userChoices?: UserChoices[];
    activeRaceId?: number;
    navItems?: NavItem[];
}

// api

export interface FetchLastEventResponse {
    success: boolean;
    event: Event;
    userChoices?: UserChoices[];
}

export interface CreateEventResponse {
    success: boolean;
    message: string;
}

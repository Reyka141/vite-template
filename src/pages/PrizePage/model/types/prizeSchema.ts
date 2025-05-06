import { PrizeStatus } from '@/entities/User';
import { EntityState } from '@reduxjs/toolkit';

// Типы для ответа API с призами пользователя
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

export interface FetchPrizesResponse {
    success: boolean;
    userId: number;
    userName: string;
    prizes: Prize[];
    totalPrizes: number;
}

export interface UpdatePrizeStatusResponse {
    success: boolean;
    message: string;
    prize: Prize | null;
}

export interface UpdatePrizeStatusProps {
    prizeId: number;
    status: PrizeStatus;
}

export interface PrizeSchema extends EntityState<Prize, number> {
    isLoading: boolean;
    error?: string;
}

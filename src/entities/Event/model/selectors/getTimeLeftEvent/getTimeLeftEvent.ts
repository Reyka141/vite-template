import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

// Сначала получаем базовые данные
const getEventState = (state: StateSchema) => state.event?.event;

// Затем создаем селектор для получения оставшегося времени с явным преобразованием
export const getTimeLeftEvent = createSelector([getEventState], (eventData) => {
    if (!eventData) return 0;
    return typeof eventData.timeLeft === 'number' ? eventData.timeLeft : 0;
});

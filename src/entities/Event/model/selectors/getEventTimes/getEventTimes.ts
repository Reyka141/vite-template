import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

const selectEventState = (state: StateSchema) => state.event?.event;

export const getEventTimes = createSelector([selectEventState], (eventState) => {
    const defaultTimes = { startTime: '', endTime: '' };

    if (!eventState) {
        return defaultTimes;
    }

    // Проверяем валидность времени без преобразования в UTC
    const startTime = eventState.startTime || '';
    const endTime = eventState.endTime || '';

    return { startTime, endTime };
});

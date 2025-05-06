import { createSelector } from '@reduxjs/toolkit';
import { Event } from '../../types/eventSchema';
import { getEvent } from '../getEvent/getEvent';

const defaultEvent: Event = {
    id: 0,
    isActive: false,
    location: '',
    startTime: '',
    endTime: '',
    timeLeft: 0,
    raceData: [],
};

export const getEventData = createSelector(getEvent, ({ event }): Event => {
    if (!event) return { ...defaultEvent };

    return event;
});

import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getEventData } from '../getEventData/getEventData';

const getActiveRaceId = (state: StateSchema) => state.event.activeRaceId;

export const getActiveRace = createSelector(getActiveRaceId, getEventData, (activeRaceId, eventData) =>
    eventData.raceData.find((race) => race.id === activeRaceId),
);

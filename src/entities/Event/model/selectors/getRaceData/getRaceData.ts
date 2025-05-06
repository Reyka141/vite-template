import { StateSchema } from '@/app/providers/StoreProvider';

export const getRaceData = (state: StateSchema) => state.event.event.raceData;

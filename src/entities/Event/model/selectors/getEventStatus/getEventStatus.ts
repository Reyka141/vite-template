import { StateSchema } from '@/app/providers/StoreProvider';

export const getEventStatus = (state: StateSchema) => state.event?.eventStatus;

import { StateSchema } from '@/app/providers/StoreProvider';

export const getEvent = (state: StateSchema) => state.event;

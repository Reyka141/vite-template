import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserChoices = (state: StateSchema) => state.event?.userChoices;

import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsActive = (state: StateSchema) => state.event?.event?.isActive ?? false;

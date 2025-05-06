import { StateSchema } from '@/app/providers/StoreProvider';

export const getPrizeIsLoading = (state: StateSchema) => state.prize?.isLoading;
export const getPrizeError = (state: StateSchema) => state.prize?.error;

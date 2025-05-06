import { StateSchema } from '@/app/providers/StoreProvider';

export const getHistoryData = (state: StateSchema) => state.history?.historyData ?? null;
export const getHistoryIsLoading = (state: StateSchema) => state.history?.isLoading;
export const getHistoryError = (state: StateSchema) => state.history?.error;

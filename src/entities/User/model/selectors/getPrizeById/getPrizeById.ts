import { StateSchema } from '@/app/providers/StoreProvider';

export const getPrizeById = (state: StateSchema, id: number) =>
    state.user.authData?.prizes.find((prize) => prize.id === id);

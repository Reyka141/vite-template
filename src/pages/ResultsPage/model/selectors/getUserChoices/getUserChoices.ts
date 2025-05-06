import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';
import { createSelector } from '@reduxjs/toolkit';

const getResultState = (state: StateSchema) => state.result;

export const getUserChoices = createSelector([getResultState], (resultState) => resultState?.userChoices ?? []);

import { StateSchema } from '@/app/providers/StoreProvider';

export const getRaceResult = (state: StateSchema) => state.raceResult;
export const getRaceResultData = (state: StateSchema) => state.raceResult?.raceData;
export const getRaceResultUserChoice = (state: StateSchema) => state.raceResult?.userChoice;
export const getRaceResultHorses = (state: StateSchema) => state.raceResult?.horses;
export const getRaceResultWinnerHorse = (state: StateSchema) => state.raceResult?.winnerHorse;
export const getRaceResultIsLoading = (state: StateSchema) => state.raceResult?.isLoading;
export const getRaceResultError = (state: StateSchema) => state.raceResult?.error;

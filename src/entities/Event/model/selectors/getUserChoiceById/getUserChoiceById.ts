import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserChoices } from '../getUserChoice/getUserChoice';

export const getUserChoiceById = (state: StateSchema, id: number) => {
    return getUserChoices(state)?.find((choice) => choice.raceId === id);
};

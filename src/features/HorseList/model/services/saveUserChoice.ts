import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { UserChoices } from '@/entities/Event';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Интерфейс для запроса сохранения выборов
export interface SaveUserChoiceRequest {
    userId: number;
    eventId: number;
    choices: UserChoices[];
}

// Интерфейс для ответа от сервера
export interface SaveUserChoiceResponse {
    success: boolean;
    message: string;
    userChoices: {
        id: number;
        userId: number;
        eventId: number;
        raceId: number;
        horseId: number | null;
        reOpen: boolean;
        timestamp: string;
    }[];
}

const saveUserChoice = createAsyncThunk<SaveUserChoiceResponse, SaveUserChoiceRequest, ThunkConfig<string>>(
    'userChoices/saveUserChoice',
    async (choiceData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await apiRequest<SaveUserChoiceResponse>(extra.api, {
                url: '/saveUserChoice',
                method: 'POST',
                data: choiceData,
            });

            if (!response.success) {
                throw new Error();
            }
            return response;
        } catch (e) {
            console.log(e);
            return rejectWithValue('saveUserChoice error');
        }
    },
);

export default saveUserChoice;

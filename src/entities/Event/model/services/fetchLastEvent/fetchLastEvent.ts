import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event, UserChoices } from '../../types/eventSchema';
export interface FetchLastEventResponse {
    success: boolean;
    event: Event;
    userChoices?: UserChoices[];
}

export const fetchLastEvent = createAsyncThunk<FetchLastEventResponse, undefined, ThunkConfig<string>>(
    'event/fetchLastEvent',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await apiRequest<FetchLastEventResponse>(extra.api, {
                url: '/lastEvent',
                method: 'GET',
            });
            if (!response.success) {
                throw new Error();
            }
            return response;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

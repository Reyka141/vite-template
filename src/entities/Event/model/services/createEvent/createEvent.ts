import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateEventResponse } from '../../types/eventSchema';

export const createEvent = createAsyncThunk<CreateEventResponse, undefined, ThunkConfig<string>>(
    'event/createEvent',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await apiRequest<CreateEventResponse>(extra.api, {
                url: '/createEvent',
                method: 'POST',
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

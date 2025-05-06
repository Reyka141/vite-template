import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchUserChoicesParams, FetchUserChoicesResponse } from '../../types/resultSchema';

const fetchActiveUserChoices = createAsyncThunk<FetchUserChoicesResponse, FetchUserChoicesParams, ThunkConfig<string>>(
    'result/fetchActiveUserChoices',
    async (params, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await apiRequest<FetchUserChoicesResponse>(extra.api, {
                url: '/myActiveEventChoices' + (params.eventId ? `?eventId=${params.eventId}` : ''),
                method: 'GET',
            });
            if (!response.success) {
                throw new Error();
            }
            return response;
        } catch (e) {
            console.log(e);
            return rejectWithValue('fetchActiveUserChoices error');
        }
    },
);

export default fetchActiveUserChoices;

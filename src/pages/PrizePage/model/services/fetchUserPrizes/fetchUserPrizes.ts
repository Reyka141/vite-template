import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchPrizesResponse } from '../../types/prizeSchema';

const fetchUserPrizes = createAsyncThunk<FetchPrizesResponse, undefined, ThunkConfig<string>>(
    'prize/fetchUserPrizes',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            // Используем apiRequest для типизированных запросов
            const data = await apiRequest<FetchPrizesResponse>(extra.api, {
                url: '/userPrizes',
                method: 'GET',
            });

            return data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('fetchUserPrizes error');
        }
    },
);

export default fetchUserPrizes;

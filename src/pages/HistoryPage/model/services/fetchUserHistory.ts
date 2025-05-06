import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserHistoryResponse } from '../types/historySchema';

const fetchUserHistory = createAsyncThunk<UserHistoryResponse, undefined, ThunkConfig<string>>(
    'history/fetchUserHistory',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await apiRequest<UserHistoryResponse>(extra.api, {
                url: '/userHistory',
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

export default fetchUserHistory;

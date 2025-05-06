import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchUserResponse } from '../../types/userSchema';

export const fetchUser = createAsyncThunk<FetchUserResponse, undefined, ThunkConfig<string>>(
    'user/fetchUser',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await apiRequest<FetchUserResponse>(extra.api, {
                url: '/user',
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

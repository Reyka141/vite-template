import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { UserChoices } from '@/entities/Event';
import { User } from '@/entities/User';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface LoginByUsernameProps {
    username: string;
    password: string;
}

export interface LoginByUsernameResponse extends User {
    userChoices: UserChoices[];
}

const loginByUsername = createAsyncThunk<LoginByUsernameResponse, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await apiRequest<LoginByUsernameResponse>(extra.api, {
                url: '/login',
                method: 'POST',
                data: authData,
            });

            return response;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Invalid username or password');
        }
    },
);

export default loginByUsername;

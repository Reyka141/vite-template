import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchUserChoicesResponse } from '../../types/resultSchema';

export interface FetchUserChoicesProps {
    eventId: string;
}

const fetchUserChoices = createAsyncThunk<FetchUserChoicesResponse, FetchUserChoicesProps, ThunkConfig<string>>(
    'result/fetchUserChoices',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        const { eventId } = props;
        try {
            const response = await apiRequest<FetchUserChoicesResponse>(extra.api, {
                url: '/myChoices' + (eventId ? `?eventId=${eventId}` : ''),
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

export default fetchUserChoices;

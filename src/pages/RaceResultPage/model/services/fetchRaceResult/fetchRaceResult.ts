import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchRaceResultResponse } from '../../types/raceResultSchema';

export interface FetchRaceResultProps {
    raceId: string;
    eventId: string;
}

const fetchRaceResult = createAsyncThunk<FetchRaceResultResponse, FetchRaceResultProps, ThunkConfig<string>>(
    'result/fetchRaceResult',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        const { raceId, eventId } = props;
        try {
            const response = await apiRequest<FetchRaceResultResponse>(extra.api, {
                url: `/raceResult/${raceId}?eventId=${eventId}`,
                method: 'GET',
            });
            if (!response.success) {
                throw new Error();
            }

            return response;
        } catch (e) {
            console.log(e);
            return rejectWithValue('fetchRaceResult error');
        }
    },
);

export default fetchRaceResult;

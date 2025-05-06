import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { apiRequest } from '@/shared/api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdatePrizeStatusProps, UpdatePrizeStatusResponse } from '../../types/prizeSchema';

const updatePrizeStatus = createAsyncThunk<UpdatePrizeStatusResponse, UpdatePrizeStatusProps, ThunkConfig<string>>(
    'prize/updatePrizeStatus',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        const { prizeId, status } = props;
        try {
            const data = await apiRequest<UpdatePrizeStatusResponse>(extra.api, {
                url: '/updatePrizeStatus',
                method: 'POST',
                data: {
                    prizeId,
                    status,
                },
            });

            if (!data) {
                throw new Error('No data received');
            }

            if (!data.success) {
                throw new Error(data.message || 'Update failed');
            }

            return data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('updatePrizeStatus error');
        }
    },
);

export default updatePrizeStatus;

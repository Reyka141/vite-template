import { StateSchema } from '@/app/providers/StoreProvider';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchUserPrizes from '../services/fetchUserPrizes/fetchUserPrizes';
import updatePrizeStatus from '../services/updatePrizeStatus/updatePrizeStatus';
import { Prize, PrizeSchema } from '../types/prizeSchema';

const prizeAdapter = createEntityAdapter<Prize>();

export const prizeSelectors = prizeAdapter.getSelectors<StateSchema>(
    (state: StateSchema) => state.prize ?? prizeAdapter.getInitialState(),
);

export const prizeSlice = createSlice({
    name: 'prize',
    initialState: prizeAdapter.getInitialState<PrizeSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserPrizes.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(fetchUserPrizes.fulfilled, (state, action) => {
            prizeAdapter.setAll(state, action.payload.prizes);
            state.isLoading = false;
        });
        builder.addCase(fetchUserPrizes.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
        builder.addCase(updatePrizeStatus.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(updatePrizeStatus.fulfilled, (state, action) => {
            if (action.payload.prize) {
                prizeAdapter.setOne(state, action.payload.prize);
            }
            state.isLoading = false;
        });
        builder.addCase(updatePrizeStatus.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: prizeActions } = prizeSlice;
export const { reducer: prizeReducer } = prizeSlice;

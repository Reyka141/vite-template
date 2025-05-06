import { createSlice } from '@reduxjs/toolkit';
import fetchActiveUserChoices from '../services/fetchActiveUserChoices/fetchActiveUserChoices';
import fetchUserChoices from '../services/fetchUserChoices/fetchUserChoices';
import { ResultSchema } from '../types/resultSchema';
const initialState: ResultSchema = {
    userChoices: [],
    isLoading: false,
    error: undefined,
};

export const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setRaceData: (state, action) => {
            state.userChoices = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserChoices.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(fetchUserChoices.fulfilled, (state, action) => {
            state.userChoices = action.payload.userChoices;
            state.isLoading = false;
        });
        builder.addCase(fetchUserChoices.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchActiveUserChoices.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        });
        builder.addCase(fetchActiveUserChoices.fulfilled, (state, action) => {
            state.userChoices = action.payload.userChoices;
            state.isLoading = false;
        });
        builder.addCase(fetchActiveUserChoices.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: resultActions } = resultSlice;
export const { reducer: resultReducer } = resultSlice;

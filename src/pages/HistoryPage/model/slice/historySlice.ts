import { createSlice } from '@reduxjs/toolkit';
import fetchUserHistory from '../services/fetchUserHistory';
import { HistorySchema } from '../types/historySchema';
const initialState: HistorySchema = {
    historyData: null,
    isLoading: false,
    error: undefined,
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistoryData: (state, action) => {
            state.historyData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserHistory.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(fetchUserHistory.fulfilled, (state, action) => {
            state.historyData = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUserHistory.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: historyActions } = historySlice;
export const { reducer: historyReducer } = historySlice;

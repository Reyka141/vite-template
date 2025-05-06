import { createSlice } from '@reduxjs/toolkit';
import fetchRaceResult from '../services/fetchRaceResult/fetchRaceResult';
import { RaceResultSchema } from '../types/raceResultSchema';
const initialState: RaceResultSchema = {
    success: false,
    raceData: null,
    userChoice: null,
    horses: [],
    winnerHorse: null,
    isLoading: false,
    error: undefined,
};

export const raceResultSlice = createSlice({
    name: 'raceResult',
    initialState,
    reducers: {
        setRaceData: (state, action) => {
            state.raceData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRaceResult.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(fetchRaceResult.fulfilled, (state, action) => {
            state.raceData = action.payload.raceData;
            state.userChoice = action.payload.userChoice;
            state.horses = action.payload.horses;
            state.winnerHorse = action.payload.winnerHorse;
            state.isLoading = false;
        });
        builder.addCase(fetchRaceResult.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: raceResultActions } = raceResultSlice;
export const { reducer: raceResultReducer } = raceResultSlice;

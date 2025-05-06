import loginByUsername from '@/features/AuthByUsername/model/services/loginByUsername';
import { GameStatus, getGameStatus } from '@/shared/lib/components/getGameStatus/getGameStatus';
import { getTimeLeft } from '@/shared/lib/components/getTimeLeft/getTimeLeft';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLastEvent } from '../services/fetchLastEvent/fetchLastEvent';
import { EventSchema, NavbarItemStatus, UserChoices } from '../types/eventSchema';
const initialState: EventSchema = {
    event: {
        id: 0,
        isActive: false,
        location: '',
        startTime: '',
        endTime: '',
        timeLeft: 0,
        raceData: [],
    },
    userChoices: undefined,
    activeRaceId: undefined,
    navItems: undefined,
    eventStatus: GameStatus.NOT_STARTED,
    isLoading: false,
    error: '',
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        updateEventTimeLeft: (state) => {
            const gameStatus = getGameStatus(state.event.startTime, state.event.endTime);
            state.eventStatus = gameStatus;
            state.event.isActive = gameStatus === GameStatus.IN_PROGRESS;
            state.event.timeLeft = getTimeLeft(state.event.startTime, state.event.endTime);
        },
        setActiveRaceId: (state, action: PayloadAction<number>) => {
            state.activeRaceId = action.payload;
        },
        setActiveNavItemById: (state, action: PayloadAction<number>) => {
            const newActiveId = action.payload;
            state.activeRaceId = newActiveId;

            if (state.navItems) {
                state.navItems = state.navItems.map((item) => {
                    if (item.id === newActiveId) {
                        return { ...item, status: NavbarItemStatus.ACTIVE };
                    }

                    const hasChoice = state.userChoices?.some(
                        (choice) => choice.raceId === item.id && choice.horseId !== null,
                    );

                    if (hasChoice) {
                        return { ...item, status: NavbarItemStatus.FINISHED };
                    }

                    return { ...item, status: NavbarItemStatus.INACTIVE };
                });
            }
        },
        setUserChoice: (state, action: PayloadAction<UserChoices>) => {
            if (!state.userChoices) {
                state.userChoices = [];
            }

            const existingChoiceIndex = state.userChoices.findIndex(
                (choice) => choice.raceId === action.payload.raceId,
            );

            if (existingChoiceIndex !== -1) {
                state.userChoices[existingChoiceIndex] = {
                    ...state.userChoices[existingChoiceIndex],
                    horseId: action.payload.horseId,
                };
            } else {
                state.userChoices.push({
                    raceId: action.payload.raceId,
                    horseId: action.payload.horseId,
                    reOpen: action.payload.reOpen ?? false,
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLastEvent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLastEvent.fulfilled, (state, action) => {
            const { event, userChoices } = action.payload;
            const gameStatus = getGameStatus(event.startTime, event.endTime);

            state.event = { ...event, timeLeft: getTimeLeft(event.startTime, event.endTime) };
            state.eventStatus = gameStatus;
            state.event.isActive = gameStatus === GameStatus.IN_PROGRESS;

            const navItems = event.raceData.map((race, index) => {
                const hasChoice = userChoices?.some((choice) => choice.raceId === race.id && choice.horseId !== null);

                let status = NavbarItemStatus.INACTIVE;
                if (race.id === state.activeRaceId) {
                    status = NavbarItemStatus.ACTIVE;
                } else if (index === 0 && !state.activeRaceId) {
                    status = NavbarItemStatus.ACTIVE;
                } else if (hasChoice) {
                    status = NavbarItemStatus.FINISHED;
                }

                return {
                    id: race.id,
                    name: race.title,
                    status: status,
                };
            });

            const currentUserChoices = userChoices?.map((race) => ({
                raceId: race.raceId,
                horseId: race.horseId,
                reOpen: race.reOpen ?? false,
            }));

            state.navItems = navItems;
            if (!state.activeRaceId) {
                state.activeRaceId = navItems.length > 0 ? navItems[0].id : undefined;
            }
            // state.activeRaceId = navItems.length > 0 ? navItems[0].id : undefined;
            state.userChoices = currentUserChoices;

            state.isLoading = false;
        });
        builder.addCase(fetchLastEvent.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
        builder.addCase(loginByUsername.fulfilled, (state, action) => {
            const { userChoices } = action.payload;
            const navItems = state.event.raceData.map((race, index) => {
                let hasChoice = false;
                if (userChoices.length > 0) {
                    hasChoice = userChoices?.some((choice) => choice.raceId === race.id && choice.horseId !== null);
                } else {
                    hasChoice =
                        state.userChoices?.some((choice) => choice.raceId === race.id && choice.horseId !== null) ??
                        false;
                }

                let status = NavbarItemStatus.INACTIVE;

                if (index === 0) {
                    status = NavbarItemStatus.ACTIVE;
                } else if (hasChoice) {
                    status = NavbarItemStatus.FINISHED;
                }

                return {
                    id: race.id,
                    name: race.title,
                    status: status,
                };
            });

            const currentUserChoices = userChoices?.map((race) => ({
                raceId: race.raceId,
                horseId: race.horseId,
                reOpen: race.reOpen ?? false,
            }));
            state.navItems = navItems;
            state.activeRaceId = navItems.length > 0 ? navItems[0].id : undefined;
            if (currentUserChoices.length > 0) {
                state.userChoices = currentUserChoices;
            }
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: eventActions } = eventSlice;
export const { reducer: eventReducer } = eventSlice;

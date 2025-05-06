import { GameStatus } from '@/shared/lib/components/getGameStatus/getGameStatus';
import { fetchLastEvent } from '../services/fetchLastEvent/fetchLastEvent';
import { EventSchema } from '../types/eventSchema';
import { eventActions, eventReducer } from './eventSlice';

describe('eventSlice', () => {
    const mockDate = new Date('2024-01-01T12:00:00.000Z');

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(mockDate);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should return the initial state', () => {
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
            eventStatus: GameStatus.NOT_STARTED,
            isLoading: false,
            error: '',
        };
        expect(eventReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('setTimeLeft', () => {
        test('should handle setTimeLeft for active event', () => {
            const startTime = new Date(mockDate.getTime() - 3600000).toISOString();
            const endTime = new Date(mockDate.getTime() + 3600000).toISOString();

            const initialState: EventSchema = {
                event: {
                    id: 1,
                    isActive: false,
                    location: 'Test Location',
                    startTime,
                    endTime,
                    timeLeft: 0,
                    raceData: [],
                },
                eventStatus: GameStatus.IN_PROGRESS,
                isLoading: false,
                error: '',
            };
            const timeLeft = 3600;

            const newState = eventReducer(initialState, eventActions.updateEventTimeLeft());
            expect(newState.event.isActive).toBe(true);
            expect(newState.event.timeLeft).toBe(timeLeft);
            expect(newState.eventStatus).toBe(GameStatus.IN_PROGRESS);
        });

        test('should handle setTimeLeft for not started event', () => {
            const startTime = new Date(mockDate.getTime() + 3600000).toISOString();
            const endTime = new Date(mockDate.getTime() + 7200000).toISOString();

            const initialState: EventSchema = {
                event: {
                    id: 1,
                    isActive: false,
                    location: 'Test Location',
                    startTime,
                    endTime,
                    timeLeft: 0,
                    raceData: [],
                },
                eventStatus: GameStatus.NOT_STARTED,
                isLoading: false,
                error: '',
            };
            const timeLeft = 3600;

            const newState = eventReducer(initialState, eventActions.updateEventTimeLeft());
            expect(newState.event.isActive).toBe(false);
            expect(newState.event.timeLeft).toBe(timeLeft);
            expect(newState.eventStatus).toBe(GameStatus.NOT_STARTED);
        });

        test('should handle setTimeLeft for finished event', () => {
            const startTime = new Date(mockDate.getTime() - 7200000).toISOString();
            const endTime = new Date(mockDate.getTime() - 3600000).toISOString();

            const initialState: EventSchema = {
                event: {
                    id: 1,
                    isActive: false,
                    location: 'Test Location',
                    startTime,
                    endTime,
                    timeLeft: 0,
                    raceData: [],
                },
                eventStatus: GameStatus.FINISHED,
                isLoading: false,
                error: '',
            };
            const timeLeft = 0;

            const newState = eventReducer(initialState, eventActions.updateEventTimeLeft());
            expect(newState.event.isActive).toBe(false);
            expect(newState.event.timeLeft).toBe(timeLeft);
            expect(newState.eventStatus).toBe(GameStatus.FINISHED);
        });
    });

    describe('fetchLastEvent', () => {
        test('should handle fetchLastEvent.pending', () => {
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
                eventStatus: GameStatus.NOT_STARTED,
                isLoading: false,
                error: '',
            };

            expect(eventReducer(initialState, { type: fetchLastEvent.pending.type })).toEqual({
                ...initialState,
                isLoading: true,
            });
        });

        test('should handle fetchLastEvent.fulfilled for active event', () => {
            const startTime = new Date(mockDate.getTime() - 3600000).toISOString();
            const endTime = new Date(mockDate.getTime() + 3600000).toISOString();

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
                eventStatus: GameStatus.NOT_STARTED,
                isLoading: true,
                error: '',
            };

            const mockEvent = {
                id: 1,
                isActive: false,
                location: 'Test Location',
                startTime,
                endTime,
                timeLeft: 0,
                raceData: [],
            };

            const newState = eventReducer(initialState, {
                type: fetchLastEvent.fulfilled.type,
                payload: { event: mockEvent, userChoices: [] },
            });

            expect(newState.isLoading).toBe(false);
            expect(newState.event.id).toBe(mockEvent.id);
            expect(newState.event.location).toBe(mockEvent.location);
            expect(newState.event.timeLeft).toBe(3600);
            expect(newState.eventStatus).toBe(GameStatus.IN_PROGRESS);
        });

        test('should handle fetchLastEvent.fulfilled for not started event', () => {
            const startTime = new Date(mockDate.getTime() + 3600000).toISOString();
            const endTime = new Date(mockDate.getTime() + 7200000).toISOString();

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
                eventStatus: GameStatus.NOT_STARTED,
                isLoading: true,
                error: '',
            };

            const mockEvent = {
                id: 1,
                isActive: false,
                location: 'Test Location',
                startTime,
                endTime,
                timeLeft: 0,
                raceData: [],
            };

            const newState = eventReducer(initialState, {
                type: fetchLastEvent.fulfilled.type,
                payload: { event: mockEvent, userChoices: [] },
            });

            expect(newState.isLoading).toBe(false);
            expect(newState.event.timeLeft).toBe(3600);
            expect(newState.eventStatus).toBe(GameStatus.NOT_STARTED);
        });

        test('should handle fetchLastEvent.fulfilled for finished event', () => {
            const startTime = new Date(mockDate.getTime() - 7200000).toISOString();
            const endTime = new Date(mockDate.getTime() - 3600000).toISOString();

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
                eventStatus: GameStatus.NOT_STARTED,
                isLoading: true,
                error: '',
            };

            const mockEvent = {
                id: 1,
                isActive: false,
                location: 'Test Location',
                startTime,
                endTime,
                timeLeft: 0,
                raceData: [],
            };

            const newState = eventReducer(initialState, {
                type: fetchLastEvent.fulfilled.type,
                payload: { event: mockEvent, userChoices: [] },
            });

            expect(newState.isLoading).toBe(false);
            expect(newState.event.timeLeft).toBe(0);
            expect(newState.eventStatus).toBe(GameStatus.FINISHED);
        });

        test('should handle fetchLastEvent.rejected', () => {
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
                eventStatus: GameStatus.NOT_STARTED,
                isLoading: true,
                error: '',
            };
            const error = 'Failed to fetch event';

            expect(
                eventReducer(initialState, {
                    type: fetchLastEvent.rejected.type,
                    payload: error,
                }),
            ).toEqual({
                ...initialState,
                isLoading: false,
                error,
            });
        });
    });
});

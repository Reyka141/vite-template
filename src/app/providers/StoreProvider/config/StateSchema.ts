import { EventSchema } from '@/entities/Event';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { HistorySchema } from '@/pages/HistoryPage';
import { PrizeSchema } from '@/pages/PrizePage';
import { RaceResultSchema } from '@/pages/RaceResultPage';
import { ResultSchema } from '@/pages/ResultsPage';
import { Action, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { To, NavigateOptions } from 'react-router-dom';

export interface StateSchemaBase {
    user: UserSchema;
    event: EventSchema;
}

export interface StateSchema extends StateSchemaBase {
    // async reducers
    loginForm?: LoginSchema;
    result?: ResultSchema;
    raceResult?: RaceResultSchema;
    history?: HistorySchema;
    prize?: PrizeSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: Action) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

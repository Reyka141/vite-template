import { StateSchema } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/api';
import { Action, AsyncThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

type ActionCreatorType<Return, Arguments, RejectedValue> = (
    args: Arguments,
) => AsyncThunkAction<Return, Arguments, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<Return, Arguments, RejectedValue> {
    dispatch: jest.MockedFn<ThunkDispatch<StateSchema, unknown, Action>>;
    getState: () => StateSchema;
    actionCreator: ActionCreatorType<Return, Arguments, RejectedValue>;
    api: AxiosInstance;
    navigate: jest.MockedFn<(to: string) => void>;

    constructor(actionCreator: ActionCreatorType<Return, Arguments, RejectedValue>) {
        this.dispatch = jest.fn();
        this.getState = jest.fn();
        this.actionCreator = actionCreator;
        this.api = $api;
        this.navigate = jest.fn();
    }

    async callThunk(args: Arguments) {
        const action = this.actionCreator(args);
        const result = await action(this.dispatch, this.getState, {
            api: this.api,
            navigate: this.navigate,
        });
        return result;
    }
}

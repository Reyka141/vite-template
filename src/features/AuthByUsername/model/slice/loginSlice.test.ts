import loginByUsername from '../services/loginByUsername';
import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
    test('should return the initial state', () => {
        const initialState: LoginSchema = {
            username: '',
            password: '',
            isLoading: false,
            error: undefined,
        };
        expect(loginReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('should handle username being set', () => {
        const initialState: LoginSchema = {
            username: '',
            password: '',
            isLoading: false,
            error: undefined,
        };
        const expectedUsername = 'testuser';

        expect(loginReducer(initialState, loginActions.setUsername(expectedUsername))).toEqual({
            ...initialState,
            username: expectedUsername,
        });
    });

    test('should handle password being set', () => {
        const initialState: LoginSchema = {
            username: '',
            password: '',
            isLoading: false,
            error: undefined,
        };
        const expectedPassword = 'testpass';

        expect(loginReducer(initialState, loginActions.setPassword(expectedPassword))).toEqual({
            ...initialState,
            password: expectedPassword,
        });
    });

    test('should handle login pending', () => {
        const initialState: LoginSchema = {
            username: 'testuser',
            password: 'testpass',
            isLoading: false,
            error: 'some error',
        };

        expect(loginReducer(initialState, { type: loginByUsername.pending.type, payload: undefined })).toEqual({
            ...initialState,
            error: undefined,
            isLoading: true,
        });
    });

    test('should handle login success', () => {
        const initialState: LoginSchema = {
            username: 'testuser',
            password: 'testpass',
            isLoading: true,
            error: undefined,
        };

        expect(loginReducer(initialState, { type: loginByUsername.fulfilled.type, payload: undefined })).toEqual({
            ...initialState,
            username: '',
            password: '',
            isLoading: false,
        });
    });

    test('should handle login failure', () => {
        const initialState: LoginSchema = {
            username: 'testuser',
            password: 'testpass',
            isLoading: true,
            error: undefined,
        };
        const error = 'Authentication failed';

        expect(loginReducer(initialState, { type: loginByUsername.rejected.type, payload: error })).toEqual({
            ...initialState,
            isLoading: false,
            error,
        });
    });
});

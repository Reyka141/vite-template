import loginByUsername from '@/features/AuthByUsername/model/services/loginByUsername';
import { fetchUser } from '../services/fetchUser/fetchUser';
import { FetchUserResponse, UserSchema } from '../types/userSchema';
import { userReducer } from './userSlice';
describe('userSlice', () => {
    test('Должен вернуть начальное состояние', () => {
        const initialState: UserSchema = {
            isLoginModalOpen: false,
            isLoading: false,
            error: undefined,
            _initialized: false,
        };
        expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('loginByUsername', () => {
        test('Должен вернуть начальное состояние', () => {
            const initialState: UserSchema = {
                isLoginModalOpen: false,
                isLoading: false,
                error: undefined,
                _initialized: false,
            };
            expect(userReducer(initialState, { type: loginByUsername.pending.type })).toEqual({
                ...initialState,
                error: '',
                isLoading: true,
            });
        });
        test('Должен вернуть состояние при успешном запросе', () => {
            const initialState: UserSchema = {
                isLoginModalOpen: false,
                isLoading: false,
                error: undefined,
                _initialized: false,
            };
            const mockData = {
                id: '1',
                username: 'admin',
                prizes: [],
                userChoices: [],
            };
            const newState = userReducer(initialState, {
                type: loginByUsername.fulfilled.type,
                payload: mockData,
            });
            expect(newState.isLoading).toBe(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { userChoices, ...expectedAuthData } = mockData;
            expect(newState.authData).toEqual(expectedAuthData);
            expect(newState.isLoginModalOpen).toBe(false);
        });
        test('Должен вернуть состояние при ошибке запроса', () => {
            const initialState: UserSchema = {
                isLoginModalOpen: false,
                isLoading: false,
                error: undefined,
                _initialized: false,
            };
            const newState = userReducer(initialState, {
                type: loginByUsername.rejected.type,
                payload: 'error',
            });
            expect(newState.isLoading).toBe(false);
            expect(newState.error).toBe('error');
        });
    });
    describe('fetchUser', () => {
        test('Должен вернуть начальное состояние', () => {
            const initialState: UserSchema = {
                isLoginModalOpen: false,
                isLoading: false,
                error: undefined,
                _initialized: false,
            };
            expect(userReducer(initialState, { type: fetchUser.pending.type })).toEqual({
                ...initialState,
                error: '',
                isLoading: true,
            });
        });
        test('Должен вернуть состояние при успешном запросе', () => {
            const initialState: UserSchema = {
                isLoginModalOpen: false,
                isLoading: false,
                error: undefined,
                _initialized: false,
            };
            const mockData: FetchUserResponse = {
                success: true,
                user: {
                    id: '1',
                    username: 'admin',
                    prizes: [],
                },
                userChoices: [],
            };
            const newState = userReducer(initialState, {
                type: fetchUser.fulfilled.type,
                payload: mockData,
            });
            expect(newState.isLoading).toBe(false);
            expect(newState.authData).toEqual(mockData.user);
            expect(newState.isLoginModalOpen).toBe(false);
        });
        test('Должен вернуть состояние при ошибке запроса', () => {
            const initialState: UserSchema = {
                isLoginModalOpen: false,
                isLoading: false,
                error: undefined,
                _initialized: false,
            };
            const newState = userReducer(initialState, {
                type: fetchUser.rejected.type,
                payload: 'error',
            });
            expect(newState.isLoading).toBe(false);
            expect(newState.error).toBe('error');
        });
    });
});

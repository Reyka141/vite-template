import loginByUsername from '@/features/AuthByUsername/model/services/loginByUsername';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from '../services/fetchUser/fetchUser';
import { User, UserSchema } from '../types/userSchema';

const initialState: UserSchema = {
    authData: undefined,
    isLoginModalOpen: false,
    isLoading: false,
    _initialized: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
            state._initialized = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
        setIsLoginModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isLoginModalOpen = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginByUsername.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(loginByUsername.fulfilled, (state, { payload }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { userChoices, ...authData } = payload;
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(authData));
            state.authData = authData;
            state.isLoading = false;
            state.isLoginModalOpen = false;
        });
        builder.addCase(loginByUsername.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUser.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
            const { user } = payload;
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
            state.authData = user;
            state.isLoginModalOpen = false;
            state._initialized = true;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            state._initialized = true;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

import { rtkApi } from '@/shared/api/rtkApi';
import { ICheckTokenDto, IForgotDto, ILoginDto, INewUser, IResetPasswordDto } from '../model/types/AuthSchema';

export const authApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<INewUser, ILoginDto>({
            query: (data: ILoginDto) => ({
                body: data,
                url: 'auth/login',
                method: 'POST',
                headers: {},
            }),
        }),
        checkToken: builder.mutation<ICheckTokenDto, boolean>({
            query: (remember: boolean) => ({
                url: `auth/refresh-tokens?remember=${remember ? 1 : 0}`,
                method: 'GET',
            }),
        }),
        logout: builder.mutation<string, void>({
            query: () => ({
                url: `auth/logout`,
                method: 'GET',
            }),
        }),
        forgotPassword: builder.mutation<IForgotDto, string>({
            query: (email: string) => ({
                body: { email },
                url: 'auth/forgot-password',
                method: 'POST',
                headers: {},
            }),
        }),
        validateResetToken: builder.mutation<IForgotDto, string>({
            query: (token: string) => ({
                body: { token },
                url: 'auth/validate-password-reset',
                method: 'POST',
                headers: {},
            }),
        }),
        resetPassword: builder.mutation<IForgotDto, IResetPasswordDto>({
            query: (data: IResetPasswordDto) => ({
                body: data,
                url: 'auth/reset-password',
                method: 'POST',
                headers: {},
            }),
        }),
    }),
});

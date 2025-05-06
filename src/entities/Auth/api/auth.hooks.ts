import { authApi } from './auth.api';

export const {
    useLoginMutation: useLogin,
    useCheckTokenMutation: useCheckToken,
    useLogoutMutation: useLogout,
    useForgotPasswordMutation: useForgotPassword,
    useValidateResetTokenMutation: useValidateResetToken,
    useResetPasswordMutation: useResetPassword,
} = authApi;

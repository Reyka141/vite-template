// Экспорт API инстанса
export { authApi } from './api/auth.api';

// Экспорт хуков
export {
    useCheckToken,
    useForgotPassword,
    useLogin,
    useLogout,
    useResetPassword,
    useValidateResetToken,
} from './api/auth.hooks';

// Экспорт типов
export type {
    IAccount,
    ICheckTokenDto,
    IForgotDto,
    ILoginDto,
    INewUser,
    IResetPasswordDto,
    IUser,
} from './model/types/AuthSchema';

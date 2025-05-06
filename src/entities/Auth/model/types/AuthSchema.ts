
// ================= Внешние типы =================
// Эти типы импортированы из других модулей

/**
 * @interface IAccount (из @/store/user/IUserState)
 * @description Интерфейс для данных аккаунта пользователя.
 * @remarks Этот тип используется внутри IUser, поэтому он также перенесен сюда для полноты.
 */
export interface IAccount {
    id: string;
    name: string;
    image: string;
    UNIQ: string;
    isConfigurated: boolean;
    isActive: boolean;
    isDisabled: boolean;
    subscriptionId: string;
    // config: IConfig; // Закомментировано, т.к. IConfig здесь не определен и не требуется для Auth
    createdAt: Date;
    updatedAt: Date;
    remainingMinutes: number;
}

/**
 * @interface IUser (из @/store/user/IUserState)
 * @description Основной интерфейс для данных пользователя.
 */
export interface IUser {
    id: string;
    email: string;
    notificationEmails: string;
    avatar: string;
    account: IAccount; // Используем локально определенный IAccount
    accountId: string;
}

// ================= Локальные типы =================
// Эти типы определены и используются внутри модуля Auth

/**
 * @interface IResetPasswordDto
 * @description DTO для сброса пароля.
 */
export interface IResetPasswordDto {
    email: string;
    password: string;
    passwordRepeat: string;
    token: string; // Токен сброса пароля из email
}

/**
 * @interface ILoginDto
 * @description DTO для входа пользователя.
 */
export interface ILoginDto {
    email: string;
    password: string;
    rememberMe: boolean; // Флаг "Запомнить меня"
}

/**
 * @interface INewUser
 * @description Ответ при успешном логине или обновлении токена.
 * Содержит данные пользователя и токен доступа.
 */
export interface INewUser {
    accessToken: string;
    user: IUser; // Используем локально определенный IUser
}

/**
 * @interface IForgotDto
 * @description Стандартный ответ для операций, связанных с восстановлением пароля
 * (запрос на сброс, валидация токена, успешный сброс).
 */
export interface IForgotDto {
    success: boolean;
    message: string;
}

/**
 * @interface ICheckTokenDto
 * @description Ответ при успешной проверке/обновлении токена.
 * @deprecated Похоже, этот тип идентичен `INewUser`. Возможно, стоит использовать `INewUser`.
 */
export interface ICheckTokenDto {
    accessToken: string;
    user: IUser; // Используем локально определенный IUser
}

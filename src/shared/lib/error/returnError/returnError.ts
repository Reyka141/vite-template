export interface ErrorPayload {
    message: string;
}

export interface IError {
    message: string;
    code: number;
}

// Вспомогательные типы, не экспортируются
interface ErrorResponse {
    message?: string;
    response?: {
        data?: {
            message: string;
            statusCode: number;
            errorCode?: number; // Добавлено поле errorCode
        };
        statusText?: string;
        status?: number;
    };
}

interface ErrorResponseSecond {
    message?: string;
    data?: {
        message: string;
        statusCode: number;
        errorCode?: number; // Добавлено поле errorCode
    };
    statusText?: string;
    status?: number;
}

export const isErrorPayload = (payload: unknown): payload is ErrorPayload => {
    return typeof payload === 'object' && payload !== null && 'message' in payload;
};

/**
 * Обрабатывает различные форматы ошибок API и возвращает стандартизированный объект ошибки.
 * @param error Неизвестная ошибка, перехваченная из API.
 * @returns Объект IError со стандартизированным сообщением и кодом.
 */
export const returnError = (error: unknown): IError => {
    const err = error as ErrorResponse;
    const errorFromApi = error as ErrorResponseSecond;

    // console.error(err); // Для откладки ошибок
    const response = err?.response ?? errorFromApi;
    if (response) {
        if (response?.data) {
            // Проверяем наличие errorCode сначала
            if ('errorCode' in response.data && typeof response.data.errorCode === 'number') {
                return {
                    message: Array.isArray(response.data.message)
                        ? response.data.message.join(' ')
                        : response.data.message || 'Что то пошло не так',
                    code: response.data.errorCode,
                };
            }
            // Иначе используем statusCode
            return {
                message: Array.isArray(response.data.message)
                    ? response.data.message.join(' ')
                    : response.data.message || 'Что то пошло не так',
                code: response.data.statusCode || 400,
            };
        } else {
            // Если нет data, используем статус ответа
            return {
                message: response.statusText || 'Что то пошло не так',
                code: response.status || 400,
            };
        }
    } else {
        // Если нет response вообще
        return {
            message: 'Что то пошло не так',
            code: 400,
        };
    }
};

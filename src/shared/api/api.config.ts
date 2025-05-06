import { authApi } from '@/entities/Auth';
import { REMEMBER_ME_LOCALSTORAGE_KEY, TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { returnError } from '@/shared/lib/error';
import { Storage } from '@/shared/lib/storage/storage';
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Переменная для отслеживания состояния обновления токена
let isRefreshing = false;
// Promise, который будет разрешен после обновления токена
let refreshPromise: Promise<string | null> | null = null;
// TODO: Пройти по проекту и вырезать все костыли что были связаны с гонкой запросов

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = Storage.getItem(TOKEN_LOCALSTORAGE_KEY);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// Функция для обновления токена
const refreshToken = async (api: BaseQueryApi): Promise<string | null> => {
    // Если уже идет обновление, возвращаем существующий Promise
    if (isRefreshing) {
        return refreshPromise;
    }

    // Устанавливаем флаг и создаем Promise
    isRefreshing = true;
    refreshPromise = new Promise<string | null>((resolve) => {
        const isRemember = Boolean(Number(Storage.getItem(REMEMBER_ME_LOCALSTORAGE_KEY)));

        api.dispatch(authApi.endpoints.checkToken.initiate(isRemember))
            .unwrap()
            .then((tokenResult) => {
                if ('accessToken' in tokenResult) {
                    const token = tokenResult.accessToken.split(' ')[1];
                    Storage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
                    resolve(token);
                } else {
                    resolve(null);
                }
            })
            .catch((error) => {
                console.error(error);
                Storage.clearAllForUser();
                window.location.href = '/login';
                resolve(null);
            })
            .finally(() => {
                // Сбрасываем флаг и Promise после завершения
                isRefreshing = false;
                refreshPromise = null;
            });
    });

    return refreshPromise;
};

// Обернем `baseQuery` для обработки ошибок
export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let response = await baseQuery(args, api, extraOptions);
    const requestUrl = response.meta?.request?.url;

    if (response.error) {
        const result = returnError(response.error);
        if (
            result.code === 401 &&
            requestUrl &&
            !requestUrl.includes('auth/refresh-tokens') &&
            !requestUrl.includes('auth/login')
        ) {
            // Ожидаем обновления токена или запускаем процесс обновления
            const newToken = await refreshToken(api);

            // Если получили новый токен, повторяем исходный запрос
            if (newToken) {
                response = await baseQuery(args, api, extraOptions);
            }
        } else if (result.code === 401 && requestUrl?.includes('auth/refresh-tokens')) {
            window.location.href = '/login';
            Storage.clearAllForUser();
        } else if (result.code === -401) {
            window.location.href = '/auth-crm';
        } else if (result.code === 403) {
            window.location.href = '/forbidden';
        } else if (result.code === 404) {
            window.location.href = '/error';
        } else if (result.code !== 400) {
            console.error(result.message);
        }
    }

    return response;
};

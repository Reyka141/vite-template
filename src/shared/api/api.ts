import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Убираем чтение localStorage и формирование headers на уровне модуля
// const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
// const token = JSON.parse(user ?? '{}').id;
// const headers = token ? { Authorization: `Bearer ${token}` } : {};

export const $api = axios.create({
    baseURL: __API__,
    // Убираем headers из начальной конфигурации
    // headers,
});

// Перехватчик запросов
$api.interceptors.request.use((config) => {
    // Добавляем заголовок Authorization перед каждым запросом
    // Добавляем проверку на существование config.headers
    config.headers = config.headers ?? {};
    const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (user) {
        try {
            const userData = JSON.parse(user);
            const token = userData?.authData?.id ?? userData?.id; // Проверяем разные возможные структуры
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (e) {
            console.error('Failed to parse user from localStorage or get token:', e);
        }
    }
    return config;
});

// Перехватчик ответов
$api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        console.log('API Error:', error);
        // Добавляем проверку на 401 ошибку (Unauthorized)
        if (error.response?.status === 401) {
            // Здесь можно добавить логику для обработки ошибки авторизации,
            // например, выход пользователя или обновление токена.
            console.log('Unauthorized request - 401 error');
        }
        return Promise.reject(error);
    },
);

// Вспомогательная функция для создания типизированных запросов
export function apiRequest<T>(api: AxiosInstance, config: AxiosRequestConfig): Promise<T> {
    return api.request(config).then((response: AxiosResponse<T>) => response.data);
}

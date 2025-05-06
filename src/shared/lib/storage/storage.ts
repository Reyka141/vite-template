import { REMEMBER_ME_LOCALSTORAGE_KEY, TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const Storage = {
    /**
     * Проверяет доступность localStorage
     */
    isAvailable(): boolean {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch {
            return false;
        }
    },

    setItem(key: string, value: string): boolean {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, value);
                return true;
            }
        } catch (error) {
            console.error(`Ошибка при сохранении ${key}:`, error);
            // Можно добавить альтернативное сохранение или логику восстановления
        }
        return false;
    },

    getItem(key: string): string | null {
        try {
            if (typeof window !== 'undefined') {
                return localStorage.getItem(key);
            }
        } catch (error) {
            console.error(`Ошибка при получении ${key}:`, error);
        }
        return null;
    },

    removeItem(key: string): boolean {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(key);
                return true;
            }
        } catch (error) {
            console.error(`Ошибка при удалении ${key}:`, error);
        }
        return false;
    },

    clearAll(): boolean {
        try {
            if (typeof window !== 'undefined') {
                localStorage.clear();
                return true;
            }
        } catch (error) {
            console.error('Ошибка при очистке всего хранилища:', error);
        }
        return false;
    },

    clearAllForUser(): boolean {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
                localStorage.removeItem(REMEMBER_ME_LOCALSTORAGE_KEY);
                return true;
            }
        } catch (error) {
            console.error('Ошибка при очистке пользовательских данных:', error);
        }
        return false;
    },
};

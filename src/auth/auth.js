/**
 * @module Auth
 * @description - Утилиты для управления данными пользователя в localStorage
 */

/**
 * Устанавливает данные пользователя в localStorage.
 * @param {Object} userData - Данные пользователя.
 */
export const setUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
};

/**
 * Получает данные пользователя из localStorage.
 * @returns {Object|null} Данные пользователя или null, если данные отсутствуют.
 */
export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

/**
 * Удаляет данные пользователя из localStorage.
 */
export const removeUser = () => {
    localStorage.removeItem('user');
};
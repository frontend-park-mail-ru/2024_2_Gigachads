import { BASE_API_URL } from '../config.js';
import { removeUser } from '../../auth/auth.js';

/**
 * @class User
 * @description - Класс для работы с пользователями
 */
class User {
    /**
     * @description - Вход в систему
     * @param {object} userData - Данные пользователя
     * @returns {Promise<any>} - Ответ от сервера
     */
    async login(userData) {
        const response = await fetch(`${BASE_API_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(userData)
        });
        return response;
    }

    /**
     * @description - Выход из системы
     * @returns {Promise<any>} - Ответ от сервера
     */
    async logout() {
        const response = await fetch(`${BASE_API_URL}logout`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        removeUser();
        return response;
    }

    /**
     * @description - Регистрация пользователя
     * @param {object} userData - Данные пользователя
     * @returns {Promise<any>} - Ответ от сервера
     */
    async signup(userData) {
        const response = await fetch(`${BASE_API_URL}signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(userData)
        });
        return response;
    }

    /**
     * @description - Изменение аватара пользователя
     * @param {object} avatarData - Данные аватара (binary)
     * @returns {Promise<any>} - Ответ от сервера
     */
    async changeAvatar(avatarData) {
        const response = await fetch(`${BASE_API_URL}settings/avatar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(avatarData)
        });
        return response;
    }

    /**
     * @description - Изменение пароля пользователя
     * @param {object} passwordData - Данные для изменения пароля
     * @returns {Promise<any>} - Ответ от сервера
     */
    async changePassword(passwordData) {
        const response = await fetch(`${BASE_API_URL}settings/password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(passwordData)
        });
        return response;
    }

    /**
     * @description - Изменение ника пользователя
     * @param {object} nicknameData - Данные для изменения ника
     * @returns {Promise<any>} - Ответ от сервера
     */
    async changeNickname(nicknameData) {
        const response = await fetch(`${BASE_API_URL}settings/name`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(nicknameData)
        });
        return response;
    }
}

export default new User();
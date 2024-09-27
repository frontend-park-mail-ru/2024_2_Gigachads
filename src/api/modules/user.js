import {BASE_API_URL } from "../config.js";
import { error_Process } from "../errorProcess.js";
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
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(userData)
        });
        return error_Process(response);
    }

    /**
     * @description - Выход из системы
     * @returns {Promise<any>} - Ответ от сервера
     */
    async logout() {
        const response = await fetch(`${BASE_API_URL}logout`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        });
        return error_Process(response);
    }

    /**
     * @description - Регистрация пользователя
     * @param {object} userData - Данные пользователя
     * @returns {Promise<any>} - Ответ от сервера
     */
    async signup(userData) {
        const response = await fetch(`${BASE_API_URL}signup`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(userData)
        });
        return error_Process(response);
    }
}

export default new User();

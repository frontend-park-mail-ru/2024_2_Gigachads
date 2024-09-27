import {BASE_API_URL } from "../config.js";
import { error_Process } from "../errorProcess.js";

/**
 * @class Email
 * @description - Класс для работы с электронной почтой
 */
class Email {
    /**
     * @description - Получение списка сообщений
     * @returns {Promise<any>} - Список сообщений
     */
    async getMessages() {
        const response = await fetch(`${BASE_API_URL}mail/inbox`, { 
            method: "GET", 
            headers: { 'Content-Type': 'application/json' }, 
            credentials: "include" 
        });
        return error_Process(response);
    }

    /**
     * @description - Получение сообщения по ID
     * @param {string} id - ID сообщения
     * @returns {Promise<any>} - Сообщение
     */
    async getMessageById(id) {
        const response = await fetch(`${BASE_API_URL}mail/${id}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        });
        return error_Process(response);
    }

    /**
     * @description - Получение информации о пользователе
     * @returns {Promise<any>} - Информация о пользователе
     */
    async getUserInfo() {
        const response = await fetch(`${BASE_API_URL}user`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        });
        return error_Process(response);
    }

    
}

export default new Email();


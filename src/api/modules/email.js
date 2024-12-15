import { BASE_API_URL } from '../config.js';

/**
 * @class Email
 * @description - Класс для работы с электронной почтой
 */
class Email {
    /**
     * @description - Получение списка входящих сообщений
     * @returns {Promise<any>} - Список входящих сообщений
     */
    async getInboxMessages() {
        const response = await fetch(`${BASE_API_URL}email/inbox`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        return response;
    }

    /**
     * @description - Получение списка исходящих сообщений
     * @returns {Promise<any>} - Список исходящих сообщений
     */
    async getSentMessages() {
        const response = await fetch(`${BASE_API_URL}email/sent`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        return response;
    }

    /**
     * @description - Получение сообщения по ID
     * @param {string} id - ID сообщения
     * @returns {Promise<any>} - Сообщение
     */
    async getMessageById(id) {
        const response = await fetch(`${BASE_API_URL}email/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        return response;
    }

    /**
     * @description - Изменение статуса сообщения
     * @param {string} id - ID сообщения
     * @param {object} statusData - Данные для изменения статуса
     * @returns {Promise<any>} - Ответ от сервера
     */
    async updateEmailStatus(id, statusData) {
        const response = await fetch(`${BASE_API_URL}email/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(statusData)
        });
        return response;
    }

    /**
     * @description - Удаление нескольких сообщений
     * @param {Array} ids - Массив объектов с ID сообщений
     * @returns {Promise<any>} - Ответ от сервера
     */
    async deleteEmails(ids) {
        const response = await fetch(`${BASE_API_URL}email`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(ids)
        });
        return response;
    }
    
    /**
     * @description - Создание нового сообщения
     * @param {string} id - ID родительского сообщения (для ответов)
     * @param {object} emailData - Данные нового сообщения
     * @returns {Promise<any>} - Ответ от сервера
     */
    async createEmail(emailData) {
        const response = await fetch(`${BASE_API_URL}email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(emailData)
        });
        return response;
    }

    /**
     * @description - Получение дерева сообщений начиная с указанного ID
     * @param {string} id - ID сообщения
     * @returns {Promise<any>} - Дерево сообщений
     */
    async getEmailTree(id) {
        const response = await fetch(`${BASE_API_URL}email/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        return response;
    }

    /**
     * @description - Получение информации о пользователе
     * @returns {Promise<any>} - Информация о пользователе
     */
    async getUserInfo() {
        const response = await fetch(`${BASE_API_URL}user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        return response;
    }

    async changeEmailFolder(emailId, folderName) {
        const response = await fetch(`${BASE_API_URL}email/${emailId}/folder`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name: folderName })
        });
        return response;
    }
}

export default new Email();
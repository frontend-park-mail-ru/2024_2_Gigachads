/**
 * Функция для форматирования даты в строку.
 * 
 * @param {Array} emails - Массив писем, содержащих даты в любом формате, понятном для new Date().
 * @returns {Array} - Массив писем, содержащих даты в формате 'DD-MM-YYYY'.
 */
export default function dateFormatingforEmails(emails) {

    for (let i = 0; i < emails.length; i++) {
        const dateObj = new Date(emails[i].date);
        emails[i].date = dateObj.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).split('.').reverse().join('-');
    }

    return emails;
} 
/**
 * Функция для форматирования даты в строку.
 * 
 * @param {Array} date - Массив строк, содержащих даты в любом формате, понятном для new Date().
 * @returns {Array} - Массив строк, содержащих даты в формате 'DD-MM-YYYY'.
 */
export default function dateFormating(date) {

    for (let i = 0; i < date.length; i++) {
        const dateObj = new Date(date[i]);
        date[i] = dateObj.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).split('.').reverse().join('-');
    }

    return date;
} 
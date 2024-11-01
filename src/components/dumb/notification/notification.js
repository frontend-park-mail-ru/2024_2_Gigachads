import notificationTemplate from './notification-template.hbs';


/**
 * Класс Notification
 * Отвечает за создание и управление уведомлениями
 */
class Notification {
    constructor() {
        // Создаем контейнер для уведомлений
        this.container = document.createElement('div');
        this.container.classList.add('notification-container');
        document.body.appendChild(this.container);
    }

    /**
     * Показать уведомление
     * @param {string} message - Текст уведомления
     * @param {string} type - Тип уведомления ('success' или 'error')
     */
    show(message, type) {
        const NotifData = { 
            message: message,
            type: type,
            isSuccess: type === 'success',
            visible: false
        };
        const notificationHTML = notificationTemplate(NotifData);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = notificationHTML;
        const notificationElement = tempDiv.firstElementChild;

        this.container.appendChild(notificationElement);

        // Запускаем анимацию появления
        requestAnimationFrame(() => {
            notificationElement.classList.add('visible');
        });
        const closeButton = notificationElement.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            this.hide(notificationElement);
        });
        // Убираем уведомление через 5 секунд
        setTimeout(() => {
            this.hide(notificationElement);
        }, 5000);
    }

    /**
     * Скрыть уведомление
     * @param {HTMLElement} notificationElement 
     */
    hide(notificationElement) {
        notificationElement.classList.remove('visible');
        notificationElement.classList.add('hide');

        notificationElement.addEventListener('animationend', () => {
            notificationElement.remove();
        });
    }
}


const notificationInstance = new Notification();
export default notificationInstance;
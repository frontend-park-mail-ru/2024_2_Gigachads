import Email from '../../../api/modules/email.js';
import Notification from '../../dumb/notification/notification.js';
import Router from '../../../index.js';

export function mainCheckbox() {
    const mainCheckbox = document.getElementById('main_checkbox');
    mainCheckbox.addEventListener('click', () => {
        const allMails = document.getElementsByClassName('email_card');
        Array.from(allMails).forEach(element => {
            if (mainCheckbox.checked) {
                element.classList.add('selected');
                element.querySelector('.checkbox').checked = true;
            } else {
                element.classList.remove('selected');
                element.querySelector('.checkbox').checked = false;
            }
        });
    });
}

export function deleteSelectedEmails() {
    const deleteButton = document.querySelector('.trash');
    deleteButton.addEventListener('click', async () => {
        const selectedEmails = document.querySelectorAll('.email_card.selected');
        if (selectedEmails.length === 0) {
            Notification.show('Нет выбранных писем для удаления', 'error');
            return;
        }

        const ids = Array.from(selectedEmails).map(email => email.dataset.id);

        try {
            const response = await Email.deleteEmails(ids);
            if (response.ok) {
                Notification.show('Письма успешно удалены', 'success');
                Router.navigate('/inbox');
            } else {
                Notification.show('Ошибка удаления писем', 'error');
            }
        } catch (error) {
            Notification.show(`${error}`, 'error');
        }
    });
}

/**
 * @description - Инициализация всех обработчиков событий
 */
export function initializeNavigationEmailList() {
    mainCheckbox();
    deleteSelectedEmails();
}


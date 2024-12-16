import Router from '../../../index.js';
import Email from '../../../api/modules/email.js';
/**
 * Обрабатывает выбор email сообщений.
 * Добавляет слушатели событий на чекбоксы для выбора писем.
 */
export function selectEmail() {
    const checkboxes = document.getElementsByClassName('checkbox_card');
    Array.from(checkboxes).forEach(element => {
        element.addEventListener('change', () => {
            const emailCard = element.closest('.email_card');
            if (element.checked) {
                emailCard.classList.add('selected');
            } else {
                emailCard.classList.remove('selected');
            }
        });
        element.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });
}

/**
 * Обрабатывает клики по email карточкам и навигацию.
 */
export function clickEmail(email) {
    email.addEventListener('click', () => {
        Router.navigateTo('/email/' + email.dataset.id);
    });
}
export function selectOneEmail(email) {
    const checkbox = email.querySelector('.checkbox_card');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            email.classList.add('selected');
        } else {
            email.classList.remove('selected');
        }
    });
    checkbox.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

export function emails(folder) {
    const emails = document.getElementsByClassName('email_card');
    Array.from(emails).forEach(element => {
        element.dataset.id = element.dataset.id || element.getAttribute('data-id');
        element.addEventListener('click', () => {
            if (folder === 'Черновики') {
                Router.navigateTo('/create_email?description=' + element.querySelector('.description').textContent + '&recipient=' + element.querySelector('.sender').textContent + '&title=' + element.querySelector('.title').textContent + '&id=' + element.dataset.id + '&isChangeDraft=true');
            } else {
                Router.navigateTo('/email/' + element.dataset.id);
            }
        });
    });
}
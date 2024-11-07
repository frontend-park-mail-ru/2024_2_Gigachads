import Router from '../../../index.js';

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
export function emails() {
    const emails = document.getElementsByClassName('email_card');
    Array.from(emails).forEach(element => {
        element.dataset.id = element.dataset.id || element.getAttribute('data-id');
        element.addEventListener('click', () => {
            Router.navigateTo('/email/' + element.dataset.id);
        });
    });
}
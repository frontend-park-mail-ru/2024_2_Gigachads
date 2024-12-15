import Email from '../../../api/modules/email.js';
import Notification from '../../dumb/notification/notification.js';
import Router from '../../../index.js';
import listEmailTemplate from './navigation-email-list.hbs';
import Folder from '../../../api/modules/folder.js';
import { selectEmail, emails } from '../../dumb/mail_message/mail_message.js';
import dateFormatingforEmails from '../../../assets/scripts/date_formating.js';
import { createContextMenu } from '../../dumb/contex_menu/contex_menu.js';
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

export function deleteSelectedEmails(folder) {
    const deleteButton = document.querySelector('.trash');
    deleteButton.addEventListener('click', async () => {
        const selectedEmails = document.querySelectorAll('.email_card.selected');
        if (selectedEmails.length === 0) {
            Notification.show('Нет  выбранных писем для удаления', 'error');
            return;
        }

        const ids = Array.from(selectedEmails).map(email => email.dataset.id);
        const body = {
            ids: ids,
            folder: folder
        };
        try {
            const response = await Email.deleteEmails(body);
            if (response.ok) {
                Array.from(selectedEmails).forEach(email => {
                    email.remove();
                });
                Notification.show('Письма успешно удалены', 'success');
                // Router.navigateTo('/main');
            } else {
                Notification.show('Ошибка удаления писем', 'error');
            }
        } catch (error) {
            Notification.show('Ошибка удаления писем', 'error');
        }
    });
}

export function openContextMenu() {
    const elementsMenu = document.querySelectorAll('.element_menu');
    elementsMenu.forEach(element => {
        element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            createContextMenu(element, mouseX, mouseY, { isFolder: true, isEmail: false, isMove: false });
        });
    });
}

export async function fillContent(folder) {
    const content = document.getElementById('content');
    let EmailForFolder = await (await Folder.getEmailsInFolder(folder)).json();
    const mailMessages = [];
    EmailForFolder = dateFormatingforEmails(EmailForFolder);
    for (let i = 0; i < EmailForFolder.length; i++) {
        mailMessages.push({
            ...EmailForFolder[i]
        });
    }
    content.innerHTML = listEmailTemplate({ mail_messages: mailMessages });
    openContexMenuForEmails();
    deleteSelectedEmails(folder);
    mainCheckbox();
    selectEmail();
    emails(folder);
    openContextMenu();
}
export function openContexMenuForEmails() {
    const elementsMenu = document.querySelectorAll('.email_card');
    elementsMenu.forEach(element => {
        element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            createContextMenu(element, mouseX, mouseY, { isFolder: false, isEmail: true, isMove: false });
        });
    });
}

/**
 * @description - Инициализация всех обработчиков событий
 */
export function initializeNavigationEmailList(folder) {
    mainCheckbox();
    deleteSelectedEmails(folder);
}


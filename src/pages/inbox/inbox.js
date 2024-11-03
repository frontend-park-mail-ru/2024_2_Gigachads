import Email from '../../api/modules/email.js';
import User from '../../api/modules/user.js';
import { rippleEffect } from '../../components/dumb/button/button.js';
import { filterInput } from '../../components/dumb/input/input.js';
import Router from '../../index.js';
import { InboxData } from './inbox_config.js';
import dateFormatingforEmails from '../../assets/scripts/date_formating.js';
import inboxTemplate from './inbox.hbs';
import { getUser } from '../../auth/auth.js';
import { selectEmail, emails } from '../../components/dumb/mail_message/mail_message.js';
import Notification from '../../components/dumb/notification/notification.js';
import { initializeNavigationEmailList } from '../../components/smart/navigation-email-list/navigation-email-list.js';

/**
 * @class Inbox
 * @description - Класс для отображения страницы "Inbox"
 */
class Inbox {
    /**
     * @async
     * @description - Отображение страницы "Inbox"
     * @returns {string} - HTML-код страницы "Inbox"
     */
    async render() {
        const user = getUser();
        if (user) {
            InboxData.userEmail = user.email;
            InboxData.userNickname = user.nickname;
            InboxData.userAvatar = user.avatarPath;
        }
        const response = await Email.getInboxMessages();
        let result = await response.json();
        // Преобразуем ответ в JSON
        result = dateFormatingforEmails(result);
        for (let i = 0; i < result.length; i++) {
            InboxData.mail_messages.push({
                ...result[i]
            });
        }
        return inboxTemplate(InboxData);
    }
    /**
     * @description - Добавление слушателей событий
     * @returns {void}
     */
    attachEventListeners() {

        rippleEffect();
        filterInput();
        this.logoutButton();
        this.createEmailButton();
        this.settingsButton();
        this.navigator();
        selectEmail();
        emails();
        this.profileDropdown();
        initializeNavigationEmailList();
    }
    logoutButton() {
        const button = document.getElementsByClassName('logout');
        Array.from(button).forEach(element => {
            element.addEventListener('click', () => {
                User.logout();
                Router.navigateTo('/login');
                Notification.show('Вы успешно вышли из системы', 'success');
            });
        });
    }
    createEmailButton() {
        const button = document.getElementsByClassName('create_message');
        Array.from(button).forEach(element => {
            element.addEventListener('click', () => {
                Router.navigateTo('/create_email');
            });
        });
    }
    settingsButton() {
        const button = document.getElementsByClassName('settings_button');
        Array.from(button).forEach(element => {
            element.addEventListener('click', () => {
                Router.navigateTo('/settings');
            });
        });
    }
    navigator() {
        const navigatorElements = document.getElementsByClassName('navigator');
        Array.from(navigatorElements).forEach(element => {
            element.addEventListener('click', (event) => {
                const target = event.target.closest('.element_menu');
                if (target && target.dataset.url) {
                    const otherNavigator = document.querySelectorAll('.element_menu');
                    for (let i = 0; i < otherNavigator.length; i++) {
                        otherNavigator[i].classList.remove('active');
                    }
                    target.classList.add('active');
                    Router.navigateTo(target.dataset.url);
                }
            });
        });
    }
    profileDropdown() {
        const profileBox = document.getElementById('profileBox');
        const profileDropdown = document.getElementById('profileDropdown');

        // Функция для переключения видимости панели
        const toggleDropdown = (event) => {
            event.stopPropagation(); // Предотвращает всплытие события
            const isVisible = profileDropdown.style.display === 'flex';
            profileDropdown.style.display = isVisible ? 'none' : 'flex';
        };

        // Функция для скрытия панели
        const hideDropdown = () => {
            profileDropdown.style.display = 'none';
        };

        // Добавляем слушатель клика на аватар
        profileBox.addEventListener('click', toggleDropdown);

        // Добавляем слушатель клика на документ для скрытия панели при клике вне её
        document.addEventListener('click', (event) => {
            if (!profileBox.contains(event.target)) {
                hideDropdown();
            }
        });

    }

}

export default Inbox;
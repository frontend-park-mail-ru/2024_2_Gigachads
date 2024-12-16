import User from '../../api/modules/user.js';
import { rippleEffect } from '../../components/dumb/button/button.js';
import { filterInput } from '../../components/dumb/input/input.js';
import Router from '../../index.js';

import { getUser } from '../../auth/auth.js';
import Notification from '../../components/dumb/notification/notification.js';
import { iframe } from '../../components/smart/iframe/iframe.js';
import Folder from '../../api/modules/folder.js';
import MainTemplate from './main.hbs';
import { fillContent, openContextMenu } from '../../components/smart/navigation-email-list/navigation-email-list.js';
import CreateFolder, { ExitModal } from '../../components/dumb/modal/modal.js';
import ModalTemplate from '../../components/dumb/modal/modal.hbs';
import Email from '../../api/modules/email.js';
import { clickEmail, selectOneEmail } from '../../components/dumb/mail_message/mail_message.js';
import { setCustomInterval } from '../../assets/scripts/intervals.js';
import EmailTemplate from '../../components/dumb/mail_message/mail_message-template.hbs';
import { openContextMenuForEmail } from '../../components/smart/navigation-email-list/navigation-email-list.js';
import dateFormatingforEmails from '../../assets/scripts/date_formating.js';
/**
 * @class Main
 * @description - Класс для отображения страницы "Main"
 */
class Main {
    /**
     * @async
     * @description - Отображение страницы "Main"
     * @returns {string} - HTML-код страницы "Main"
     */
    async render(params) {
        const MainData = [];
        const user = getUser();
        if (user) {
            MainData.userEmail = user.email;
            MainData.userNickname = user.nickname;
            MainData.userAvatar = user.avatarPath;
        }

        const folders = await (await Folder.getFolders()).json();
        MainData.menu_elements = this.createNavigationElements(folders);
        const urlParams = new URLSearchParams(window.location.search);
        const numberActiveElement = MainData.menu_elements.findIndex(element => element.element_text === (urlParams.get('folder') || 'Входящие'));
        MainData.menu_elements[numberActiveElement].active = true;
        const unreadCount = localStorage.getItem('unreadCount');
        if (unreadCount) {
            MainData.menu_elements[0].count = unreadCount;
        }
        if (params.folder === 'Входящие' || Object.keys(params).length === 0) {
            localStorage.removeItem('unreadCount');
        }
        return MainTemplate(MainData);
    }

    /**
     * @description - Добавление слушателей событий
     * @returns {void}
     */
    async attachEventListeners() {
        // iframe('Main');
        const urlParams = new URLSearchParams(window.location.search);
        rippleEffect();
        filterInput();
        this.logoutButton();
        this.createEmailButton();
        this.settingsButton();
        this.navigator();
        this.profileDropdown();
        this.createFolderButton();
        fillContent(urlParams.get('folder') || 'Входящие');
        openContextMenu();
        this.getNewEmails();
        this.requestNotificationPermission();
    }

    createFolderButton() {
        const button = document.getElementById('createFolderButton');
        button.addEventListener('click', () => {
            const div_modal = document.querySelector('.div_modal');
            if (div_modal) {
                div_modal.remove();
            }
            else {
                const modal = document.createElement('div');
                modal.classList.add('div_modal');
                modal.innerHTML = ModalTemplate({ button_text: 'Создать' });
                document.body.appendChild(modal);
                CreateFolder('Создать');
                ExitModal();
                openContextMenu();
            }
        });
    }
    logoutButton() {
        const button = document.getElementsByClassName('logout');
        Array.from(button).forEach(element => {
            element.addEventListener('click', () => {
                User.logout();
                Router.navigateTo('/login');
                localStorage.removeItem('unreadCount');
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
                    if (target.dataset.url.split('#')[1] === 'Входящие') {
                        localStorage.removeItem('unreadCount');
                    }
                    Router.navigateTo('/main?folder=' + target.dataset.url.split('#')[1]);
                    openContextMenu();
                }
            });
        });
    }

    async requestNotificationPermission() {
        if ('Notification' in window && 'serviceWorker' in navigator && typeof window.Notification.requestPermission === 'function') {
            try {
                const permission = await window.Notification.requestPermission();
                if (permission === 'granted') {
                    this.subscribeUserToPush();
                } else {
                    console.log('Разрешение на уведомления не получено.');
                }
            } catch (error) {
                console.error('Ошибка при запросе разрешения на уведомления:', error);
            }
        } else {
            console.warn('Ваш браузер не поддерживает уведомления или сервис-воркеры, или метод requestPermission отсутствует.');
        }
    };

    async subscribeUserToPush() {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array('ВАШ_PUBLIC_VAPID_KEY')
            });
            console.log('Пользователь подписан на push:', subscription);
            // Отправьте объект subscription на ваш сервер для хранения
        } catch (error) {
            console.error('Ошибка подписки на push:', error);
        }
    };

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    };

    getNewEmails() {
        let time = new Date().toISOString();
        setCustomInterval(async () => {
            if (Router.getCurrentRoute().path !== '/signup' && Router.getCurrentRoute().path !== '/login') {
                const response = await Email.GetNewEmails(time);
                if (response.ok) {
                    const emails = await response.json();
                    const formatingEmals = dateFormatingforEmails(emails);
                    if (Router.getCurrentRoute().path === '/main' &&
                        (Object.keys(Router.getCurrentRoute().params).length === 0 ||
                            Router.getCurrentRoute().params.folder === 'Входящие')) {
                        const content = document.getElementById('content');
                        formatingEmals.forEach(email => {
                            const emailCard = document.createElement('div');
                            emailCard.innerHTML = EmailTemplate({ ...email });
                            clickEmail(emailCard.children[0]);
                            selectOneEmail(emailCard.children[0]);
                            openContextMenuForEmail(emailCard.children[0]);
                            if (content.children.length === 1) {
                                content.appendChild(emailCard.children[0]);
                            }
                            else {
                                content.insertBefore(emailCard.children[0], content.children[1]);
                            }
                        });
                    }
                    else {
                        if (emails.length > 1) {
                            Notification.show(`У вас ${emails.length} новых писем`, 'info');
                        }
                        else {
                            Notification.show('Вам пришло письмо', 'info');
                        }
                        this.showPushNotification(emails.length);
                        const countElement = document.getElementById('#Входящие');
                        let unreadCount = localStorage.getItem('unreadCount') || 0;
                        unreadCount = Number(unreadCount) + emails.length;
                        countElement.textContent = unreadCount;
                        localStorage.setItem('unreadCount', unreadCount);
                    }

                    time = new Date().toISOString();
                }
            }
        }, 5000);
    }

    async showPushNotification(count) {
        if (Notification.permission === 'granted') {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                registration.showNotification('Новые письма', {
                    body: `У вас ${count} новых ${count > 1 ? 'писем' : 'письмо'}`,
                    icon: '/icons/icon-192x192.png',
                });
            }
            else {
                // запросить регистрацию
                console.error('ServiceWorker не найден');
            }
        }
    };
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
    createNavigationElements(folders) {
        const navigationElements = [];
        const urlsFolders = [
            { 'Входящие': '/icons/inbox.svg' },
            { 'Отправленные': '/icons/sent.svg' },
            { 'Спам': '/icons/spam.svg' },
            { 'Черновики': '/icons/draft.svg' },
            { 'Корзина': '/icons/trash.svg' },
        ];
        folders.forEach(folder => {
            let url = urlsFolders.find(url => url[folder]);
            if (!url) {
                url = '/icons/label.svg';
            }
            else {
                url = url[folder];
            }
            const navigationUrl = '#' + folder;
            navigationElements.push({
                url: url,
                navigation_url: navigationUrl,
                element_text: folder,
                active: false,
                count: 0
            });
        });
        return navigationElements;
    }

}

export default Main;
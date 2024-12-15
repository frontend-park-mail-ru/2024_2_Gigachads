import settingsTemplate from './settings.hbs';
import {
    filterInput,
    validateUsername,
    validatePassword,
    validateConfirmNewPassword
} from '../../components/dumb/input/input.js';
import { nicknameFormConfig, passwordFormConfig } from './settings_config.js';
import User from '../../api/modules/user.js';
import Notification from '../../components/dumb/notification/notification.js';
import { setUser, getUser } from '../../auth/auth.js';
import { iframe } from '../../components/smart/iframe/iframe.js';

class Settings {
    constructor() {
        this.selectedAvatarFile = null;
    }

    async render() {
        return settingsTemplate({
            nicknameFormConfig,
            passwordFormConfig,
            user: getUser()
        });
    }

    async attachEventListeners() {
        // Обработка формы смены ника
        const nicknameForm = document.getElementById(nicknameFormConfig.formId);
        if (nicknameForm) {
            nicknameForm.addEventListener('submit', this.handleNicknameChange.bind(this));
        }

        // Обработка формы смены пароля
        const passwordForm = document.getElementById(passwordFormConfig.formId);
        if (passwordForm) {
            passwordForm.addEventListener('submit', this.handlePasswordChange.bind(this));
        }

        // Обработка загрузки аватарки
        const avatarInput = document.getElementById('avatarInput');
        const saveAvatarButton = document.getElementById('saveAvatarButton');
        const avatarImage = document.getElementById('avatarImage');

        if (avatarInput && saveAvatarButton && avatarImage) {
            avatarInput.addEventListener('change', (event) => this.handleAvatarChange(event, avatarImage, saveAvatarButton));
            saveAvatarButton.addEventListener('click', () => this.handleAvatarSave(avatarImage, saveAvatarButton));
        }

        // Обработчики для кнопок-ссылок смены логина и пароля
        const toggleNicknameFormButton = document.getElementById('toggleNicknameFormButton');
        const changeNicknameFormContainer = document.getElementById('changeNicknameFormContainer');

        if (toggleNicknameFormButton && changeNicknameFormContainer) {
            toggleNicknameFormButton.addEventListener('click', () => {
                const isVisible = changeNicknameFormContainer.classList.contains('show');
                if (isVisible) {
                    changeNicknameFormContainer.classList.remove('show');
                    changeNicknameFormContainer.classList.add('hide');
                    toggleNicknameFormButton.textContent = 'Сменить логин?';
                } else {
                    changeNicknameFormContainer.classList.remove('hide');
                    changeNicknameFormContainer.classList.add('show');
                    toggleNicknameFormButton.textContent = 'Скрыть';
                }
            });
        }

        const togglePasswordFormButton = document.getElementById('togglePasswordFormButton');
        const changePasswordFormContainer = document.getElementById('changePasswordFormContainer');

        if (togglePasswordFormButton && changePasswordFormContainer) {
            togglePasswordFormButton.addEventListener('click', () => {
                const isVisible = changePasswordFormContainer.classList.contains('show');
                if (isVisible) {
                    changePasswordFormContainer.classList.remove('show');
                    changePasswordFormContainer.classList.add('hide');
                    togglePasswordFormButton.textContent = 'Сменить пароль?';
                } else {
                    changePasswordFormContainer.classList.remove('hide');
                    changePasswordFormContainer.classList.add('show');
                    togglePasswordFormButton.textContent = 'Скрыть';
                }
            });
        }

        // Применение эффектов и валидации
        filterInput();
        validateUsername();
        validatePassword();
        validateConfirmNewPassword(); // Обновлено для новой валидации
    }

    async handleNicknameChange(event) {
        event.preventDefault();
        const usernameInput = document.getElementById('username').value;
        try {
            const response = await User.changeNickname({ name: usernameInput });
            if (response.ok) {
                setUser({
                    ...getUser(),
                    nickname: usernameInput
                });
                Notification.show('Никнейм успешно обновлен!', 'success');
                // Скрыть форму после успешного обновления
                const changeNicknameFormContainer = document.getElementById('changeNicknameFormContainer');
                const toggleNicknameFormButton = document.getElementById('toggleNicknameFormButton');
                if (changeNicknameFormContainer && toggleNicknameFormButton) {
                    changeNicknameFormContainer.classList.remove('show');
                    changeNicknameFormContainer.classList.add('hide');
                    toggleNicknameFormButton.textContent = 'Сменить логин?';
                }
            } else {
                Notification.show('Не удалось обновить никнейм', 'error');
            }
        } catch (error) {
            Notification.show('Не удалось обновить никнейм', 'error');
        }
    }

    async handlePasswordChange(event) {
        event.preventDefault();
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        if (newPassword !== confirmNewPassword) {
            const errorContainer = document.querySelector('[data-error-for="confirmNewPassword"]');
            const alertIcon = errorContainer.previousElementSibling;
            alertIcon.style.display = 'inline';
            errorContainer.textContent = 'Пароли не совпадают';
            return;
        }

        try {
            const response = await User.changePassword({ oldpassword: oldPassword, password: newPassword, repassword: confirmNewPassword });
            if (response.ok) {
                Notification.show('Пароль успешно обновлен!', 'success');
                // Скрыть форму после успешного обновления
                const changePasswordFormContainer = document.getElementById('changePasswordFormContainer');
                const togglePasswordFormButton = document.getElementById('togglePasswordFormButton');
                if (changePasswordFormContainer && togglePasswordFormButton) {
                    changePasswordFormContainer.classList.remove('show');
                    changePasswordFormContainer.classList.add('hide');
                    togglePasswordFormButton.textContent = 'Сменить пароль?';
                }
            } else {
                Notification.show('Не удалось обновить пароль', 'error');
            }
        } catch (error) {
            Notification.show('Не удалось обновить пароль.', 'error');
        }
    }

    handleAvatarChange(event, avatarImage, saveAvatarButton) {
        const file = event.target.files[0];
        if (file) {
            // Проверка типа файла (опционально)
            if (!file.type.startsWith('image/')) {
                Notification.show('Пожалуйста, выберите изображение.', 'error');
                return;
            }

            // Создание URL для предварительного просмотра
            const reader = new FileReader();
            reader.onload = (e) => {
                avatarImage.src = e.target.result;
                saveAvatarButton.style.display = 'block';
            };
            reader.readAsDataURL(file);

            this.selectedAvatarFile = file;
        }
    }

    async handleAvatarSave(avatarImage, saveAvatarButton) {
        if (!this.selectedAvatarFile) {
            Notification.show('Нет выбранного файла для загрузки.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', this.selectedAvatarFile);
        // try {
        const response = await User.changeAvatar(formData);
        const avatarPath = await User.getAvatar();
        if (response.ok) {
            setUser({
                ...getUser(),
                avatarPath: avatarPath
            });
            avatarImage.src = avatarPath;
            Notification.show('Аватар успешно обновлен!', 'success');
            iframe('UploadAvatar');
            saveAvatarButton.style.display = 'none';
            this.selectedAvatarFile = null;
        } else {
            Notification.show('Не удалось обновить аватар.', 'error');
        }
        // } catch (error) {
        //     Notification.show(`${error}`, 'error');
        // }
    }
}

export default Settings;
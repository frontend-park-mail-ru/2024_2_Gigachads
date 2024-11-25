import User from '../../api/modules/user.js';
import Router from '../../index.js';
import { rippleEffect } from '../../components/dumb/button/button.js';
import { filterInput } from '../../components/dumb/input/input.js';
import { loginFormData } from './login_config.js';
import loginTemplate from './login.hbs';
import { setUser } from '../../auth/auth.js';
import { validateEmail, validatePassword } from '../../components/dumb/input/input.js';

/**
 * @class Login
 * @description - Класс для отображения страницы "Login"
 */
class Login {
    /**
     * @async
     * @description - Отображение страницы "Login"
     * @returns {string} - HTML-код страницы "Login"
     */
    async render() {
        const formHtml = loginTemplate(loginFormData);
        return formHtml;
    }
    
    /**
     * @description - Обработка отправки формы
     * @param {Event} event - Событие отправки формы
     * @returns {void}
     */
    async handleSubmit(event) {
        event.preventDefault();
        const emailError = document.querySelector('[data-error-for="email"]').textContent;
        const passwordError = document.querySelector('[data-error-for="password"]').textContent;
        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        // Проверка на наличие ошибок
        if (!emailError && !passwordError && emailInput && passwordInput) {
            // Отправка формы
            const response = await User.login({
                email: emailInput + '@gigamail.ru',
                password: passwordInput
            });
            if (response.ok) {
                const userData = await response.json(); // Предполагается, что сервер возвращает данные пользователя
                setUser({
                    email: userData.email,
                    nickname: userData.name,
                    avatarPath: await User.getAvatar()
                });
                Router.navigateTo('/main');
            }
            else {
                const errorBoxes = document.getElementsByClassName('error-box');
                const errorMessage = errorBoxes[errorBoxes.length - 1].querySelector('.error-message');
                const alertIcon = errorBoxes[errorBoxes.length - 1].querySelector('.alert_icon');
                alertIcon.style.display = 'inline';
                errorMessage.textContent = 'Неправильный логин или пароль';
            }
        } else {
            const errorBoxes = document.getElementsByClassName('error-box');
            for (let i = 0; i < errorBoxes.length; i++) {

                const input = errorBoxes[i].parentElement.querySelector('input');
                if (input.value.trim() === '') {
                    const errorMessage = errorBoxes[i].querySelector('.error-message');
                    const alertIcon = errorBoxes[i].querySelector('.alert_icon');
                    alertIcon.style.display = 'inline';
                    errorMessage.textContent = 'Обязательное поле';
                    input.classList.add('invalid');
                }
            }
        }
    }
    /**
     * @description - Добавление слушателей событий
     * @returns {void}
     */
    async attachEventListeners() {
        const form = document.querySelector('form');
        form.addEventListener('submit', this.handleSubmit);
        rippleEffect();
        filterInput();
        validateEmail();
        validatePassword();
    }

}

export default Login;
import User from '../../api/modules/user.js';
import Router from '../../index.js';
import { rippleEffect } from '../../components/dumb/button/button.js';
import { filterInput } from '../../components/dumb/input/input.js';
import { registrationFormData } from './signup_config.js';
import signupTemplate from './signup.hbs';
import { setUser } from '../../auth/auth.js';
import { validateEmail, validatePassword, validateConfirmPassword, validateUsername } from '../../components/dumb/input/input.js';
/**
 * @class Signup
 * @description - Класс для отображения страницы "Signup"
 */
class Signup {
    /**
     * @async
     * @description - Отображение страницы "Signup"
     * @returns {string} - HTML-код страницы "Signup"
     */
    async render() {
        const formHtml = signupTemplate(registrationFormData);
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
        const repasswordError = document.querySelector('[data-error-for="confirmPassword"]').textContent;
        const usernameError = document.querySelector('[data-error-for="username"]').textContent;

        const emailInput = document.querySelector('input[name="email"]').value;
        const passwordInput = document.querySelector('input[name="password"]').value;
        const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]').value;
        const usernameInput = document.querySelector('input[name="username"]').value;
    
        // Проверка на наличие ошибок
        if (!emailError && !passwordError && !repasswordError && !usernameError && emailInput && passwordInput && confirmPasswordInput && usernameInput) {
            // Отправка формы
            const response = await User.signup({
                name: usernameInput,
                email: emailInput + '@gigamail.ru',
                password: passwordInput,
                repassword: confirmPasswordInput
            });
            if (response.ok) {
                setUser({
                    email: emailInput + '@gigamail.ru',
                    nickname: usernameInput,
                    avatarPath: '/icons/default.png'
                });
                Router.navigateTo('/inbox');
            }
            else {
                const errorBoxes = document.getElementsByClassName('error-box');
                const errorMessage = errorBoxes[errorBoxes.length - 1].querySelector('.error-message');
                const alertIcon = errorBoxes[errorBoxes.length - 1].querySelector('.alert_icon');
                alertIcon.style.display = 'inline';
                errorMessage.textContent = 'Пользователь с такой почтой уже есть';

            }
        } else {
            // Start of Selection
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
     * @description - Добавление слушателей событий для валидации формы
     * @returns {void}
     */
    attachEventListeners() {
   
        const form = document.querySelector('form');
        form.addEventListener('submit', this.handleSubmit);
        rippleEffect();
        filterInput();
        validateUsername();
        validateEmail();
        validatePassword();
        validateConfirmPassword();
    }
}

export default Signup;
import User from '../../api/modules/user.js';
import Router from '../../../index.js';
import { rippleEffect } from '../../components/dumb/button/button.js';
import { filterInput } from '../../components/dumb/input/input.js';
import { registrationFormData } from './signup_config.js';
/**
 * @class Signup
 * @description - Класс для отображения страницы "Signup"
 */
class Signup {
    /**
     * @constructor
     * @description - Конструктор класса Signup, инициализирует загрузку шаблонов
     */
    constructor() {
        this.templatesLoaded = this.loadTemplates();
    }
    /**
     * @async
     * @description - Загрузка шаблонов
     * @returns {Promise<void>}
     */
    async loadTemplates() {
        const [formResponse, inputResponse, buttonResponse, signupResponse] = await Promise.all([
            fetch('/src/components/smart/smart-form-template.hbs'),
            fetch('/src/components/dumb/input/input-template.hbs'),
            fetch('/src/components/dumb/button/button-template.hbs'),
            fetch('/src/pages/signup/signup.hbs')
        ]);

        this.formTemplateString = await formResponse.text();
        this.inputTemplateString = await inputResponse.text();
        this.buttonTemplateString = await buttonResponse.text();
        this.signupTemplateString = await signupResponse.text();
    }
    /**
     * @async
     * @description - Отображение страницы "Signup"
     * @returns {string} - HTML-код страницы "Signup"
     */
    async render() {
        await this.templatesLoaded;
        Handlebars.registerPartial('input-template', this.inputTemplateString);
        Handlebars.registerPartial('button-template', this.buttonTemplateString);
        Handlebars.registerPartial('smart-form-template', this.formTemplateString);
        const signupTemplate = Handlebars.compile(this.signupTemplateString);

        const formHtml = signupTemplate(registrationFormData);
        return formHtml;
    }
    /**
     * @description - Валидация email
     * @param {Event} event - Событие ввода email
     * @returns {void}
     */
    validateEmail(event) {
        const email = event.target.value;
        const inputField = event.target;
        const errorContainer = document.querySelector('[data-error-for="email"]');
        const alertIcon = errorContainer.previousElementSibling;
        if (email.length < 5) {
            errorContainer.textContent = 'Неверный формат email';
            alertIcon.style.display = 'inline';
            inputField.classList.add('invalid');
        } else {
            errorContainer.textContent = '';
            alertIcon.style.display = 'none';
            inputField.classList.remove('invalid');
        }
        const errorPassword = document.querySelector('[data-error-for="confirmPassword"]');
        if (errorPassword.textContent === 'Пользователь с такой почтой уже есть') {
            errorPassword.textContent = '';
            errorPassword.previousElementSibling.style.display = 'none';
            inputField.classList.remove('invalid');
        }
    }

    /**
     * @description - Валидация пароля
     * @param {Event} event - Событие ввода пароля
     * @returns {void}
     */
    validatePassword(event) {
        const password = event.target.value;
        const inputField = event.target;
        const errorContainer = document.querySelector('[data-error-for="password"]');
        const alertIcon = errorContainer.previousElementSibling;
        if (password.length < 6) {
            errorContainer.textContent = 'Пароль должен быть не менее 6 символов';
            alertIcon.style.display = 'inline';
            inputField.classList.add('invalid');
        } else {
            errorContainer.textContent = '';
            alertIcon.style.display = 'none';
            inputField.classList.remove('invalid');
        }
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

        const emailInput = document.querySelector('input[name="email"]').value;
        const passwordInput = document.querySelector('input[name="password"]').value;
        const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]').value;
        // Проверка на наличие ошибок
        if (!emailError && !passwordError && !repasswordError && emailInput && passwordInput && confirmPasswordInput) {
            // Отправка формы
            const response = await User.signup({
                name: emailInput,
                email: emailInput + '@gigamail.ru',
                password: passwordInput,
                repassword: confirmPasswordInput
            });
            if (response.ok) {
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
        const emailInput = document.querySelector('input[name="email"]');
        const passwordInput = document.querySelector('input[name="password"]');
        const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
        const form = document.querySelector('form');
        confirmPasswordInput.addEventListener('input', this.validateConfirmPassword);
        emailInput.addEventListener('input', this.validateEmail);
        passwordInput.addEventListener('input', this.validatePassword);
        form.addEventListener('submit', this.handleSubmit);
        rippleEffect();
        filterInput();
    }

    /**
     * @description - Валидация username
     * @param {Event} event - Событие ввода username, проверка на длину
     * @returns {void}
     */

    /**
     * @description - Валидация confirmPassword
     * @param {Event} event - Событие ввода confirmPassword, сравнение с password
     * @returns {void}
     */
    validateConfirmPassword(event) {
        const confirmPassword = event.target.value;
        const inputField = event.target;
        const errorContainer = document.querySelector('[data-error-for="confirmPassword"]');
        const alertIcon = errorContainer.previousElementSibling;
        const passwordInput = document.querySelector('input[name="password"]').value;
        if (confirmPassword !== passwordInput) {
            errorContainer.textContent = 'Пароли не совпадают';
            alertIcon.style.display = 'inline';
            inputField.classList.add('invalid');
        } else {
            errorContainer.textContent = '';
            alertIcon.style.display = 'none';
            inputField.classList.remove('invalid');
        }
    }

}

export default Signup;
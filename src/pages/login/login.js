import User from "../../api/modules/user.js";
import Router from "../../../index.js";
import { rippleEffect } from "../../components/dumb/button/button.js";
import { filterInput } from "../../components/dumb/input/input.js";
/**
 * @class Login
 * @description - Класс для отображения страницы "Login"
 */
class Login {
    constructor() {
        this.templatesLoaded = this.loadTemplates();
    }
    /**
     * @async
     * @description - Загрузка шаблонов
     * @returns {Promise<void>} - Promise, который разрешается после загрузки всех шаблонов
     */
    async loadTemplates() {
        const [formResponse, inputResponse, buttonResponse, loginResponse] = await Promise.all([
            fetch('/src/components/smart/smart-form-template.hbs'),
            fetch('/src/components/dumb/input/input-template.hbs'),
            fetch('/src/components/dumb/button/button-template.hbs'),
            fetch('/src/pages/login/login.hbs')
        ]);

        this.formTemplateString = await formResponse.text();
        this.inputTemplateString = await inputResponse.text();
        this.buttonTemplateString = await buttonResponse.text();
        this.loginTemplateString = await loginResponse.text();
    }
    /**
     * @async
     * @description - Отображение страницы "Login"
     * @returns {string} - HTML-код страницы "Login"
     */
    async render() {
        await this.templatesLoaded;
        Handlebars.registerPartial('input-template', this.inputTemplateString);
        Handlebars.registerPartial('button-template', this.buttonTemplateString);
        Handlebars.registerPartial('smart-form-template', this.formTemplateString);
        const loginTemplate = Handlebars.compile(this.loginTemplateString);
        const authFormData = {
            formId: "authForm",
            formClass: "auth-form",
            novalidate: true,
            errorContainerId: "forErrors",
            fields: [
                {
                    type: "email",
                    name: "email",
                    id: "email",
                    label: "Email",

                    required: true
                },
                {
                    type: "password",
                    name: "password",
                    id: "password",
                    label: "Пароль",

                    required: true,
                    minlength: 6
                },
            ],
            submitButton: {
                type: "submit",
                className: "submit-button",
                buttonText: "Зарегистрироваться"
            }
        };
        const formHtml = loginTemplate(authFormData);
        // Добавляем обработчики событий для валидации


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
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorContainer.textContent = 'Неверный формат email';
            alertIcon.style.display = 'inline';
            inputField.classList.add('invalid');
        } else {
            errorContainer.textContent = '';
            alertIcon.style.display = 'none';
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
        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        // Проверка на наличие ошибок
        if (!emailError && !passwordError && emailInput && passwordInput) {
            // Отправка формы
            const response = await User.login({
                email: emailInput,
                password: passwordInput
            })
            if (response.ok) {
                Router.navigateTo('/inbox');
            }
            else {
                const errorBoxes = document.getElementsByClassName('error-box');
                const input = errorBoxes[errorBoxes.length - 1].parentElement.querySelector('input');
                console.log(errorBoxes[errorBoxes.length - 1]);
                const errorMessage = errorBoxes[errorBoxes.length - 1].querySelector('.error-message');
                const alertIcon = errorBoxes[errorBoxes.length - 1].querySelector('.alert_icon')
                alertIcon.style.display = 'inline';
                errorMessage.textContent = 'Неправильный логин или пароль';


            }
        } else {
            const errorBoxes = document.getElementsByClassName('error-box');
            for (let i = 0; i < errorBoxes.length; i++) {

                const input = errorBoxes[i].parentElement.querySelector('input');
                if (input.value.trim() === '') {
                    const errorMessage = errorBoxes[i].querySelector('.error-message');
                    const alertIcon = errorBoxes[i].querySelector('.alert_icon')
                    alertIcon.style.display = 'inline';
                    errorMessage.textContent = 'Обязательное поле';
                }
            }
        }
    }
    /**
     * @description - Добавление слушателей событий
     * @returns {void}
     */
    attachEventListeners() {
        const emailInput = document.querySelector('input[type="email"]');
        const passwordInput = document.querySelector('input[type="password"]');
        const form = document.querySelector('form');

        emailInput.addEventListener('input', this.validateEmail);
        passwordInput.addEventListener('input', this.validatePassword);
        form.addEventListener('submit', this.handleSubmit);
        rippleEffect();
        filterInput();
    }


}

export default Login;
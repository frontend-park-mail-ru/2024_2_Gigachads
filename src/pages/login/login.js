class Login {
    constructor() {
        this.templatesLoaded = this.loadTemplates();
    }
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
            console.log(formHtml);
            // Добавляем обработчики событий для валидации
            

            return formHtml;
        }
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
    
        handleSubmit(event) {
            event.preventDefault();
            const emailError = document.querySelector('[data-error-for="email"]').textContent;
            const passwordError = document.querySelector('[data-error-for="password"]').textContent;
            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;
    
            // Проверка на наличие ошибок
            if (!emailError && !passwordError && emailInput && passwordInput) {
                // Отправка формы
                console.log('Форма отправлена');
            } else {
                console.log('Исправьте ошибки в форме');
            }
        }
        attachEventListeners() {
            const emailInput = document.querySelector('input[type="email"]');
            const passwordInput = document.querySelector('input[type="password"]');
            const form = document.querySelector('form');

            emailInput.addEventListener('input', this.validateEmail);
            passwordInput.addEventListener('input', this.validatePassword);
            form.addEventListener('submit', this.handleSubmit);
        }


}

export default Login;
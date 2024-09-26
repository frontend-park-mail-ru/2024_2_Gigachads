class Signup {
    constructor() {
        this.templatesLoaded = this.loadTemplates();
    }
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
    async render() {
            await this.templatesLoaded;
            Handlebars.registerPartial('input-template', this.inputTemplateString);
            Handlebars.registerPartial('button-template', this.buttonTemplateString);
            Handlebars.registerPartial('smart-form-template', this.formTemplateString);
            const signupTemplate = Handlebars.compile(this.signupTemplateString);
            const registrationFormData = {
                formId: "registrationForm",
                formClass: "registration-form",
                novalidate: true,
                errorContainerId: "forErrors",
                fields: [
                    {
                        type: "text",
                        name: "username",
                        id: "username",
                        label: "Имя пользователя",
                
                        required: true,
                        minlength: 6,
                        maxlength: 20
                    },
                    {
                        type: "email",
                        name: "email",
                        id: "email",
                        label: "Почта",
                   
                        required: true
                    },
                    {
                        type: "password",
                        name: "password",
                        id: "password",
                        label: "Пароль",
                       
                        required: true,
                        minlength: 8
                    },
                    {
                        type: "password",
                        name: "confirmPassword",
                        id: "confirmPassword",
                        label: "Подтвердите пароль",
                      
                        required: true
                    }
                ],
                submitButton: {
                    type: "submit",
                    className: "submit-button",
                    buttonText: "Зарегистрироваться"
                }
            };
            const formHtml = signupTemplate(registrationFormData);
            console.log(formHtml);
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
            const usernameInput = document.querySelector('input[name="username"]');
            const emailInput = document.querySelector('input[name="email"]');
            const passwordInput = document.querySelector('input[name="password"]');
            const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
            const form = document.querySelector('form');

            usernameInput.addEventListener('input', this.validateUsername);
            confirmPasswordInput.addEventListener('input', this.validateConfirmPassword);
            emailInput.addEventListener('input', this.validateEmail);
            passwordInput.addEventListener('input', this.validatePassword);
            form.addEventListener('submit', this.handleSubmit);
        }

        validateUsername(event) {
            const username = event.target.value;
            const inputField = event.target;
            const errorContainer = document.querySelector('[data-error-for="username"]');
            const alertIcon = errorContainer.previousElementSibling;
            if (username.length < 3) {
                errorContainer.textContent = 'Имя пользователя должно быть не менее 3 символов';
                alertIcon.style.display = 'inline';
                inputField.classList.add('invalid');
            } else {
                errorContainer.textContent = '';
                alertIcon.style.display = 'none';
                inputField.classList.remove('invalid');
            }
        }

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
/**
 * @description - Функция для фильтрации ввода в поля input, разрешая только цифры, английские буквы и специальные символы (_@ и т.д.)
 */
export function filterInput() {
    const inputs = document.getElementsByTagName('input');

    Array.from(inputs).forEach(input => {
        input.addEventListener('keypress', function (e) {
            const char = String.fromCharCode(e.which);
            const regex = /^[A-Za-z0-9_!#$%^&*()+=?.,;:`~]+$/;
            if (!regex.test(char)) {
                e.preventDefault();
            }
        });

        // Дополнительная проверка на вставку текста
        input.addEventListener('paste', function (e) {
            const pasteData = e.clipboardData.getData('text');
            const regex = /^[A-Za-z0-9_!#$%^&*()+=?.,;:`~]+$/;
            if (!regex.test(pasteData)) {
                e.preventDefault();
            }
        });

    });
}

/**
 * @description - Валидация email и навешивание события ввода
 * @returns {void}
 */
export function validateEmail() {
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const email = emailInput.value;
            const errorContainer = document.querySelector('[data-error-for="email"]');
            const alertIcon = errorContainer.previousElementSibling;
            if (email.length < 5) {
                errorContainer.textContent = 'Почта должна быть не менее 5 символов';
                alertIcon.style.display = 'inline';
                emailInput.classList.add('invalid');
            } else {
                errorContainer.textContent = '';
                alertIcon.style.display = 'none';
                emailInput.classList.remove('invalid');
            }
            const errorPassword = document.querySelector('[data-error-for="confirmPassword"]');
            if (errorPassword && errorPassword.textContent === 'Пользователь с такой почтой уже есть') {
                errorPassword.textContent = '';
                const alertIconPassword = errorPassword.previousElementSibling;
                if (alertIconPassword) {
                    alertIconPassword.style.display = 'none';
                }
                emailInput.classList.remove('invalid');
            }
        });
    }
}

/**
 * @description - Валидация пароля и навешивание события ввода
 * @returns {void}
 */
export function validatePassword() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
    const oldPasswordInput = document.getElementById('oldPassword');
    const passwordInputs = [passwordInput, confirmPasswordInput, newPasswordInput, confirmNewPasswordInput, oldPasswordInput];

    passwordInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                const password = input.value;
                const errorContainer = document.querySelector(`[data-error-for="${input.id}"]`);
                const alertIcon = errorContainer.previousElementSibling;
                if (password.length < 6) {
                    errorContainer.textContent = 'Пароль должен быть не менее 6 символов';
                    alertIcon.style.display = 'inline';
                    input.classList.add('invalid');
                } else {
                    errorContainer.textContent = '';
                    alertIcon.style.display = 'none';
                    input.classList.remove('invalid');
                }
            });
        }
    });
}

/**
 * @description - Валидация подтверждения пароля и навешивание события ввода
 * @returns {void}
 */
export function validateConfirmPassword() {
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', () => {
            const confirmPassword = confirmPasswordInput.value;
            const passwordInput = document.getElementById('password');
            const errorContainer = document.querySelector('[data-error-for="confirmPassword"]');
            const alertIcon = errorContainer.previousElementSibling;
            const password = passwordInput ? passwordInput.value : '';
            if (confirmPassword !== password) {
                errorContainer.textContent = 'Пароли не совпадают';
                alertIcon.style.display = 'inline';
                confirmPasswordInput.classList.add('invalid');
            } else {
                errorContainer.textContent = '';
                alertIcon.style.display = 'none';
                confirmPasswordInput.classList.remove('invalid');
            }
        });
    }
}

/**
 * @description - Валидация подтверждения нового пароля и навешивание события ввода
 * @returns {void}
 */
export function validateConfirmNewPassword() {
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
    if (confirmNewPasswordInput) {
        confirmNewPasswordInput.addEventListener('input', () => {
            const confirmNewPassword = confirmNewPasswordInput.value;
            const newPasswordInput = document.getElementById('newPassword');
            const errorContainer = document.querySelector('[data-error-for="confirmNewPassword"]');
            const alertIcon = errorContainer.previousElementSibling;
            const newPassword = newPasswordInput ? newPasswordInput.value : '';
            if (confirmNewPassword !== newPassword) {
                errorContainer.textContent = 'Пароли не совпадают';
                alertIcon.style.display = 'inline';
                confirmNewPasswordInput.classList.add('invalid');
            } else {
                errorContainer.textContent = '';
                alertIcon.style.display = 'none';
                confirmNewPasswordInput.classList.remove('invalid');
            }
        });
    }
}

/**
 * @description - Валидация имени пользователя и навешивание события ввода
 * @returns {void}
 */
export function validateUsername() {
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', () => {
            const username = usernameInput.value;
            const errorContainer = document.querySelector('[data-error-for="username"]');
            const alertIcon = errorContainer.previousElementSibling;
            if (username.length < 5) {
                errorContainer.textContent = 'Имя должно быть не менее 5 символов';
                alertIcon.style.display = 'inline';
                usernameInput.classList.add('invalid');
            } else {
                errorContainer.textContent = '';
                alertIcon.style.display = 'none';
                usernameInput.classList.remove('invalid');
            }
        });
    }
}
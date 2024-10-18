export const registrationFormData = {
    formId: 'registrationForm',
    formClass: 'registration-form',
    novalidate: true,
    errorContainerId: 'forErrors',
    fields: [
        {
            type: 'text',
            name: 'email',
            id: 'email',
            label: 'Почта',
            isMail: true,
            required: true,
            minlength: 5
        },
        {
            type: 'password',
            name: 'password',
            id: 'password',
            label: 'Пароль',

            required: true,
            minlength: 6
        },
        {
            type: 'password',
            name: 'confirmPassword',
            id: 'confirmPassword',
            label: 'Подтвердите пароль',

            required: true
        }
    ],
    submitButton: {
        type: 'submit',
        className: 'submit-button',
        buttonText: 'Зарегистрироваться'
    }
};
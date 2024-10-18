export const loginFormData = {
    formId: "authForm",
    formClass: "auth-form",
    novalidate: true,
    errorContainerId: "forErrors",
    fields: [
        {
            type: "text",
            name: "email",
            id: "email",
            label: "Почта",
            isMail: true,
            required: true,
            minlength: 5
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
        buttonText: "Войти"
    }
};
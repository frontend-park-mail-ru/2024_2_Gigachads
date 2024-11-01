export const nicknameFormConfig = {
    formId: "changeNicknameForm",
    formClass: "settings-page__form",
    buttonText: "Сохранить",
    fields: [
        {
            type: "text",
            name: "username",
            id: "username",
            label: "Новый никнейм",
            required: true,
            minlength: 5,
            maxlength: 20
        }
    ]
};

export const passwordFormConfig = {
    formId: "changePasswordForm",
    formClass: "settings-page__form",
    buttonText: "Сохранить",
    fields: [
        {
            type: "password",
            name: "oldPassword",
            id: "oldPassword",
            label: "Старый пароль",
            required: true,
            minlength: 6
        },
        {
            type: "password",
            name: "newPassword",
            id: "newPassword",
            label: "Новый пароль",
            required: true,
            minlength: 6
        },
        {
            type: "password",
            name: "confirmNewPassword",
            id: "confirmNewPassword",
            label: "Подтвердите новый пароль",
            required: true,
            minlength: 6
        }
    ]
};
class Signup {
    async render() {
        let formTemplateString;

        async function loadTemplate() {
        const response = await fetch('src/components/smart/smart-form-template.hbs');
        formTemplateString = await response.text();
        initializeForm();
        }

        loadTemplate();

    function initializeForm() {
    var formTemplate = Handlebars.compile(formTemplateString);
    var registrationFormData = {
        formId: "registrationForm",
        formClass: "registration-form",
        novalidate: true,
        errorContainerId: "forErrors",
        submitButtonClass: "submit-button",
        submitButtonText: "Зарегистрироваться",
        fields: [
          {
            type: "text",
            name: "username",
            id: "username",
            label: "Имя пользователя",
            placeholder: "Введите имя пользователя",
            required: true,
            minlength: 3,
            maxlength: 20
          },
          {
            type: "email",
            name: "email",
            id: "email",
            label: "Email",
            placeholder: "Введите email",
            required: true
          },
          {
            type: "password",
            name: "password",
            id: "password",
            label: "Пароль",
            placeholder: "Введите пароль",
            required: true,
            minlength: 8
          },
          {
            type: "password",
            name: "confirmPassword",
            id: "confirmPassword",
            label: "Подтвердите пароль",
            placeholder: "Подтвердите пароль",
            required: true
          }
        ]
      };
    var formHtml = formTemplate(registrationFormData);
  
        // Вставляем форму в корневой элемент
    return formHtml;

    }
    }
};

export default Signup;
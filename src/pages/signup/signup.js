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
                        label: "name",
                
                        required: true,
                        minlength: 3,
                        maxlength: 20
                    },
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
}

export default Signup;
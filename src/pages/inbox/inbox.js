import Email from "../../api/modules/email.js";
import User from "../../api/modules/user.js";
import { rippleEffect } from "../../components/dumb/button/button.js";
import { filterInput } from "../../components/dumb/input/input.js";
import Router from "../../../index.js";
/**
 * @class Inbox
 * @description - Класс для отображения страницы "Inbox"
 */
class Inbox {
    /**
     * @constructor
     * @description - Конструктор класса Inbox, инициализирует загрузку шаблонов
     */
    constructor() {
        this.templatesLoaded = this.loadTemplates();
    }
    /**
     * @async
     * @description - Загрузка шаблонов
     * @returns {Promise<void>} - Promise, который разрешается после загрузки всех шаблонов
     */
    async loadTemplates() {
      const [mail_messageResponse, buttonResponse, inboxResponse, element_menuResponse] = await Promise.all([
          fetch('/src/components/dumb/mail_message/mail_message-template.hbs'),
          fetch('/src/components/dumb/button/button-template.hbs'),
          fetch('/src/pages/inbox/inbox.hbs'),
          fetch('/src/components/dumb/element_menu/element_menu-template.hbs')
      ]);

      this.mail_messageString = await mail_messageResponse.text();
      this.buttonTemplateString = await buttonResponse.text();
      this.inboxString = await inboxResponse.text();
      this.element_menuString = await element_menuResponse.text();
    }
    /**
     * @async
     * @description - Отображение страницы "Inbox"
     * @returns {string} - HTML-код страницы "Inbox"
     */
    async render() {
            await this.templatesLoaded;
            Handlebars.registerPartial('button-template', this.buttonTemplateString);
            Handlebars.registerPartial('mail_message-template', this.mail_messageString);
            Handlebars.registerPartial('element_menu-template', this.element_menuString);
            const inboxTemplate = Handlebars.compile(this.inboxString);
            const response = await Email.getMessages();
            if (response.status === 401) {
                Router.navigateTo('/login');
                return "error";
            }
            const result = await response.json();
          // Преобразуем ответ в JSON
            const authFormData = {
                menu_elements: [
                    {
                        url: '/public/icons/inbox.svg',
                        element_text: 'Все письма',
                        active: true,
                        count: 0
                    }
                    // {
                    //     url: '/public/icons/star.svg',
                    //     element_text: 'Starred',
                    //     active: false,
                    //     count: 0
                    // },
                    // {
                    //     url: '/public/icons/snooze.svg',
                    //     element_text: 'Snoozed',
                    //     active: false,
                    //     count: 0
                    // },
                    // {
                    //     url: '/public/icons/sent.svg',
                    //     element_text: 'Sent',
                    //     active: false,
                    //     count: 0
                    // },
                    // {
                    //     url: '/public/icons/draft.svg',
                    //     element_text: 'Drafts',
                    //     active: false,
                    //     count: 1
                    // },
                    // {
                    //     url: '/public/icons/spam.svg',
                    //     element_text: 'Spam',
                    //     active: false,
                    //     count: 3
                    // },
                    // {
                    //     url: '/public/icons/trash.svg',
                    //     element_text: 'Trash',
                    //     active: false,
                    //     count: 0
                    // }
                ],
                mail_messages : []
            };
       
         
            for (let i = 0; i < result.length; i++) {   
                const dateObj = new Date(result[i].date);
                const formattedDate = dateObj.toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).split('.').reverse().join('-'); 
                authFormData.mail_messages.push({
                    author: result[i].author,    
                    description: result[i].description,
                    date: formattedDate,
                    text: result[i].text,
                    badge_text: result[i].badge_text,
                    badge_type: result[i].badge_type
                }) 
            }
                

            
            return inboxTemplate(authFormData);
    }
    /**
     * @description - Добавление слушателей событий
     * @returns {void}
     */
    attachEventListeners() {

        rippleEffect();
        filterInput();
        this.logoutButton();
    }
    logoutButton() {
        const button = document.getElementsByClassName('logout');
        Array.from(button).forEach(element => {
            element.addEventListener('click', () => {
                User.logout();
                Router.navigateTo('/login');
            });
        });
    }
}

export default Inbox;
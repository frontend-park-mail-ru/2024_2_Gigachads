import sentMessagesTemplate from '../../components/smart/navigation-email-list/navigation-email-list.hbs';
import Email from '../../api/modules/email.js';
import Notification from '../../components/dumb/notification/notification.js';
import dateFormatingforEmails from '../../assets/scripts/date_formating.js';
import { initializeNavigationEmailList } from '../../components/smart/navigation-email-list/navigation-email-list.js';
import { selectEmail } from '../../components/dumb/mail_message/mail_message.js';
import { emails } from '../../components/dumb/mail_message/mail_message.js';
import Router from '../../index.js';

class Sent {
    async render() {
        try {
            const response = await Email.getSentMessages();
            Router.checkAuth(response);
            let sentData;
            if (response.status === 200) {
                let result = await response.json();
                if (result.length !== 0) {
                    result = dateFormatingforEmails(result);
                    sentData = {
                        mail_messages: [],
                    };
                    for (let i = 0; i < result.length; i++) {
                        sentData.mail_messages.push({
                            ...result[i],
                            sender: result[i].recipient
                        });
                    }
                }
                return sentMessagesTemplate(sentData);
            }
            Notification.show('Не удалось получить отправленные письма', 'error');
        } catch (error) {
            Notification.show(`${error}`, 'error');
        }
    }

    attachEventListeners() {
        this.sentNavigatorActiveChange();
        initializeNavigationEmailList('sent');
        selectEmail();
        emails();
    }

    sentNavigatorActiveChange() {
        // забрать у всех element_menu класс active, понять, что у нас sent можно по data-url
        const elementMenus = document.querySelectorAll('.element_menu');
        for (let i = 0; i < elementMenus.length; i++) {
            elementMenus[i].classList.remove('active');
        }
        // надо найти по data-url, нет класса sent
        const sentNavigator = document.querySelector('.element_menu[data-url="/sent"]');
        sentNavigator.classList.add('active');
    }
}

export default Sent;
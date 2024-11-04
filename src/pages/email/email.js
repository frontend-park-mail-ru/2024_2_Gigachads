import emailTemplate from './email.hbs';
import Email from '../../api/modules/email.js';
// import emailMock from '../../api/mocks/emailMock.json';
import Notification from '../../components/dumb/notification/notification.js';
import Router from '../../index.js';
import dateFormatingforEmails from '../../assets/scripts/date_formating.js';
class EmailPage {
    constructor() {
        this.mainEmail = null;
    }
    async render(params) {
        try {
            const email = await Email.getEmailTree(params.id);
            if (email.ok) {
                await Email.updateEmailStatus(params.id, {status: true});
                let emailData = await email.json();
                console.log(emailData);
                emailData = dateFormatingforEmails(emailData);
                this.mainEmail = emailData[0];

                return emailTemplate( {
                    mainEmail: this.mainEmail,
                    emailTree: emailData.slice(1)
                });
            } else {
                Notification.show('Не удалось получить письмо', 'error');
            }
        } catch (error) {
            Notification.show(`${error}`, 'error');
        }
    }

    attachEventListeners() {
        this.replyButtonClickHandler();
        this.forwardButtonClickHandler();
        // this.deleteButtonClickHandler();
    }

    replyButtonClickHandler() {
        const replyButtons = document.querySelectorAll('.email-container__utility-bar-buttons[data-action="reply"]');

        replyButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!this.mainEmail) {
                    Notification.show('Основное письмо не найдено', 'error');
                    return;
                }
                const emailId = this.mainEmail.id;
                const recipient = this.mainEmail.sender;
                const subject = this.mainEmail.title;

                Router.navigateTo(`/create_email?parentID=${emailId}&recipient=${encodeURIComponent(recipient)}&title=Re: ${encodeURIComponent(subject)}`);
            });
        });
    }

    forwardButtonClickHandler() {
        const forwardButtons = document.querySelectorAll('.email-container__utility-bar-buttons[data-action="forward"]');

        forwardButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!this.mainEmail) {
                    Notification.show('Основное письмо не найдено', 'error');
                    return;
                }
                const emailId = this.mainEmail.id;
                const subject = this.mainEmail.title;

                Router.navigateTo(`/create_email?parentID=${emailId}&title=Fwd: ${encodeURIComponent(subject)}`);
            });
        });
    }

    // deleteButtonClickHandler() {
    //     const deleteButtons = document.querySelectorAll('.email-container__utility-bar-buttons[data-action="delete"]');
    //     deleteButtons.forEach(async button => {
    //         button.addEventListener('click', async () => {
    //             const ids = [];
    //             ids.push(this.mainEmail.id);
    //             try {
    //                 const response = await Email.deleteEmails(ids);
    //                 if (response.ok) {
    //                     Notification.show('Письмо удалено', 'success');
    //                     Router.navigateTo('/inbox');
    //                 } else {
    //                     Notification.show('Не удалось удалить письмо', 'error');
    //                 }
    //             } catch (error) {
    //                 Notification.show('Не удалось удалить письмо', 'error');
    //             }
    //         });
    //     });
    // }

}

export default EmailPage;
import createEmailTemplate from './create_email.hbs';
import Email from '../../api/modules/email.js';
import Router from '../../index.js';
import Notification from '../../components/dumb/notification/notification.js';
import { iframe } from '../../components/smart/iframe/iframe.js';
import Draft from '../../api/modules/draft.js';

class CreateEmail {
    async render() {
        const urlParams = new URLSearchParams(window.location.search);
        const parentID = urlParams.get('parentID') || '';
        const recipient = urlParams.get('recipient') || '';
        const title = urlParams.get('title') || '';
        const description = urlParams.get('description') || '';
        const id = urlParams.get('id') || '';
        const isChangeDraft = urlParams.get('isChangeDraft') || '';
        return createEmailTemplate({
            recipient,
            title,
            description,
            parentID,
            id,
            isChangeDraft
        });
    }
    async attachEventListeners() {
        this.resizeTextArea();
        this.handleSubmit();
    }

    async handleSubmit() {
        const form = document.querySelector('.create-email__form');
        const createMessageButton = document.getElementById('createMessage');
        const saveDraftButton = document.getElementById('saveDraft');

        createMessageButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const parentID = formData.get('parentID') || 0;
            const id = formData.get('id') || 0;
            const isChangeDraft = formData.get('isChangeDraft') || false;

            let response;
            if (isChangeDraft) {
                response = await Draft.sendDraft({
                    id: +id,
                    recipient: formData.get('recipient'),
                    title: formData.get('title'),
                    description: formData.get('description')
                });
            } else {
                response = await Email.createEmail({
                    recipient: formData.get('recipient'),
                    title: formData.get('title'),
                    description: formData.get('description'),
                    parentId: +parentID
                });
            }
            if (response.ok) {
                Router.navigateTo('/main');
                iframe('Send');
                Notification.show('Письмо успешно отправлено', 'success');
            } else {
                Notification.show('Письмо не отправлено', 'error');
            }
        });
        saveDraftButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const parentID = formData.get('parentID') || 0;
            const id = formData.get('id') || 0;
            const isChangeDraft = formData.get('isChangeDraft') || false;

            let response;
            if (isChangeDraft) {
                response = await Draft.changeDraft({
                    id: +id,
                    recipient: formData.get('recipient'),
                    title: formData.get('title'),
                    description: formData.get('description'),
                });
            } else {
                response = await Draft.createDraft({
                    recipient: formData.get('recipient'),
                    title: formData.get('title'),
                    description: formData.get('description'),
                    parentId: +parentID
                });
            }
            if (response.ok) {
                iframe('Draft');
                Router.navigateTo('/main?folder=Черновики');
                Notification.show('Черновик сохранен', 'success');
            } else {
                Notification.show('Черновик не сохранен', 'error');
            }

        });
    }

    resizeTextArea() {
        const textarea = document.querySelector('.create-email__input_type_description');

        if (textarea) {
            const autoResize = (element) => {
                element.style.height = 'auto';
                element.style.height = `${element.scrollHeight}px`;
            };

            autoResize(textarea);

            textarea.addEventListener('input', () => {
                autoResize(textarea);
            });
        }
    }
}

export default CreateEmail;
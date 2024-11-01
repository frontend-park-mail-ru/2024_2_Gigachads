import createEmailTemplate from './create_email.hbs';
import Email from '../../api/modules/email.js';
import Router from '../../index.js';
import Notification from '../../components/dumb/notification/notification.js';



class CreateEmail {
    async render() {
        const urlParams = new URLSearchParams(window.location.search);
        const parentID = urlParams.get('parentID') || '';
        const recipient = urlParams.get('recipient') || '';
        const theme = urlParams.get('theme') || '';

        return createEmailTemplate({
            recipient,
            theme,
            parentID
        });
    }
    attachEventListeners() {
        this.resizeTextArea();
        this.handleSubmit();
    }

    async handleSubmit() {
        const form = document.querySelector('.create-email__form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const parentID = formData.get('parentID') || 0;
            try {
                const response = await Email.createEmail({
                recipient: formData.get('recipient'),
                theme: formData.get('theme'),
                description: formData.get('description'),
                parentID: parentID
            });
            if (response.status === 200) {
                    Router.navigate('/sent');
                    Notification.show('Email created successfully', 'success');
                } else {
                    Notification.show('Email creation failed', 'error');
                }
            } catch (error) {
                Notification.show('Email creation failed', 'error');
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
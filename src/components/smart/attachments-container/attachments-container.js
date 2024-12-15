import AttachmentComponent from '../../dumb/attachment/attachment';
import AttachmentTemplate from '../../dumb/attachment/attachment.hbs';

export function loadFileButton() {
    const input = document.getElementById('LoadAttachmentButton');
    if (input) {
        input.addEventListener('change', (event) => {
            const attachments = event.target.files;
            const attachmentsContainer = document.getElementById('attachments-container');
            Array.from(attachments).forEach(async (attachment) => {
                const attachmentPath = await AttachmentComponent.createAttachment(attachment);
                if (attachmentPath) {
                    const attachmentElement = document.createElement('div');
                    attachmentElement.innerHTML = AttachmentTemplate({ path: attachmentPath, name: attachment.name, isChangable: true });
                    AttachmentComponent.addEventListeners(attachmentElement.children[0]);
                    attachmentsContainer.appendChild(attachmentElement.children[0]);
                }
            });
        });
    }
}

export function attachAllAttachments() {
    const attachmentsContainers = document.querySelectorAll('.attachments-container__attachments-container');
    if (attachmentsContainers) {
        attachmentsContainers.forEach(attachmentsContainer => {
            const attachments = attachmentsContainer.children;
            Array.from(attachments).forEach(attachment => {
                AttachmentComponent.addEventListeners(attachment);
            });
        });
    }
}

export function getAllAttachments() {
    const attachmentsContainer = document.getElementById('attachments-container');
    if (attachmentsContainer) {
        const attachments = attachmentsContainer.children;
        const Paths = [];
        Array.from(attachments).forEach(attachment => {
            Paths.push(attachment.dataset.path);
        });
        return Paths;
    }
}

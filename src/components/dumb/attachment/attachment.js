import AttachmentAPI from '../../../api/modules/attachment';
import Notification from '../../dumb/notification/notification';

class AttachmentComponent {
    async createAttachment(file) {
        const response = await AttachmentAPI.AddAttachment(file);
        if (response.ok) {
            const data = await response.json();
            return data.path;
        }
        else {
            Notification.show(`Ошибка при добавлении файла ${file.name}`, 'error');
            return null;
        }
    }

    async deleteAttachment(attachmentPath) {
        const response = await AttachmentAPI.DeleteAttachment(attachmentPath);
        if (response.ok) {
            Notification.show('Файл удален', 'success');
            return true;
        }
        else {
            Notification.show('Ошибка при удалении файла', 'error');
            return false;
        }
    }

    async getAttachment(attachmentPath) {
        const response = await AttachmentAPI.GetAttachment(attachmentPath);
        if (response.ok) {
            const blob = await response.blob();
            return blob;
        } else {
            Notification.show('Ошибка при получении файла', 'error');
            return null;
        }
    }

    async downloadAttachment(attachmentElement) {
        const fileIcon = attachmentElement.querySelector('.attachment-icon');
        if (fileIcon) {
            fileIcon.addEventListener('click', async () => {
                const file = await this.getAttachment(attachmentElement.dataset.path);
                if (file) {
                    const url = window.URL.createObjectURL(file);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = attachmentElement.dataset.filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
            });
        }
    }

    async deleteButtonListener(attachmentElement) {
        const deleteButton = attachmentElement.querySelector('.attachment-delete');
        if (deleteButton) {
            deleteButton.addEventListener('click', async (event) => {
                const response = await this.deleteAttachment(attachmentElement.getAttribute('data-path'));
                if (response) {
                    attachmentElement.remove();
                }
                event.stopPropagation();
            });
        }
    }

    async addEventListeners(attachmentElement) {
        this.deleteButtonListener(attachmentElement);
        this.downloadAttachment(attachmentElement);
    }
}

export default new AttachmentComponent();

import { BASE_API_URL } from '../config';

class AttachmentAPI {
    async GetAttachment(attachmentPath) {
        const response = await fetch(`${BASE_API_URL}getAttachment`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: attachmentPath })
        });
        return response;
    }

    async AddAttachment(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        const response = await fetch(`${BASE_API_URL}attachment`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        return response;
    }

    async DeleteAttachment(attachmentPath) {
        const response = await fetch(`${BASE_API_URL}attachment`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: attachmentPath })
        });
        return response;
    }
}

export default new AttachmentAPI();
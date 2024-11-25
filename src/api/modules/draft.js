import { BASE_API_URL } from '../config';

class Draft {
    async createDraft(emailData) {
        const response = await fetch(`${BASE_API_URL}draft`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(emailData)
        });
        return response;
    }

    async changeDraft(emailData) {
        const response = await fetch(`${BASE_API_URL}draft`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(emailData)
        });
        return response;
    }

    async sendDraft(emailData) {
        const response = await fetch(`${BASE_API_URL}draft/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(emailData)
        });
        return response;
    }
}

export default new Draft();
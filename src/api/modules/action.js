import { BASE_API_URL } from '../config';

export default class Action {
    async getQuestionByAction(actionName) {
        const response = await fetch(`${BASE_API_URL}action/question?action=${actionName}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        return response;
    }

    async postValueQuestionByAction(actionData) {
        const response = await fetch(`${BASE_API_URL}action/answer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(actionData)
        });
        return response;
    }

    async getStatistics() {
        const response = await fetch(`${BASE_API_URL}action/statistics`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        return response;
    }
}
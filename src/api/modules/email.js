import {BASE_API_URL } from "../config.js";

class Email {
    async getMessages() {
        const response = await fetch(`${BASE_API_URL}mail/inbox`, { method: "GET", headers: { 'Content-Type': 'application/json' }, credentials: "include" });
        return response.json();
    }
}

export default new Email();

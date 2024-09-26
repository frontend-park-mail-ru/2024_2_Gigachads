import {BASE_API_URL } from "../config.js";
class User {
    async login(userData) {
        const response = await fetch(`${BASE_API_URL}login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(userData)
        });
        return response.json();
    }

    async logout() {
        const response = await fetch(`${BASE_API_URL}logout`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        });
        return response.json();
    }

    async signup(userData) {
        const response = await fetch(`${BASE_API_URL}signup`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(userData)
        });
        return response.json();
    }
}

export default new User();

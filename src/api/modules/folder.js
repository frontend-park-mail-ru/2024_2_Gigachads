import { BASE_API_URL } from '../config';

class Folder {
    async getFolders() {
        const response = await fetch(`${BASE_API_URL}folder`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        return response;
    }
    async getEmailsInFolder(folderName) {
        const response = await fetch(`${BASE_API_URL}getfolder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name: folderName })
        });
        return response;
    }
    async changeFolderName(folderName, newFolderName) {
        const response = await fetch(`${BASE_API_URL}folder`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name: folderName, new_name: newFolderName })
        });
        return response;
    }
    async createFolder(folderName) {
        const response = await fetch(`${BASE_API_URL}folder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name: folderName })
        });
        return response;
    }

    async deleteFolder(folderName) {
        const response = await fetch(`${BASE_API_URL}folder`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name: folderName })
        });
        return response;
    }
}

export default new Folder();

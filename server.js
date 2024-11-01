import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Получаем имя файла
const __dirname = path.dirname(__filename); // Получаем директорию

const app = express();
const PORT = 80;

// Указать папку для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Отправить index.html для всех запросов
app.get('*', (req, res) => {
    if (req.path.match("\\.(js|css|jpg|png|ttf|hbs|svg)") != null) {
        res.sendFile(path.join(__dirname, "dist/" + req.path));
    }
    else {
        res.sendFile(path.join(__dirname, '/dist/index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
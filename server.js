const express = require('express');
const path = require('path');

const app = express();
const PORT = 4201;

// Указать папку для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Отправить index.html для всех запросов
app.get('*', (req, res) => {
  if (req.path.match("\\.(js|css|jpg|png|ttf|hbs|svg)") != null) {
    res.sendFile(path.join(__dirname, req.path));
  }
  else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
  
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:${PORT}");
});
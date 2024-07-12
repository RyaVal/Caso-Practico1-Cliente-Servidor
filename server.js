// Importa las librerías necesarias
const express = require('express');
const bodyParser = require('body-parser');

// Importa la libreria (uuid) 
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3002;

// Array en memoria para almacenar las notas
let notes = [];

// Configura middleware
app.use(bodyParser.json()); // Parsea cuerpos JSON
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

// Ruta para obtener todas las notas
app.get('/notas', (req, res) => {
    res.json(notes);
});

// Ruta para crear una nueva nota
app.post('/notas', (req, res) => {
    const { title, content } = req.body;
    const newNote = {
        id: uuidv4(), // Genera un ID único para cada nota
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// Ruta para actualizar una nota existente
app.put('/notas/:id', (req, res) => {
    const { title, content } = req.body;
    const note = notes.find(note => note.id === req.params.id);
    if (note) {
        note.title = title;
        note.content = content;
        note.updatedAt = new Date();
        res.json(note);
    } else {
        res.status(404).send('Nota no encontrada');
    }
});

// Ruta para eliminar una nota
app.delete('/notas/:id', (req, res) => {
    notes = notes.filter(note => note.id !== req.params.id);
    res.status(204).send();
});

// Ruta para servir la página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});



 /* <> */
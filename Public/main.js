document.addEventListener('DOMContentLoaded', function() {
    const notesGrid = document.getElementById('notes-grid');
    const createNoteButton = document.getElementById('create-note-button');
    const noteFormContainer = document.getElementById('note-form-container');
    const noteForm = document.getElementById('note-form');
    const cancelButton = document.getElementById('cancel-button');

    let editingNoteId = null;

    // Función para obtener todas las notas del servidor
    async function fetchNotes() {
        const response = await fetch('/notas');
        const notes = await response.json();
        displayNotes(notes);
    }

    // Función para mostrar las notas en el grid
    function displayNotes(notes) {
        notesGrid.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <button onclick="editNote('${note.id}')">Edit</button>
                <button onclick="deleteNote('${note.id}')">Delete</button>
            `;
            notesGrid.appendChild(noteElement);
        });
    }

    // Muestra el formulario de creación de notas
    createNoteButton.addEventListener('click', () => {
        editingNoteId = null;
        noteForm.reset();
        noteFormContainer.style.display = 'block';
    });

    // Oculta el formulario de notas
    cancelButton.addEventListener('click', () => {
        noteFormContainer.style.display = 'none';
    });

    // Maneja el envío del formulario de notas
    noteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        
        const note = { title, content };

        if (editingNoteId) {
            // Actualiza una nota existente
            await fetch(`/notas/${editingNoteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note)
            });
        } else {
            // Crea una nueva nota
            await fetch('/notas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note)
            });
        }

        noteFormContainer.style.display = 'none';
        fetchNotes();
    });

    // Función para editar una nota
    window.editNote = async (id) => {
        const response = await fetch(`/notas/${id}`);
        const note = await response.json();
        document.getElementById('title').value = note.title;
        document.getElementById('content').value = note.content;
        editingNoteId = id;
        noteFormContainer.style.display = 'block';
    };

    // Función para eliminar una nota
    window.deleteNote = async (id) => {
        await fetch(`/notas/${id}`, {
            method: 'DELETE'
        });
        fetchNotes();
    };

    // Inicializa la lista de notas
    fetchNotes();
});

 /* <> */
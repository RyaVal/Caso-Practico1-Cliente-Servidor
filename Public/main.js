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
})
 

 /* <> */
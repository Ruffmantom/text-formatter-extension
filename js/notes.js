// Elements
const noteInputElm = $("#add_note_textarea")
const noteListContainer = $('.note_container')
// BTNS
const addNoteBtn = $('#add_note_btn')
const deleteNoteBtn = $('.delete_btn')
// goal of this file
// Allow the user to create, delete and tag notes

// all using local storage
// notes local storage id TF_NOTES
// when user is typing it gets saved on change in the staging key
// when user clicks add, staging key is cleared and note is saved in the array

// function for creating notes
const addNoteToDom = (noteData) => {
    noteListContainer.prepend(createNote(noteData));
}

function createNewNote() {
    let noteDataObj = {}

    noteDataObj.id = createId()
    noteDataObj.note = globalStaging.text
    noteDataObj.label = ""
    noteDataObj.dateCreated = createDate()
    usersNotes.unshift(noteDataObj)
    // clear values
    globalStaging.text = ''
    globalStaging.editing = false
    $(noteInputElm).val('')
    saveToLocalStorage(TF_NOTES, usersNotes)
    // store the staging object
    saveToLocalStorage(TF_N_S, globalStaging)
    addNoteToDom(noteDataObj)
}

const loadNoteData = () => {
    if (usersNotes.length >= 1) {
        // render them out
        for (const note of usersNotes) {
            noteListContainer.append(createNote(note));
        }
        // load in the staging object
    }
    // console.log(globalStaging.editing)
    if (globalStaging.editing) {

        $(noteInputElm).val(globalStaging.text)
    }
}

const deleteNote = (noteId) => {
    // Find the index of the note with the given noteId in the usersNotes array
    const index = usersNotes.findIndex(note => note.id === noteId);

    if (index !== -1) {
        // Remove the note from the usersNotes array
        usersNotes.splice(index, 1);

        // Update the local storage
        saveToLocalStorage(TF_NOTES, usersNotes);

        // Remove the corresponding HTML element from the page
        $(`.user_note button[data-noteid="${noteId}"]`).closest('.user_note').addClass('deleted_note')
        let deleteNoteHold = setTimeout(() => {
            $(`.user_note button[data-noteid="${noteId}"]`).closest('.user_note').remove()
            clearTimeout(deleteNoteHold)
        }, 160)
    }
}


// on ready
$(function () {
    // loading and appending notes
    loadNoteData()


    // actions
    // save note progress
    $(noteInputElm).on('keyup change', (e) => {
        let noteValue = e.target.value

        // saving in project
        globalStaging.text = noteValue
        globalStaging.editing = true
        // saving to local storage incase of reload
        saveToLocalStorage(TF_N_S, globalStaging)
    })
    // add note action
    $(addNoteBtn).on('click', (e) => {
        e.preventDefault()
        // console.log('clicked create new note!')
        createNewNote()

    })
    // delegation by targeting the parent element and looking
    //for a click from the dynamically added notes
    noteListContainer.on('click', '.delete_btn', function () {
        // Get the noteId from the data attribute of the clicked delete button
        const noteId = $(this).data('noteid');

        // Call the deleteNote function with the noteId
        deleteNote(noteId);
    });



})
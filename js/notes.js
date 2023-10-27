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
const createNote = (noteData) => {
    const noteWithLinks = findAndReplaceLinks(noteData.note);

    return `
    <div class="user_note">
        <button data-noteid=${noteData.id} type="button" class="setting_btn close_btn delete_btn">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10.213" height="12" viewBox="0 0 10.213 12"><defs><clipPath id="a"><rect width="10.213" height="12"/></clipPath></defs><g clip-path="url(#a)"><path d="M.511,10.851A1.293,1.293,0,0,0,1.889,12H8.323A1.293,1.293,0,0,0,9.7,10.851V4.34H.511ZM2.247,5.617H2.86a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H2.247a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46m2.553,0h.613a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H4.8a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46m2.553,0h.613a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H7.353a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46M1.021,2.043A1.021,1.021,0,0,0,0,3.064V3.83H10.213V3.064A1.021,1.021,0,0,0,9.191,2.043H7.66V.919A.918.918,0,0,0,6.74,0H3.472a.918.918,0,0,0-.919.919V2.043Zm5.617,0H3.574V1.481a.461.461,0,0,1,.46-.46H6.179a.461.461,0,0,1,.46.46Z" fill-rule="evenodd"/></g></svg>
        </button>
       <p class="note_text">${noteWithLinks}</p>
       <p class="note_date">Created: ${noteData.dateCreated}</p>
    </div>
    `;
}


const addNoteToDom = (noteData) => {
    noteListContainer.prepend(createNote(noteData));
}

function createNewNote() {
    let noteDataObj = {}

    noteDataObj.id = createId()
    noteDataObj.note = globalStaging.text
    noteDataObj.label = ""
    noteDataObj.dateCreated = new Date().toLocaleDateString()
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
       let deleteNoteHold = setTimeout(()=>{
            $(`.user_note button[data-noteid="${noteId}"]`).closest('.user_note').remove()
            clearTimeout(deleteNoteHold)
        },160)
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
        console.log('clicked create new note!')
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
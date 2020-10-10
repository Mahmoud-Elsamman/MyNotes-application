import { v4 as uuidv4} from 'uuid'
import moment from 'moment'  

let notes = []

// Read existing notes from localStorage
const loadSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// Save the notes to localStorage
const saveNotes = function () {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Expose notes from module
const getNotes = () => notes 

const  createNote = () => {
    const id = uuidv4()
    const timeStamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timeStamp ,
        updatedAt: timeStamp
    })
    
    saveNotes()
    return id 
}

// Remove a note from the list
const removeNote = function (id) {
    const noteIndex = notes.findIndex(function (note) {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}


// Sort the notes using the select element 
const sortNotes = function(sortBy) {

    if(sortBy === 'byEdited') {

        return notes.sort(function (a, b) {

            if(a.updatedAt > b.updatedAt) {
                return -1 
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })

    } else if (sortBy === 'byCreated') {

        return notes.sort(function (a, b) {

            if(a.createdAt > b.createdAt) {
                return -1 
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })

    } else if (sortBy === 'alphabetical') {

        return notes.sort(function (a, b) {

            if(a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1 
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
        
    } else {

        return notes 
    }

}


const updateNote = (noteID, updates) => {
    const note =  notes.find((note) => note.id === noteID)

    if(note == undefined){
        return 
    }

    if(typeof updates.title === 'string'){
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if(typeof updates.body === 'string'){
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()

    return note
}

notes = loadSavedNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote }
import { initializeEditPage, generateLastEdited } from './views'
import { updateNote, removeNote } from './notes'

const titleElementDOM = document.querySelector('#note-title')
const bodyElementDOM = document.querySelector('#note-body')
const removeElementDOM = document.querySelector('#delete-note')
const lastEditedDOM = document.querySelector('#last-edited')

const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleElementDOM.addEventListener('input', function(ev){
    const note = updateNote(noteId, {
        title: ev.target.value
    })
    lastEditedDOM.textContent = generateLastEdited(note.updatedAt)
})


bodyElementDOM.addEventListener('input', function(ev){
    const note = updateNote(noteId, {
        body: ev.target.value
    })
    lastEditedDOM.textContent = generateLastEdited(note.updatedAt)
})


removeElementDOM.addEventListener('click', function(ev){
    removeNote(noteId)
    location.assign('index.html')
})


window.addEventListener('storage' , function(ev){
    
    if(ev.key === 'notes') {
        
        initializeEditPage(noteId)
    }
})
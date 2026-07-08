import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = (props) => {
  const[notes, setNotes] = useState([])
  const[newNote, setNewNote] = useState(
    'a new note...')
  const[showAll, setShowAll] = useState(true)
  const[errorMessage, setErrorMessage] = useState('Some error happened...')

 useEffect(() => {
  const eventHandler = initialNotes => {
    setNotes(initialNotes)
  }
  noteService.getAll()
    .then(eventHandler)
}, [])

const toggleImportanceOf = (id) => {
  const URL = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = {...note, important: !note.important}

  noteService.update(id,changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ?
        returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(`the note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject)
    .then(response => {
      setNotes(notes.concat(response))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) =>{
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
  ? notes : notes.filter(note => note.important)

  return(
    <div>
      <h1> Notes </h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          show {showAll ? 'important' : 'All'}
        </button>
      </div>
      <ul>
        {
        notesToShow.map((note) =>
        <Note key={note.id} note={note} 
        toggleImportance={()=>toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
        onChange={handleNoteChange}/>
        <button type="submit">Save</button>
      </form>
      <Footer/>
    </div>
  )
}




export default App
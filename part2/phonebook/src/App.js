import { useState } from 'react'
//import Note from './Note'

const Note = ({ note }) => {
  return (
    <div>{note.name}</div>
  )
}


const App = () => {
  const [persons, setNotes] = useState([
    {
      //id: 1,
      name: 'Teemu Teekkari',
    },
    {
      //id: 2,
      name: 'Anna Arkkari',
    },
    {
      //id: 3,
      name: 'new',
    }
  ])
  const [newNote, setNewNote] = useState('') 

  const addNote = (event) => { // todennäköisesti alkuperäisessä versiossa tässä meni vihkoon 
    event.preventDefault()
    const noteObject = {
      name: newNote, // tämän pitää olla sama mikä on siinä arrayssa johon lisätään
      //id: persons.length + 1,
    }

    const test = persons.find(n=> n.name === noteObject.name)
    console.log(test)
    if (test === undefined ){
      setNotes(persons.concat(noteObject))
      setNewNote('')
    }else {
      alert(noteObject.name + ' is already added to the phonebook')
    }


  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  
  return (
    <div>
      <h1>Phonebook</h1>

      <form onSubmit={addNote}>
        name:<input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">add</button>
      </form>
    <h2>Numbers</h2>
        {persons.map(note => 
          <Note key={note.name} note={note} />
        )}
    </div>
  )
}

export default App


/*

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event)
    setPersons(persons.concat(event))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit = {addNote}>
          name: <input 
          value={newName}
          onChange={handleNoteChange}
          />
        
          <button type="submit">add</button>
          </form>


      <h2>Numbers</h2>


        {persons.map(name => 
        <Note key={name.name} note={name.name} />
        )}


    </div>
  )
}

export default App


*/
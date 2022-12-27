import { useState } from 'react'


const Note = ({ note }) => {
  return (
    <div>{note.name} {note.number}</div>
  )
}


const Filter = ({newS, setNewS}) => {
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewS(event.target.value)
  }
  return (

    <div>Filter shown with
    <input
    value={newS}
    onChange={handleSearchChange}
    />
</div>
  )

}
const PersonForm = ({persons, setNotes, newNote, setNewNote, newNumber, setNewNumber}) => {

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }  

  const addNote = (event) => { // todennäköisesti alkuperäisessä versiossa tässä meni vihkoon 
    event.preventDefault()
    const noteObject = {
      name: newNote, // tämän pitää olla sama mikä on siinä arrayssa johon lisätään
      number: newNumber,
      //id: persons.length + 1,
    }
    const test = persons.find(n=> n.name === noteObject.name)
    console.log(test)
    if (test === undefined ){
      setNotes(persons.concat(noteObject))
      setNewNote('')
      setNewNumber('')
    }else {
      alert(noteObject.name + ' is already added to the phonebook')
    }
  }

return (
  <form onSubmit={addNote}>
  <div>name: 
    <input
    value={newNote}
    onChange={handleNoteChange}
  /></div>
  
  <div>number: 
  <input 
  value={newNumber}
  onChange={handleNumberChange}
  /></div>
  <button type="submit">add</button>
</form>


)
}

const ShowPersons =({persons, newS}) => {
  const newPersons = persons.filter(name => name.name.toLowerCase().includes(newS.toLowerCase()))

  return (
    <div>
    {newPersons.map(note => 
      <Note key={note.name} note={note} />
      )}
      </div>
  )
}


const App = () => {
  const [persons, setNotes] = useState([
    {
      //id: 1,
      name: 'Teemu Teekkari',
      number: 123,
    },
    {
      //id: 2,
      name: 'Anna Arkkari',
      number: 223,
    },
    {
      //id: 3,
      name: 'new',
      number: 331,
    }
  ])
  const [newNote, setNewNote] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [newS, setNewS] = useState('') 
  
  return (
    <div>
      <h1>Phonebook</h1>

      <Filter newS={newS} setNewS={setNewS} />


      <h2>add a new</h2>

      <PersonForm 
      persons={persons}
      setNotes={setNotes}
      newNote={newNote}
      setNewNote={setNewNote}
      newNumber={newNumber}
      setNewNumber={setNewNumber}
      />
    
      <h2>Numbers</h2>
      <ShowPersons persons={persons} newS={newS}/>
    </div>
  )
}

export default App

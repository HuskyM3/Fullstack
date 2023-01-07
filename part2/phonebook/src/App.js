import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import serverWork from './serverComp'


const Note = ({ note, serverDel }) => {
  return (
    <div>{note.name} {note.number}
    <button onClick={serverDel}>Delete</button>
    </div>
    
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
      serverWork.add(noteObject).then(note =>{
        setNotes(persons.concat(noteObject))
        setNewNote('')
        setNewNumber('')
      })

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




const ShowPersons =({persons, newS, setNotes, single}) => {
  const newPersons = persons.filter(name => name.name.toLowerCase().includes(newS.toLowerCase()))
  const deleteButton = id => {
    const theID = newPersons.find(n=> n.id === id)
    console.log(theID)
    if (window.confirm(`delete ${theID.name} `)) {
      serverWork.serverDelete(id, theID)
      setNotes(newPersons.filter(n=> n.id !== id))
    }
  }
  return (
    //tähän ehkä pitäis saada päivityetty versio 
    <div>
      <Note note={single} serverDel={() => deleteButton(single.id)} />
      </div>
  )
}


const App = () => {
  const [persons, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [newS, setNewS] = useState('') 
  
useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

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
      {persons.map(n=><ShowPersons key={n.name}  persons={persons} newS={newS} setNotes={setNotes} single={n}/>)}
      
    </div>
  )
}

export default App

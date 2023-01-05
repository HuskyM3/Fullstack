import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'


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


export default {ShowPersons, PersonForm, Filter}

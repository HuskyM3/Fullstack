import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import serverWork from './serverComp'
import './index.css'



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
const PersonForm = ({persons, setNotes, newNote, setNewNote, newNumber, setNewNumber, setMessage}) => {

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }  

  const addNote = (event) => { 
    event.preventDefault()
    const noteObject = {
      name: newNote, 
      number: newNumber,
      id: event.toInt 
    }
    const test = persons.find(n=> n.name === noteObject.name)
    console.log(test) 
    if (test === undefined ){
      serverWork.add(noteObject).then(note =>{
        console.log(noteObject.name)
        setNotes(persons.concat(noteObject))
        setNewNote('')
        setNewNumber('')
        PopUpBar(setMessage, noteObject.name, ' was added')
      }).catch(error=> {
        console.log(error.response.data.error)
        PopUpBar(setMessage, error.response.data.error, '')
      })
      

    }else {
      
      if(window.confirm(`${noteObject.name} update`)){ 
        serverWork.update(test.id, noteObject).then(m=>
          setNotes(persons.map(n=> n.id !== test.id ? n : m))
          ).then(n=>{
            PopUpBar(setMessage, noteObject.name, 'was changed')
          })
        setNewNote('')
        setNewNumber('')
        }
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


const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }
  if(message.includes('was already removed from server') || message.includes('Person validation failed')){ 
  return (
    <div className='error'>
      {message}
    </div>
  )}else{
    return(
    <div className='change'>
    {message}
  </div>
    )
    }
}

const PopUpBar =(setMessage, noteObject, oType, color) => {
  setMessage(`${noteObject} ${oType}`)
  setTimeout(()=> {
    setMessage(null)
  }, 2000)
  
}


const ShowPersons =({persons, newS, setNotes, single, setMessage}) => {
  const newPersons = persons
  const deleteButton = id => {
    const theID = newPersons.find(n=> n.id === id)
    console.log(theID)
    if (window.confirm(`delete ${theID.name} `)) {
      serverWork.serverDelete(id, theID).then(n=>{
        PopUpBar(setMessage, theID.name, 'was deleted')
        setNotes(newPersons.filter(n=> n.id !== id))
      }).catch(err=>{
        PopUpBar(setMessage, theID.name, 'was already removed from server')
      })
    }
  }
  return (
    <div>
      <Note note={single} serverDel={() => deleteButton(single.id)} />
      </div>
  )
}


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Test Apps, Wawe university</em>
    </div>
  )
}


const App = () => {
  const [persons, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [newS, setNewS] = useState('') //filter 
  const [message, setMessage] = useState(null)
  
useEffect(() => {
 serverWork.getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter newS={newS} setNewS={setNewS} />


      <h2>add a new</h2>
      
      <PersonForm 
      persons={persons}
      setNotes={setNotes}
      newNote={newNote}
      setNewNote={setNewNote}
      newNumber={newNumber}
      setNewNumber={setNewNumber}
      setMessage={setMessage}
      />
    
      <h2>Numbers</h2>
      {persons.filter(name => name.name.toLowerCase().includes(newS.toLowerCase())).map(n=><ShowPersons 
      key={n.name}  persons={persons} 
      newS={newS} setNotes={setNotes} single={n} 
      setMessage={setMessage}/>)}
      
      <Footer />
    </div>
  )
}

export default App

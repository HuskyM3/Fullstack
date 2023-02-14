import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const Anecdote = ({ note, handleClick }) => {
  //console.log(note)
  const dispatch = useDispatch()
  
  return(
    <div key={note.id}>
    <div>
      {note.content}
    </div>
    <div>
      has {note.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
  )
}



const Anecdotes = () => {
  const dispatch = useDispatch()
  //const anecdotes = useSelector(state => state.anecdotes)
  //const filter = useSelector(state => state.filter)
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    //console.log(event.target.value)
    //console.log(event.content)
    //event.preventDefault()
    const content = event
    dispatch(vote(content.id))
    dispatch(notificationChange(`You liked '${event.content}'`))
    setTimeout(()=> dispatch(notificationChange('')),5000)
  }
  const {anecdotes, filter} = useSelector(state => state)
  
  //console.log(anecdotes)
  //console.log('pöö')
  //console.log(filter)
//console.log(anecdotes.filter(n=> n.content.includes(filter)))
  return(
    <div>
      {[...anecdotes].sort((n,m)=> m.votes - n.votes)
      .filter(note => note.content.includes(filter))
      .map(note =>
        <Anecdote
        key={note.id}
        note={note}
        handleClick={() =>handleChange(note)}
          />)}
    </div>
  )
}

export default Anecdotes

/*
        <Anecdote
          key={note.id}
          note={note}
          handleClick={() =>
            handleChange(note)
          }
        />*/
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import services from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    
   
    dispatch(createNote(content))
    dispatch( setNotification(`You added '${content}'`, 10) )
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewAnecdote
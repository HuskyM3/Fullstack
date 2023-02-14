import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import services from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    //const newAnacdote = await services.createNew(content)
    dispatch(createNote(content))
    dispatch(notificationChange(`You added '${content}'`))
    setTimeout(()=> dispatch(notificationChange('')),5000)
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewAnecdote
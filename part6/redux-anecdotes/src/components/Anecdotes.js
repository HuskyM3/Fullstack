import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ note, handleClick }) => {
  //console.log(note)
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
  const notes = useSelector(state => state)

  return(
    <div>
      {notes.sort((n,m)=> m.votes - n.votes).map(note =>
        <Anecdote
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(vote(note.id))
          }
        />
      )}
    </div>
  )
}

export default Anecdotes
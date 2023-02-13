import Anecdotes from "./components/Anecdotes"
import NewAnacdote from "./components/NewAnacdote"
import Filter from "./components/Filter"
import { useDispatch } from "react-redux"
import { useEffect } from 'react'
import service from './services/anecdotes'
import { setNotes } from "./reducers/anecdoteReducer"

const App = () => {

  /*
  const dispatch = useDispatch()
  useEffect(() => {
    service
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch])

  */
  return(
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <h3>Add new</h3>
      <NewAnacdote/>
    </div>
  )
}

export default App



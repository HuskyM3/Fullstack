import Anecdotes from "./components/Anecdotes"
import NewAnacdote from "./components/NewAnacdote"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useDispatch } from "react-redux"
import { useEffect } from 'react'
import { initializeAnecdotes } from "./reducers/anecdoteReducer"

const App = () => {

  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  
  return(
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <h3>Add new</h3>
      <NewAnacdote/>
    </div>
  )
}

export default App



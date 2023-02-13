import Anecdotes from "./components/Anecdotes"
import NewAnacdote from "./components/NewAnacdote"
import Filter from "./components/Filter"

const App = () => {
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



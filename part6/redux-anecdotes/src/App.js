import Anecdotes from "./components/Anecdotes"
import NewAnacdote from "./components/NewAnacdote"

const App = () => {
  return(
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h3>Add new</h3>
      <NewAnacdote/>
    </div>
  )
}

export default App



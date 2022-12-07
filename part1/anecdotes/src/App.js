import { useState } from 'react'


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const arr = Array(7).fill(0)
  const [points, setStage] = useState(arr)
  const [most, setMost] = useState('')

  const click =() => {
    const random = getRandomInt(0,7)
    setSelected(random)
  }
  const vote =()=> {
    const copy = [...points]
    copy[selected] += 1
    setStage(copy)
    best()
  }
  
  const best = () =>{
    const max = Math.max(...points)
    const index = points.indexOf(max)
    setMost(anecdotes[index])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {points[selected]} votes
      <br/>
      <Button handleClick={click} text = 'generate' />
      <Button handleClick={vote} text = 'vote' />
      <h1>Anecdote with most votes</h1>
      <br/> {most} 
    </div>
  )
}

export default App

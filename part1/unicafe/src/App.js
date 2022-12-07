import { useState } from 'react'


const Tittle = (props) => {
  const text = props.name
  return ( 
    <div>
      <h1>{text}</h1>
    </div>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0) // total sum of good, bad and neutral 
  const [total, setTotal] = useState(0) //-1,0,1 total sum 
  const [average, calcTotal ] = useState(0) //average
  const [positive, setPositive] = useState(0)


  const handleGood = () => {
    setGood(good + 1)
    setAll(all+1)
    setTotal(total +1)
    calcTotal((total+1)/(all+1))

    setPositive((good+1)/(all+1))
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all+1)
    setTotal(total - 1)
    calcTotal((total-1)/(all+1))

    setPositive(good/(all+1))
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all+1)
    setTotal(total)
    calcTotal(total/(all+1))

    setPositive(good/(all+1))
  }



  return (
    <div>
      <Tittle name = 'give feedback' />
      <Button  handleClick = {handleBad} text='bad' />
      <Button  handleClick = {handleNeutral} text='neutral' />
      <Button  handleClick = {handleGood} text='good' />
      <Tittle name = 'statistics'/>
      <p>
      Bad {bad} 
      <br/> Neutral {neutral}
      <br/> Good {good}
      <br/> All {all}
      <br/> Average {average}
      <br/> Positive {positive}
      </p>

    </div>
  )
}

export default App

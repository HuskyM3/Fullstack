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
  const [good, bad, neutral] = [props.good, props.bad, props.neutral]
  const total = good + bad + neutral
  const average = (good*1+bad*(-1))/total
  const positive = (good/total)*100

  if (total == 0 ){
    return(
    <div>
      NO DATA 
    </div>
    )
  }
  return (
    <div>
      <StatisticsLine text = 'good' value = {good}/>
      <StatisticsLine text = 'neutral' value = {neutral}/>
      <StatisticsLine text = 'bad' value = {bad}/>
      <StatisticsLine text = 'average' value = {average}/>
      <StatisticsLine text = 'positive' value = {positive}/> 
    </div>
  )
}

const StatisticsLine = (props) => {
  const text = props.text
  const value = props.value
  if (text == 'positive'){
    return (
    <div>
      {text} {value} %
    </div>
    )
  }
  return (
  <div>
    {text} {value}
  </div>
  )
  
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  const handleGood = () => {
    setGood(good + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }



  return (
    <div>
      <Tittle name = 'give feedback' />
      <Button  handleClick = {handleBad} text='bad' />
      <Button  handleClick = {handleNeutral} text='neutral' />
      <Button  handleClick = {handleGood} text='good' />
      <Tittle name = 'statistics'/>
      <Statistics good = {good} bad = {bad} neutral = {neutral} />
    </div>
  )
}

export default App
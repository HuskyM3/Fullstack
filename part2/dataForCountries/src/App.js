import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'


const Details = ({country}) => {
  // näyttää kaikki tiedot
  return (
    <div>
        
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h2>
      Languages
    </h2>
    {(Object.keys(country.languages)).map(n=> 
      <ul>
    {(country.languages[n])}
      </ul>
      )}
    {country.flag}
    </div>
    /*
      <Weather country={country} />
    */

    
  )
}


const Filter = ({newS, setNewS}) => {
  // haku 
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewS(event.target.value)
  }

  return (

    <div>Filter shown with
    <input
    value={newS}
    onChange={handleSearchChange}
    />
</div>
  )
}


const ShowPersons =({persons, newS}) => {
  //filttering
  persons.forEach((obj, i) => obj.index = i)
  const newPersons = persons.filter(name => name.name.common.toLowerCase().includes(newS.toLowerCase()))
  console.log(newPersons.length)
  const [show, update] = useState(false)
  const len = newPersons.length
  
  if (len > 9 && !show){
     return 'no'
  }else if (len > 1 && !show ){
     return (

      newPersons.map(country => {

        return (    
        <div key={country.index}>
        {country.name.common}
        <button onClick={() => update(country)}> show </button>
        </div>
        )
      }
      )   
    )
  }else if (show){
    return (
      <div>
      <Details country={show} />
      {<button onClick={() => update(false)}> back </button>} 
    </div>
    )
  }
}


const App = () => {
  const [countries, setNotes] = useState([])
  const [newS, setNewS] = useState('') 
  
useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  return (
    <div>
      <Filter newS={newS} setNewS={setNewS} />

      <ShowPersons persons={countries} newS={newS}/>
    </div>
  )
}


const Weather = ({country}) => {
  const [weather, setWeather] = useState({})
  const lat = country.latlng[0]
  const lon = country.latlng[1]
  const capital = country.capital

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])


  return (
    <div>
      <h1>Weather in {capital}</h1>
      {weather}
    </div>
  )
}



export default App

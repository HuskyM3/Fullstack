
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const add = noteObject => {
  const request = axios.post(baseUrl, noteObject)
  return (
  request.then(response => {
    //response.data
    console.log(response)
  })
  )
}


export default {add}





import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {

  const request = axios.get('http://localhost:3000')

  return request.then(response => response.data)

}

const add = noteObject => {
  const request = axios.post(baseUrl, noteObject)
  return request.then(response => response.data)

}
const serverDelete = (id, newObject) => {
  const request = axios.delete(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {add, serverDelete, update, getAll}




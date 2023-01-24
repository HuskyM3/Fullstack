
import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {

  const request = axios.get(baseUrl)

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




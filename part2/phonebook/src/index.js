import ReactDOM from 'react-dom/client'
import App from './App'

import axios from 'axios'


ReactDOM.createRoot(document.getElementById('root')).render(<App />)
/*
axios.get('/api/persons/').then(response => { // 'http://localhost:3000')
  const persons = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App persons={persons}/>
  )
})
*/
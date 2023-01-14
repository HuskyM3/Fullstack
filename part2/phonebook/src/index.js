import ReactDOM from 'react-dom/client'
import App from './App'

import axios from 'axios'



//ReactDOM.createRoot(document.getElementById('root')).render(<App />)

axios.get('http://localhost:3000').then(response => {
  const persons = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App persons={persons}/>
  )
})

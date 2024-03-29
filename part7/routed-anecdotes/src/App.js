import { useState } from 'react'
import  { useField } from './hooks'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, Navigate, useNavigate, useMatch
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )
}

/*

  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
*/

const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n=> n.id === Number(id))
  return (  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={`${anecdote.info}`}>{anecdote.info}</a></p>
  </div>)
}


const AnecdoteList = ({ anecdotes }) => (

  <div>
  <h1>Software anecdotes</h1>

  <div>
    {anecdotes.map(anecdote => <li key={anecdote.id} >{<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>}</li>)}
  </div>
</div>




)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/HuskyM3/Fullstack/tree/main/part7/routed-anecdotes'>https://github.com/HuskyM3/Fullstack/tree/main/part7/routed-anecdotes</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  //const [content, setContent] = useState('')

  //const [author, setAuthor] = useState('')
  //const [info, setInfo] = useState('')
  
  const {reset: resetContent, ...content} = useField('')
  const {reset: resetAuthor, ...author} = useField('')
  const {reset: resetInfo, ...info} = useField('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    resetFields()
    //setContent('')
    //setAuthor('')
    //setInfo('')
    navigate('/')
  }

  const resetFields = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='create'>create</button>
        <button type='reset' onClick={resetFields}>reset</button>
      </form>
  
    </div>
  )

}

const Notification = ({message}) =>{
  return (
    <div>
      {message !== null ? <div>{message}</div> : <div></div>}
    </div>
  )
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' created!`)
    setTimeout(()=> setNotification(null), 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const padding = {
    padding: 5
  }



  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Notification message={notification}/>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create'>create</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>
  <Routes>
    <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
    <Route path="/create" element={<CreateNew addNew={addNew} />} />
    <Route path="/about" element={<About />} />
    <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>} />
  </Routes>
  <Footer/>
  </Router>
  )
}

export default App

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      title: newBlog,
      author: 'test',
      url: 'place',
    }

    blogService
      .create(noteObject)
        .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setNewBlog('')
      })
  }

  const handleNoteChange = (event) => {
    setNewBlog(event.target.value)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newBlog}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )



  return (
    <div>
      <h2>blogs</h2>

      {!user && loginForm()} 
      {user && <div>
        <p>{user.name} logged in</p>
          {blogForm()}

          {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}



        </div>
      } 


    </div>
  )
}

export default App
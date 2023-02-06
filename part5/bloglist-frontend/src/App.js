import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    url: '',
    author: '',
    likes: ''
  })

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  //const [isLogin, setLogin] = useState(false)

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
      //setLogin(true) // miten tokeneiden kanssa toimitaan?
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
      //setLogin(true)
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
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author,
      likes: newBlog.likes,
      //url: newBlog.url,
    }

    blogService
      .create(noteObject)
        .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setNewBlog({
          title: '',
          url: '',
          author: '',
          likes: ''
        })
      })
  }

  const handleNoteChange = (event) => {
    const {name, value} = event.target
    setNewBlog({
      ...newBlog,
      [name] : value
    })
  }
  // here is problem 


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
      <div>title: 
      <input
        value={newBlog.title}
        name='title'
        onChange={handleNoteChange}
      />
      </div>
      <div> url: 
      <input
      value={newBlog.url}
      name='url'
      onChange={handleNoteChange}
      />
      </div>
      <div> author: 
      <input
      value={newBlog.author}
      name='author'
      onChange={handleNoteChange}
      />
      </div>
      <div> likes: 
      <input
      value={newBlog.likes}
      name='likes'
      onChange={handleNoteChange}
      />
      </div>
      <button type="submit">create</button>
    </form>  
  )



  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    // huom mahdollisia erikoisuuksia tiedossa,
    // koska tokeineita ei käsitellä erikseen!!!
  }



  return (
    <div>
      <h2>blogs</h2>

      {!user && loginForm()} 
      {user && <div>
        <p>{user.name} logged in</p> 
        <form
        onSubmit={logout}>
          <button type="submit">logout</button>
        </form>
          

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
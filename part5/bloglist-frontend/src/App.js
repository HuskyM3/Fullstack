import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './css/visuals.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


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
  const [loginVisible, setLoginVisible] = useState(false)

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


  const loginRef = useRef()
  const blogFormRef = useRef()

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

  const addNote = async (noteObject) => {
    /*event.preventDefault()
    const noteObject = {
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author,
      likes: newBlog.likes,
      //url: newBlog.url,
    }
    */
   console.log('aa')
   console.log(noteObject)
    try{
    const returnedNote = await blogService.create(noteObject)
        
        setBlogs(blogs.concat(returnedNote))
        blogFormRef.current.toggleVisibility()
        setErrorMessage(`a new blog ${noteObject.title} by ${noteObject.author} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      
      }catch (exception){
        setErrorMessage('invalid blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }

    
    }
  



/*
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  */
  /*
  (
    <div> <h2>log in to application</h2>
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
    </div>     
  )
  */




  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    // huom mahdollisia erikoisuuksia tiedossa,
    // koska tokeineita ei käsitellä erikseen!!!
  }



  return (
    <div>
      
      <Notification message={errorMessage} />
      {!user && 
      <Togglable buttonLabel='login' ref={loginRef}>
        <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
        />
      </Togglable>
      
      
      } 
      {user && <div>
        <h2>blogs</h2>
        <div>{user.name} logged in 
        <form
        onSubmit={logout}>
          <button type="submit">logout</button>
        </form>
        </div>
          
          <h2>create new</h2>
          <Togglable buttonLabel='create' ref={blogFormRef}>
            <BlogForm createBlog={addNote}/>

          </Togglable>
          

          {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

        </div>
      } 


    </div>
  )
}

export default App
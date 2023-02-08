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
 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
      
    )  
  }, [])

console.log(blogs)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
   console.log('aa')
   console.log(noteObject)
    try{
    const returnedNote = await blogService.create(noteObject)
        //console.log(returnedNote)
        returnedNote.user = {username: user.username, name: user.name, id: returnedNote.id}
        setBlogs(blogs.concat(returnedNote))
        // tässä lisätään vain sellainen blog jossa ei ole kaikki user tietoja mukana
        // pitäisiköhän lisätä jotenkin user bäkkäri käytökseen
        console.log(blogs)
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
        <Blog key={blog.id} blog={blog}/>
      )}

        </div>
      } 


    </div>
  )
}

export default App
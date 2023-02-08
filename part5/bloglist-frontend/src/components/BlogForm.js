import { useState } from "react"


const BlogForm = ({createBlog}) => {
    

    const [newBlog, setNewBlog] = useState({
        title: '',
        url: '',
        author: '',
        likes: '',
      })

    const addNote = (event) => {
        
            event.preventDefault()
            const noteObject = {
                title: newBlog.title,
                url: newBlog.url,
                author: newBlog.author,
                likes: newBlog.likes,
              }
              console.log(noteObject)
            createBlog(noteObject)
        
            setNewBlog({
                title: '',
                url: '',
                author: '',
                likes: '',
              })
          }
        
    
    const handleNoteChange = (event) => {
       
        const {name, value} = event.target
        //console.log(value)
        //console.log(newBlog)
        setNewBlog({
          ...newBlog,
          [name] : value
        })
      }

    return (
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
  )}

  export default BlogForm
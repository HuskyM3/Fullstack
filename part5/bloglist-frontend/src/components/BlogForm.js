import { useState } from 'react'


const BlogForm = ( { createBlog } ) => {


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

    const { name, value } = event.target
    //console.log(value)
    //console.log(newBlog)
    setNewBlog({
      ...newBlog,
      [name] : value
    })
  }

  return (
    <form onSubmit={addNote} className='blogForm'>
      <div>title:
        <input
          id='title'
          value={newBlog.title}
          name='title'
          onChange={handleNoteChange}
          placeholder='title'
        />
      </div>
      <div> url:
        <input
          id='url'
          value={newBlog.url}
          name='url'
          onChange={handleNoteChange}
          placeholder='url'
        />
      </div>
      <div> author:
        <input
          id='author'
          value={newBlog.author}
          name='author'
          onChange={handleNoteChange}
          placeholder='author'
        />
      </div>

      <button id='create' type="submit">create</button>
    </form>
  )}




export default BlogForm
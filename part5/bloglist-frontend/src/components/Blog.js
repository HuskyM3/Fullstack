import { useState } from 'react'

const Blog = ( { blog, update, remove, user } ) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  // tämä pitää hoitaa staten avulla

  // ei välttämättä tarvetta, koska liket renderöidään appin kautta
  const like = (event) => {
    event.preventDefault()
    const updated = { ...blog, likes: blog.likes +1 }
    update(updated, blog.id)
  }

  const del = (event) => {
    event.preventDefault()
    remove(blog.id)
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  // voisi refacoroida järkeväksi, jos jaksaa
  return (
    <div style={blogStyle}>

      <div  className='blog'>
        {blog.title} {blog.author}
        <button id='show' onClick={toggleVisibility} style={hideWhenVisible}>show</button>
        <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      </div>

      <div style={showWhenVisible} className='fullblog'>
        <p>{blog.url}</p>
        <p>
        likes: {blog.likes}
          <button id='like' onClick={like}>like</button>
        </p>
        <p>
          {blog.user.username}
        </p>
        {user === blog.user.username ? <button id='remove' onClick={del}>remove</button> : ''}
      </div>

    </div>
  )
}
//{blog.title} {blog.author}
//note: tässä varamaan pääsee käyttämään forward ref kun
//lisätään add like ja lähetetään tietoa bäkkäriin

export default Blog
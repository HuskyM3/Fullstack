import { useState } from "react"

const Blog = ({blog, user}) => {

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

  const toggleVisibility = () => {
    setVisible(!visible)
  }
const space = ' '


  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      <p>{blog.title} {blog.author}
      {space}
      <button onClick={toggleVisibility}>show</button>
    </p>
    </div>
    
    <div style={showWhenVisible}>
      <p>
        {blog.title} {blog.author}
        {space}
        <button onClick={toggleVisibility}>hide</button>
      </p>
      <p>{blog.url}</p>
      <p>
        likes: {blog.likes} 
        <button>like</button>
      </p>
      <p>
        {user}
      </p>


    
  </div>
  </div>  
  )
}

//note: tässä varamaan pääsee käyttämään forward ref kun
//lisätään add like ja lähetetään tietoa bäkkäriin

export default Blog
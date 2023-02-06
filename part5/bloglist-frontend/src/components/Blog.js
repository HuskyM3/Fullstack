const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.url} {blog.author} {blog.likes}
  </div>  
)

export default Blog
const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'HTML is easy',
      author: 'false',
      url: '3243242',
      likes: 22222,
    },
    {
        title: 'Browser can execute only JavaScript',
        author: 'false',
        url: '3243242',
        likes: 1111,
      },
  ]
const nonExistingId = async () => {
  const note = new Blog({ title: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
} 

module.exports = {
  initialBlogs, nonExistingId, notesInDb
}
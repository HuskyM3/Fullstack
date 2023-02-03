const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, notesInDb, usersInDb
}
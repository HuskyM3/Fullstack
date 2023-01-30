const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// kaksi seuraavaa testiä eivät toimi


  /*    title: String,
    author: String,
    url: String,
    likes: Number
    */
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
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Blog(initialBlogs[0])
    await noteObject.save()
    noteObject = new Blog(initialBlogs[1])
    await noteObject.save()
  })



afterAll(async () => {
  await mongoose.connection.close()
})


test('there are two notes', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body)
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'Browser can execute only JavaScript'
    )
  })
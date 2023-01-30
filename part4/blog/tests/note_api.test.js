const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



  
  beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Blog(helper.initialBlogs[0])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[1])
    await noteObject.save()
  })


  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'Browser can execute only JavaScript'
    )
  })


  test('a valid note can be added', async () => {
    const newNote = {
      title: 'async/await simplifies making async calls',
      author: 'true',
      url: 'asd',
      likes: 23423,
    }
  
    await api
    .post('/api/blogs')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = notesAtEnd.map(n => n.title)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})


test('note without content is not added', async () => {
    const newNote = {
      author: 'sddsf'
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)
  
    const notesAtEnd = await helper.notesInDb()
  
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length)
  })


  afterAll(async () => {
    await mongoose.connection.close()
  })
  
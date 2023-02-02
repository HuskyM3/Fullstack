const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blog = require('../models/blog')



test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



  
  beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
    console.log('done')
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
  console.log(notesAtEnd)
  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = notesAtEnd.map(n => n.title)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})


test('note without content is not added', async () => {
    const newNote = {
      author: 'sds',
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)
  
    const notesAtEnd = await helper.notesInDb()
    //console.log(notesAtEnd)
  
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length)
  })


  test('id check', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body)
    response.body.forEach(element => {
        console.log(element.id)
        expect(element.id).toBeDefined()
    })
  })

  test('blog without likes is 0', async () => {
    const newNote = {
      title: 'sddsf',
      author: 'asdf'
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const notesAtEnd = await helper.notesInDb()
    const content = notesAtEnd.map(r=> r.likes).reverse()[0]
    //console.log(content)
    expect(content).toBe(0)
  }) 



  test('blog without title', async () => {
    const newNote = {
      author: 'sds',
      url: 'asdfs'

    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)
  
    const notesAtEnd = await helper.notesInDb()
    //console.log(notesAtEnd)
  
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without url', async () => {
    const newNote = {
      author: 'sds',
      title: 'asdfs'

    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)
  
    const notesAtEnd = await helper.notesInDb()
    //console.log(notesAtEnd)
  
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length)
  })


  test('delete note', async () => {
    const newNote = {
      title: 'note to delete',
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
    //console.log(notesAtEnd)
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const contents = notesAtEnd.map(n => n.title)
    expect(contents).toContain(
        'note to delete'
    )

   const note1 = await helper.notesInDb()
   const note = note1[0]

   //console.log(note.id)

    await api
    .delete(`/api/blogs/${note.id}`)
    .expect(204)

    const blogsAtEnd = await helper.notesInDb()
    //console.log(blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
    const content = blogsAtEnd.map(r=> r.id)
    console.log(content)
    expect(content).not.toContain(note.id)

  
})


  afterAll(async () => {
    await mongoose.connection.close()
  })
  
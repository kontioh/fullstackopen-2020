const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')


// terminal: npm test -- tests/blog_api.test.js


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


// test GET
describe('The GET method:', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }) 

  test('correct number of blogs is returned', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(helper.initialBlogs.length)
  })

  test('attribute id is defined', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })
})

// test POST
describe('The POST method:', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "Hello world!",
      author: "XYZ",
      url: "https://helloworld.com"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      newBlog.title
    )
  })

  test('if new blog has no title/url, respond with status code 400', async () => {
    const newBlog = {
      title: "No url...",
      author: "XYZ"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

// testing DELETE
describe('The DELETE method:', () => {
  test('a blog with valid id can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

// testing PUT (update)
describe('The PUT method:', () => {
  test('an existing blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]

    const modifiedBlog = {
      title: blogToModify.title,
      author: blogToModify.author,
      url: blogToModify.url,
      likes: blogToModify.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(modifiedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtEnd[0].likes).toEqual(blogToModify.likes + 1)  
  })

  test('a blog is not updated if a required field is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]

    const modifiedBlog = {
      title: blogToModify.title,
      author: blogToModify.author,
      // no url specified
      likes: blogToModify.likes + 1
    }
    
    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(modifiedBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].url).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
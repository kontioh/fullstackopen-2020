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

// test ID
test('attribute id is defined', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0].id).toBeDefined()
})


// test POST
test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Hello world!",
    author: "XYZ",
    url: "https://helloworld.com",
    //likes: 1
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


afterAll(() => {
  mongoose.connection.close()
})
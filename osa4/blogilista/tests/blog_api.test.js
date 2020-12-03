const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// terminal: npm test -- tests/blog_api.test.js


describe('Blogs:', () => {
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

      const users = await helper.usersInDb()
      const user = users[0]
      const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET)

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(newBlog.title)
    })

    test('if new blog has no title/url, respond with status code 400', async () => {
      const newBlog = {
        title: "No url...",
        author: "XYZ"
      }

      const users = await helper.usersInDb()
      const user = users[0]
      const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET)

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
    })

    test('if there is no token, respond with status code 401 Unauthorized', async () => {
      const blogsAtStart = await helper.blogsInDb()
      
      const newBlog = {
        title: "Hello world!",
        author: "XYZ",
        url: "https://helloworld.com"
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })
  })

  // testing DELETE
  describe('The DELETE method:', () => {
    test('a blog with valid id can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      
      const users = await helper.usersInDb()
      const user = users[0]
      const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET)

      let blogToDelete = {
        title: "Delete this",
        author: "Removal",
        url: "https://doesnotexist.com"
      }

      // first add the blog to be removed later
      await api
        .post('/api/blogs')
        .send(blogToDelete)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      blogToDelete = await Blog.findOne({ title: blogToDelete.title })

      // then delete
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

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
})


describe('Users:', () => {
  // initialize one user to the db
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('1234', 10)
    const user = new User({ username: "mouse", name: "Mickey Mouse", passwordHash })
    await user.save()
  })

  describe('The POST method:', () => {
    test('creation of new user fails if username is missing', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = { name: 'Donald Duck', password: 'xxx' }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      const usersAtEnd = await helper.usersInDb()

      expect(result.body.error).toContain('`username` is required')
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation of new user fails if password is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = { username: 'duck', name: 'Donald Duck', password: 'x' }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      const usersAtEnd = await helper.usersInDb()

      expect(result.body.error).toContain('invalid or missing password')
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

})

afterAll(() => {
  mongoose.connection.close()
})
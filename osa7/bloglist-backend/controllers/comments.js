const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

// GET
commentsRouter.get('/:id/comments', async (request, response) => {
  console.log(request.params)
  const id = request.params.id
  const blog = await Blog.findById(id).populate('comments')
  response.json(blog)
})


// POST
commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const id = request.params.id
  const blog = await Blog.findById(id)

  const comment = new Comment({
    text: body.text
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.json(savedComment.toJSON())
})

module.exports = commentsRouter
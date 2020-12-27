import React from 'react'
import PropTypes from 'prop-types'
import Comments from './Comments'
import CommentForm from './CommentForm'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={`http://${blog.url}`}>{blog.url}</a>
      <div>
        {blog.likes} likes <Button size="sm" onClick={() => handleLike(blog.id)}>like</Button>
      </div>
      <div>
        added by {blog.user?.name}
      </div>
      <div>
      {own&&<Button size="sm" onClick={() => handleRemove(blog.id)}>remove</Button>}
      </div>
      <Comments blogId={blog.id} />
      <CommentForm blogId={blog.id} />
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired
}

export default Blog
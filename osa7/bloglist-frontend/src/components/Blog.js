import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import CommentForm from './CommentForm'

const Blog = ({ blog, handleLike, handleRemove, own, details }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!details) {
    return (
      <div style={blogStyle} className='blog'>
        <div>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={`http://${blog.url}`}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>
        added by {blog.user?.name}
      </div>
      <div>
      {own&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
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
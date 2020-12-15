import React, { useState } from 'react'

const Blog = ({ blog, onLike, onDelete, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'dotted',
    borderColor: 'pink',
    borderWidth: 2,
    marginBottom: 5
  }

  const [extended, setExtended] = useState(false) // determine what information to show

  const showExtended = () => (
    <div>
      <div>{blog.url}</div>
      <div>Likes: {blog.likes} <button onClick={() => onLike(blog)}>like</button></div>
      <div>{blog.user?.name}</div>
      {loggedUser !== undefined && blog.user?.username === loggedUser.username
        ? <button onClick={() => onDelete(blog)}>remove</button>
        : null }
    </div>
  )

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button onClick={() => setExtended(!extended)}>{extended ? 'hide' : 'view'}</button>
      {extended
        ? showExtended()
        : null }
    </div>

  )
}

export default Blog

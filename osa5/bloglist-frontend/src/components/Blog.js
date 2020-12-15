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

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showRemoveButton = () => {
    if (blog.user !== undefined && blog.user.username === loggedUser.username) {
      return (
        <button onClick={() => onDelete(blog)}>remove</button>
      )
    }
  }

  return (
    <div style={blogStyle}>

      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={() => onLike(blog)}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        {showRemoveButton()}
      </div>

    </div>
  )
}

export default Blog

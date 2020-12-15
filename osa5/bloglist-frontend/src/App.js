import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newMessage, setNewMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      // loginService...
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNewMessage('Wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setNewMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setMessageType('success')
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setNewMessage('Adding a new blog failed')
        setMessageType('error')
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      })
  }


  const loginForm = () => (
    <Togglable buttonLabel='Log in'>
      <LoginForm
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
        username={username}
        password={password}
      />
    </Togglable>
  )

  const logoutForm = () => (
    <div>
      <form onSubmit={handleLogout} >
        <p>
          {user.name} logged in <button type="submit">logout</button>
        </p>
      </form>
    </div>
  )

  const blogList = () => {
    const sortedBlogs = blogs.sort((a,b) => - a.likes + b.likes)

    return (
      <div>
        <h2>Blogs</h2>
        {sortedBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            onLike={likeBlog}
            onDelete={removeBlog}
            loggedUser={user} />
        )}
      </div>
    )
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const likeBlog = async (blog) => {
    try {
      blog.likes += 1
      await blogService.update(blog.id, blog)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : blog))

    } catch (error) {
      setMessageType('error')
      setNewMessage(`Blog '${blog.title}' was already removed from server`)
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (error) {
        setMessageType('error')
        setNewMessage(`Blog ${blog.title} could not be deleted`)
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      }
    }
  }


  if (user === null) {
    return (
      <div>
        <h1>Bloglist</h1>
        <Notification
          message={newMessage}
          messageType={messageType}
        />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification
        message={newMessage}
        messageType={messageType}
      />
      {logoutForm()}
      {blogForm()}
      {blogList()}
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newMessage, setNewMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


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

  const createNew = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')

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
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutForm = () => (
    <div>
      <form onSubmit={handleLogout} >
        <p>
          {user.name} logged in
          <button type="submit">logout</button>
        </p>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createForm = () => (
    <div>
      <form onSubmit={createNew}>
        <div>
        title:
          <input type="text" value={newTitle} name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
          />
      </div>
      <div>
        author:
          <input type="text" value={newAuthor} name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
          />
      </div>
      <div>
        url:
          <input type="text" value={newUrl} name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
          />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
      </form>
    </div>
  )


  if (user === null) {
    return (
      <div>
        <h1>Bloglist</h1>
        <h2>Log in to application</h2>
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
      <h2>Create new</h2>
      {createForm()}
      <h2>Blogs</h2>
      {blogList()}
    </div>
  )
}

export default App
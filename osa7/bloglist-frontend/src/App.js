import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import storage from './utils/storage'

import { useDispatch, useSelector } from 'react-redux'
import { newNotification } from './reducers/notificationReducer'
import { initBlogs, newBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setCurrentUser } from './reducers/loginReducer'
import { initUsers } from './reducers/userReducer'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const currentUser = useSelector(state => state.login)
  const users = useSelector(state => state.users)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initBlogs(blogs))
    )
    userService.getAll().then(users =>
      dispatch(initUsers(users))
    )
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setCurrentUser(user))
  }, [dispatch])

  const notifyWith = (message, type='success') => {
    dispatch(newNotification(message, type))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      dispatch(setCurrentUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      dispatch(newBlog(createdBlog))
      notifyWith(`a new blog '${createdBlog.title}' by ${createdBlog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    dispatch(likeBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      dispatch(removeBlog(blogToRemove))
    }
  }

  const handleLogout = () => {
    dispatch(setCurrentUser(null))
    storage.logoutUser()
  }

  const userMatch = useRouteMatch('/users/:id')
  const userToView = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToView = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null


  if ( !currentUser ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Menu user={currentUser} handleLogout={handleLogout} />

      <h2>Blog app</h2>

      <Notification notification={notification} />

      <Switch>
        <Route path='/users/:id'>
          <User path='/users' user={userToView}/>
        </Route>
        <Route path='/users'>
          <Users users={users}/>
        </Route>
        <Route path='/blogs/:id'>
          {blogToView
            ? <Blog
                blog={blogToView}
                handleLike={handleLike}
                handleRemove={handleRemove}
                own={currentUser.username===blogToView.user.username}
                details={true}
              />
            : null
          }
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='create new' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          {blogs.sort(byLikes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App
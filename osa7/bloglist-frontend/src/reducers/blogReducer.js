const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'LIKE': {
      const id = action.data.id
      const blogToLike = state.find(b => b.id === id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map(b => b.id !== id ? b : likedBlog)
    }
    case 'REMOVE_BLOG': {
      const id = action.data.id
      return state.filter(b => b.id !== id)
    }
    default:
      return state
  }
}

export const initBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const newBlog = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: blog
  }
}

export const likeBlog = (blog) => {
  return {
    type: 'LIKE',
    data: blog
  }
}

export const removeBlog = (blog) => {
  return {
    type: 'REMOVE_BLOG',
    data: blog
  }
}

export default blogReducer
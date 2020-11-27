const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map(b => b.likes).reduce((x,y) => x + y)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  let current = blogs[0]
  let best = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    current = blogs[i]
    if (current.likes > best.likes) {
      best = current
    }
  }
  return { title: best.title, author: best.author, likes: best.likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  let current = undefined
  let best = undefined
  let blogsByCurrent = []
  let blogsByBest = []
  for (let i = 0; i < blogs.length; i++) {
    current = blogs[i].author
    blogsByCurrent = blogs.filter(b => b.author === current)
    if (blogsByBest.length < blogsByCurrent.length){
      best = current
      blogsByBest = blogsByCurrent
    } 
  }
  return { author: best, blogs: blogsByBest.length }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  let current = undefined
  let best = blogs[0].author
  let currentLikes = undefined
  let bestLikes = 0
  for (let i = 0; i < blogs.length; i++) {
    current = blogs[i].author
    currentLikes = blogs.filter(b => b.author === current).reduce((a,b) => a + b.likes, 0)
    if (currentLikes > bestLikes){
      best = current
      bestLikes = currentLikes
    } 
  }
  return { author: best, likes: bestLikes }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
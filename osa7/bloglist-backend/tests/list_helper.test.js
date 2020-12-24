const blogsRouter = require('../controllers/blogs')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = helper.initialBlogs


describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of an empty list is empty', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })
  test('of a one-blog list equals that', () => {
    const result = { 
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(result)
  })
  test('of multiple blogs is selected correctly', () => {
    const result = { 
      title: blogs[2].title,
      author: blogs[2].author,
      likes: blogs[2].likes
    }
    expect(listHelper.favoriteBlog(blogs)).toEqual(result)
  })
})

describe('most blogs', () => {
  test('when the list is empty, return empty', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })
  test('when the list has one blog, return the author', () => {
    const result = { author: listWithOneBlog[0].author, blogs: 1}
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(result)
  })
  test('when the list is longer, the author is selected correctly', () => {
    const result = { author: "Robert C. Martin", blogs: 3 }
    expect(listHelper.mostBlogs(blogs)).toEqual(result)
  })
})

describe('most likes', () => {
  test('when the list is empty, return empty', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })
  test('when the list has one blog, return the author', () => {
    const result = { author: listWithOneBlog[0].author, likes: listWithOneBlog[0].likes }
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(result)
  })
  test('when the list is longer, the author is selected correctly', () => {
    const result = { author: "Edsger W. Dijkstra", likes: 17 }
    expect(listHelper.mostLikes(blogs)).toEqual(result)
  })
})
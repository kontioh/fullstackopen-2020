const blogsRouter = require('../controllers/blogs')
const { totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')
const listHelper = require('../utils/list_helper')

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

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]


describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
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
    expect(favoriteBlog([])).toEqual({})
  })
  test('of a one-blog list equals that', () => {
    const result = { 
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }
    expect(favoriteBlog(listWithOneBlog)).toEqual(result)
  })
  test('of multiple blogs is selected correctly', () => {
    const result = { 
      title: blogs[2].title,
      author: blogs[2].author,
      likes: blogs[2].likes
    }
    expect(favoriteBlog(blogs)).toEqual(result)
  })
})

describe('most blogs', () => {
  test('when the list is empty, return empty', () => {
    expect(mostBlogs([])).toEqual({})
  })
  test('when the list has one blog, return the author', () => {
    const result = { author: listWithOneBlog[0].author, blogs: 1}
    expect(mostBlogs(listWithOneBlog)).toEqual(result)
  })
  test('when the list is longer, the author is selected correctly', () => {
    const result = { author: "Robert C. Martin", blogs: 3 }
    expect(mostBlogs(blogs)).toEqual(result)
  })
})

describe('most likes', () => {
  test('when the list is empty, return empty', () => {
    expect(mostLikes([])).toEqual({})
  })
  test('when the list has one blog, return the author', () => {
    const result = { author: listWithOneBlog[0].author, likes: listWithOneBlog[0].likes }
    expect(mostLikes(listWithOneBlog)).toEqual(result)
  })
  test('when the list is longer, the author is selected correctly', () => {
    const result = { author: "Edsger W. Dijkstra", likes: 17 }
    expect(mostLikes(blogs)).toEqual(result)
  })
})
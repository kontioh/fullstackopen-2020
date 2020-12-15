import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


const blog = {
  title: 'Title',
  author: 'Author',
  url: 'www.url.org',
  likes: 10,
  user: {
    name: 'Test User',
    username: 'test'
  }
}

describe('<Blog />', () => {


  test('By default only renders title and author', () => {
    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('Url and likes are viewed after clicking the button once', () => {
    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('onLike is called twice when like button is clicked twice', () => {
    const onLike = jest.fn()
    const component = render(
      <Blog blog={blog} onLike={onLike} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(onLike.mock.calls).toHaveLength(2)
  })

})
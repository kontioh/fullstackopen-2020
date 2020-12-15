import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


const newBlog = {
  title: 'Title',
  author: 'Author',
  url: 'www.url.org',
  likes: 10,
  user: {
    name: 'Test User',
    username: 'test'
  }
}

describe('<BlogForm />', () => {

  test('', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const authorInput = component.container.querySelector('#author')
    const titleInput = component.container.querySelector('#title')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(authorInput, { target: { value: newBlog.author } })
    fireEvent.change(titleInput, { target: { value: newBlog.title } })
    fireEvent.change(urlInput, { target: { value: newBlog.url } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
    expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
    expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)
  })
})
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls the event handler with correct details when a new blog is created', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm handleBlogCreation={createBlog} />
    )

    const titleInput = component.getByLabelText('Title')
    const authorInput = component.getByLabelText('Author')
    const urlInput = component.getByLabelText('URL')

    fireEvent.change(titleInput, {
      target: { value: 'Testing React applications' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'John Doe' }
    })

    fireEvent.change(urlInput, {
      target: { value: 'https://testing-library.com' }
    })

    fireEvent.submit()

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing React applications')
    expect(createBlog.mock.calls[0][0].author).toBe('John Doe')
    expect(createBlog.mock.calls[0][0].url).toBe('https://testing-library.com')
  })
})

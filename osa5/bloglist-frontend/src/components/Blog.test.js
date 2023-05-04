import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('Renders title and author', () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      user: { name: undefined },
    }

    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent('test title')
    expect(component.container).toHaveTextContent('test author')
  })

  test('Show title, url, likes, user and author after button press', () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 'test likes',
      user: { name: 'test name' },
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} toggleVisibility={mockHandler} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('test title')
    expect(component.container).toHaveTextContent('test author')
    expect(component.container).toHaveTextContent('test url')
    expect(component.container).toHaveTextContent('test likes')
    expect(component.container).toHaveTextContent('test name')
  })

  test('UpdateLikes is called twice when like button is pressed two times', () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 'test likes',
      user: { name: 'test name' },
    }

    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog} updateLikes={mockHandler} />)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})



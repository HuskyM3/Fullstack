import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog tests', () => {

  const blog = {
    title: 't1',
    author: 'a1',
    likes: 0,
    url: 'a2',
    id: 'a3',
    user: {
      username: 'u1',
      id: 'u2',
      name: 'u3',
    }
  }

  test('basic', () => {

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      't1'
    )
    expect(div).toHaveTextContent(
      'a1'
    )
    expect(div).not.toHaveTextContent(
      '0'
    )
    expect(div).not.toHaveTextContent(
      'a2'
    )
  })

  test('full', async() => {

    const mockHandeler = jest.fn()

    const { container } = render(<Blog blog={blog} toggleVisibility={mockHandeler} />)


    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    const div = container.querySelector('.fullblog')
    expect(div).toHaveTextContent(
      'a2'
    )
    expect(div).toHaveTextContent(
      '0'
    )
    /*
    expect(div).not.toHaveTextContent(
      '0'
    )
    expect(div).not.toHaveTextContent(
      'a2'
    )
    */
  })
  test('click twice', async() => {

    const mockHandeler = jest.fn()

    render(<Blog blog={blog} update={mockHandeler} />)


    const user = userEvent.setup()
    const button1 = screen.getByText('show')
    const button = screen.getByText('like')
    //screen.debug()
    await user.click(button1)
    await user.click(button)
    await user.click(button)

    expect(mockHandeler.mock.calls).toHaveLength(2)
  })



})
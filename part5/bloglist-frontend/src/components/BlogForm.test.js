import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('form test', () => {

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


  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const addNote = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={addNote} />)

    const input = screen.getByPlaceholderText('title')
    const sendButton = screen.getByText('create')

    await user.type(input, blog.title)

    const input2 = screen.getByPlaceholderText('url')
    await user.type(input2, blog.url)



    const input3 = screen.getByPlaceholderText('author')
    await user.type(input3, blog.author)


    //screen.debug(input3)

    await user.click(sendButton)

    expect(addNote.mock.calls).toHaveLength(1)
    expect(addNote.mock.calls[0][0].title).toBe(blog.title)
    expect(addNote.mock.calls[0][0].url).toBe(blog.url)
    expect(addNote.mock.calls[0][0].author).toBe(blog.author)
  })
})
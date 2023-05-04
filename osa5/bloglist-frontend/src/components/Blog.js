import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, updateBlog, }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    await blogService.update(blog.id, updatedBlog)
    updateBlog(updatedBlog)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-title">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div className="blog-likes">
            likes {blog.likes} <button onClick={addLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={removeBlog}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog


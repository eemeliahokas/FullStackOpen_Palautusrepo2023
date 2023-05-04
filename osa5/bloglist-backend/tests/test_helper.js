const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: 'HTML',
    author: 'höhhphöhöh',
    url: 'www.eemeliahokas.com',
    likes: 9,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = {
    initialBlogs, blogsInDb
  }
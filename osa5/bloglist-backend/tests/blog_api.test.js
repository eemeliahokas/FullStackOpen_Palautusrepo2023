const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')
const api = supertest(app)
const mongoose = require("mongoose")

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(helper.initialBlogs[0]);
  await blogObj.save();
});

describe('GET /api/blogs', () => {
  test('returns correct number of blogs in JSON format', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

test('Every returned blog has identifying id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
    expect(response.body).toBeDefined(helper.initialBlogs._id)
  })

  test("a blog can be added", async () => {
    const newBlog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    };
  
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  
    const response = await api.get("/api/blogs");
  
    expect(response.body).toHaveLength(initialBlogs.length + 1);
  });

  test('deletion succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(b => b.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })

  afterAll(() => {
    mongoose.connection.close();
  });
const dummy = (blogs) => {
    return 1
  }
  
  module.exports = {
    dummy
  }
  const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const total = likes.reduce((sum, likes) => sum + likes, 0)
    return total
  }
  
  module.exports = {
    dummy,
    totalLikes
  }
    
const bcrypt = require('bcrypt')
const { json } = require("express/lib/response");
const usersRouter = require("express").Router();
const User = require('../models/user')

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users.map((u) => u.toJSON()));
});


usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
});


module.exports = usersRouter

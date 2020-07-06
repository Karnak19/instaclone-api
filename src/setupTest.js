const db = require("../db");
const User = require("./api/users/users.model");
const { testPostId, testUserUsername } = require("./util");
const Post = require("./api/posts/posts.model");

module.exports = async () => {
  require("../db/associations");

  await db.sync({ force: true });
  await User.create({
    username: testUserUsername,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "johndoe",
  });
  await Post.create({
    id: testPostId,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "johndoe",
    username: testUserUsername,
  });
};

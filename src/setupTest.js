const db = require("../db");
const User = require("./api/users/users.model");
const { testUserId, testPostId } = require("./util");
const Post = require("./api/posts/posts.model");

module.exports = async () => {
  await db.sync({ force: true });
  await User.create({
    id: testUserId,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "johndoe",
  });
  await Post.create({
    id: testPostId,
    userId: testUserId,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "johndoe",
  });
};

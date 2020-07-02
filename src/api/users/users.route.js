const express = require("express");

const User = require("./users.model");
const Post = require("../posts/posts.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", async (req, res, next) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.params.id } });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { email, password, avatar, firstName, lastName } = req.body;
  const payload = { email, password, avatar, firstName, lastName };
  try {
    const newUser = await User.create(payload);
    delete newUser.dataValues["password"];
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

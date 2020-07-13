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

router.get("/:username", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.username);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:uname", async (req, res, next) => {
  const { password, desc, username, firstName, lastName, email } = req.body;
  const { uname } = req.params;
  try {
    const payload = { password, desc, username, firstName, lastName, email };
    await User.update(payload, {
      where: {
        username: uname,
      },
      individualHooks: true,
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.get("/:username/posts", async (req, res, next) => {
  try {
    const posts = await Post.findAll({ where: { username: req.params.username } });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { username, email, password, avatar, firstName, lastName } = req.body;
  const payload = { username, email, password, avatar, firstName, lastName };
  try {
    const newUser = await User.create(payload);
    delete newUser.dataValues["password"];
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/:username/followers", async (req, res, next) => {
  try {
    const followers = await User.findAll({
      where: {
        username: req.params.username,
      },
      include: [
        {
          model: User,
          as: "follower",
        },
      ],
    });
    res.status(200).json(followers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

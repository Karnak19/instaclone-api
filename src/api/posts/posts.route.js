const express = require("express");
const Post = require("./posts.model");
const { authJwt } = require("../../middlewares");

const router = express.Router();

router.use(authJwt);

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { desc, image } = req.body;
  const payload = { desc, image, username: req.user.username };
  try {
    const newPost = await Post.create(payload);

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

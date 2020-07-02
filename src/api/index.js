const express = require("express");

const router = express.Router();

const users = require("./users/users.route");
const posts = require("./posts/posts.route");

router.use("/posts", posts);
router.use("/users", users);

module.exports = router;

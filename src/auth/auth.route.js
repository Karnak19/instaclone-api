require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../api/users/users.model");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      attributes: {
        include: ["password"],
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = user.validPassword(password);
    if (isValid) {
      const token = jwt.sign(
        {
          username: user.dataValues.username,
          email: user.dataValues.email,
        },
        process.env.SECRET,
        {
          expiresIn: "1h",
        }
      );
      delete user.dataValues.password;
      res.status(200).json({
        token,
        user,
      });
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    res.status(422);
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  const { username, email, password, firstName, lastName, avatar } = req.body;
  const payload = { username, email, password, firstName, lastName, avatar };

  try {
    const [user, created] = await User.findCreateFind({ where: { email }, defaults: payload });
    if (created) {
      delete user.dataValues.password;
      res.status(201).json(user);
    } else {
      res.status(400).json({
        message: "User already exists",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

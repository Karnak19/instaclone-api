require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const auth = require("./auth/auth.route");
const api = require("./api");
const { notFound, errorHandler } = require("./middlewares");

const app = express();

app.use(
  cors({
    origin: process.env.CLIEN_URL,
  })
);
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}

app.use("/doc", express.static("apidoc"));

app.get("/", (req, res) => {
  res.json({
    message: "📸📸 Instaclone API 📸📸",
  });
});

app.use("/auth", auth);
app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

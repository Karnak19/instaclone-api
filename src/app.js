require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const auth = require("./auth/auth.route");
const api = require("./api");
const { notFound, errorHandler } = require("./middlewares");

const app = express();

const whitelist = process.env.CLIENT_URL.split(", ");

app.use(
  cors({
    origin: (origin, cb) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
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

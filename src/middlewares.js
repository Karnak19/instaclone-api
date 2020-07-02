require("dotenv").config();
const jwt = require("jsonwebtoken");

const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: error.message,
    errors: error.errors || undefined,
  });
};

const authJwt = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw new Error("no Authorization header found");

    const [bearer, token] = authorization.split(" ");

    if (bearer === "Bearer" && token) {
      const decoded = jwt.verify(token, process.env.SECRET);

      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(403);
    next(error);
  }
};

module.exports = {
  notFound,
  errorHandler,
  authJwt,
};

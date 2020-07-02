require("dotenv").config();

let database = process.env.NODE_ENV !== "test" ? process.env.DB_NAME : process.env.DB_TEST;

module.exports = {
  host: process.env.DB_HOST,
  database,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: process.env.DB_CLIENT,
  logging: false,
};

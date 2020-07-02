const Sequelize = require("sequelize");

const db = require("../../../db");

const Post = db.define(
  "post",
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    desc: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
    },
  },
  {}
);

module.exports = Post;

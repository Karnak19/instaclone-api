const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("../../../db");
const { randomAvatar } = require("../../util");

const User = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        notContains: " ", // don't allow space
      },
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    desc: {
      type: Sequelize.TEXT,
    },
  },
  {
    hooks: {
      beforeValidate: (user) => {
        if (!user.avatar) {
          user.avatar = randomAvatar();
        }
      },
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
  }
);

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;

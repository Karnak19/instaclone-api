const Sequelize = require("sequelize");
const config = require("./conf");

module.exports = new Sequelize(config);

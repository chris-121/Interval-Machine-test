const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.dbName,
  process.env.dbUserName,
  process.env.dbPassword,
  {
    host: "127.0.0.1",
    dialect: "mysql",
  }
);

module.exports = sequelize;

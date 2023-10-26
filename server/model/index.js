const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.dbName,
  process.env.dbUserName,
  process.env.dbPassword,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.export = sequelize;

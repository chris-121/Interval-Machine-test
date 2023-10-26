const express = require("express");
const app = express();
const tasksRoute = require("./routes/tasks");
const bodyParser = require("body-parser");
const sequelize = require("./model/index");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", tasksRoute);

app.listen(process.env.port, () =>
  console.log(`app listening on port ${process.env.port}!`)
);

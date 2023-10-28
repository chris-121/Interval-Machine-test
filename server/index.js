const express = require("express");
const app = express();
const tasksRoute = require("./routes/tasks");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./model/index");
const TaskModel = require("./model/Task");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", tasksRoute);

app.listen(process.env.port, () => {
  console.log(`app listening on port ${process.env.port}!`);
  sequelize.authenticate().then(() => {
    console.log("db connected successfully");
    TaskModel.sync({ force: true });
  });
});

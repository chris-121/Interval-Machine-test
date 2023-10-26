const express = require("express");
const router = express.Router();
const controller = require("../controller/tasks");

router
  .route("/tasks")
  .get(controller.getAllTasks)
  .post(controller.getAllTasks)
  .put(controller.updateTask)
  .delete(controller.deleteTask);

//export this router to use in our index.js
module.exports = router;

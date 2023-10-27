const taskServices = require("../services/tasks");
module.exports = {
  createTask: async (req, res) => {
    try {
      const { body: taskData } = req;
      const createdTask = await taskServices.createTask(taskData);
      res.send(createdTask);
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
  getAllTasks: async (req, res) => {
    try {
      const tasks = await taskServices.getAllTasks();
      res.send(tasks);
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
  updateTask: async (req, res) => {
    try {
      const { body: taskData } = req;
      const taskId = req.query.id;
      const updatedTask = await taskServices.updateTask(taskId, taskData);
      res.send(updatedTask);
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const taskId = req.query.id;
      await taskServices.deleteTask(taskId);
      res.send();
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
};

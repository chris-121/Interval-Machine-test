const taskModel = require("../model/Task");
module.exports = {
  getAllTasks: async () => {
    try {
      const tasks = await taskModel.findAll({});
      return tasks;
    } catch (error) {
      error;
    }
  },

  createTask: async (taskData) => {
    try {
      const task = await taskModel.create(taskData);
      return task;
    } catch (error) {
      return error;
    }
  },

  updateTask: async (taskData, whereObj) => {
    try {
      const updatedTask = await taskModel.update(taskData, whereObj);
      return updatedTask;
    } catch (error) {
      return error;
    }
  },

  deleteTask: async (whereObj) => {
    try {
      await taskModel.destroy(whereObj);
      return;
    } catch (error) {
      return error;
    }
  },
};

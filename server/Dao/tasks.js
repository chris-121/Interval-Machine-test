const taskModel = require("../model/Task");
module.exports = {
  getAllTasks: async () => {
    try {
      const tasks = await taskModel.findAll({
        raw: true,
      });
      return tasks;
    } catch (error) {
      error;
    }
  },
  getTask: async (whereObj) => {
    try {
      const task = await taskModel.findOne({
        ...whereObj,
        raw: true,
      });
      return task;
    } catch (error) {
      error;
    }
  },
  createTask: async (taskData) => {
    try {
      const task = await taskModel.create(taskData, { raw: true });
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

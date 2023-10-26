const taskModel = require("../model/Task");
module.exports = {
  getAllTasks: async () => {
    const tasks = await taskModel.findAll({});
    return tasks;
  },

  createTask: async (taskData) => {
    const task = await taskModel.create(taskData);
    return task;
  },

  updateTask: async (taskData, whereObj) => {
    const updatedTask = await taskModel.update(taskData, whereObj);
    return updatedTask;
  },

  deleteTask: async (whereObj) => {
    return await taskModel.destroy(whereObj);
  },
};

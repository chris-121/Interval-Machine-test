const dao = require("../Dao/tasks");
module.exports = {
  getAllTasks: async () => await dao.getAllTasks(),

  createTask: async (taskData) => await dao.createTask(taskData),

  updateTask: async (taskId, taskData) => {
    const whereObj = { id: taskId };
    await dao.updateTask(taskData, whereObj);
  },

  deleteTask: async (taskId) => await dao.deleteTask({ id: taskId }),
};

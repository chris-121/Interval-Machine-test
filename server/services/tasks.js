const dao = require("../Dao/tasks");
module.exports = {
  getAllTasks: () => dao.getAllTasks(),

  createTask: (taskData) => dao.createTask(taskData),

  updateTask: async (taskId, taskData) => {
    const whereObj = { id: taskId };
    await dao.updateTask(taskData, whereObj);
  },

  deleteTask: (taskId) => dao.deleteTask({ id: taskId }),
};

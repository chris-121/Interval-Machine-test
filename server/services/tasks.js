const dao = require("../Dao/tasks");
const { readImageToBase64 } = require("../utils/imagesUtils");
module.exports = {
  getAllTasks: async () => await dao.getAllTasks(),
  getTask: async (taskId) => await dao.getTask({ where: { id: taskId } }),

  createTask: async (taskData) => await dao.createTask(taskData),

  updateTask: async (taskId, taskData) => {
    const whereObj = { where: { id: taskId } };
    await dao.updateTask(taskData, whereObj);
  },

  deleteTask: async (taskId) => await dao.deleteTask({ where: { id: taskId } }),
  readImages: (tasks) => {
    return tasks.map((task) => {
      if (!task.image && task.image == "") return task;
      const base64 = readImageToBase64(task.image);
      return { ...task, image: base64 };
    });
  },
};

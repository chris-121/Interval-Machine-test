const taskServices = require("../services/tasks");
const base64Decoder = require("../utils/convertBase64ToBuffer");
const {
  writeImageToFile,
  removeImageFromFile,
} = require("../utils/imagesUtils");
module.exports = {
  createTask: async (req, res) => {
    try {
      const { body: taskData } = req;
      const { image: base64, ...rest } = taskData;
      const buffer = base64Decoder(base64);
      rest.image = Date.now().valueOf();
      writeImageToFile({ name: rest.image, buffer });
      const createdTask = await taskServices.createTask(rest);
      createdTask.image = base64;
      res.send(createdTask);
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
  getAllTasks: async (req, res) => {
    try {
      const tasks = await taskServices.getAllTasks();
      const tasksWithImage = await taskServices.readImages(tasks);
      res.send(tasksWithImage);
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
      const task = await taskServices.getTask(taskId);
      console.log(task.image);
      removeImageFromFile(task.image);
      await taskServices.deleteTask(taskId);
      res.send();
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
};

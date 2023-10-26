const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Task = sequelize.define(
  "Task",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

console.log(Task === sequelize.models.Task); // true

module.exports = Task;

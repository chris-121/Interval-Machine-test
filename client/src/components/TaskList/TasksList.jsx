import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CreateTaskComponent from "../CreateTaskComponent";
import DeleteConfirmation from "./DeleteConfirmation";
import ShowTask from "./ShowTask";

import axios from "axios";
import { priorityEnums } from "../../Enums/Task";
import { DateTime } from "luxon";

const sxStyles = {
  root: {
    backgroundColor: "#DDE6ED",
    position: "relative",
    marginTop: 4,
    borderRadius: 4,
  },
  item: {
    width: 1000,
    padding: 2,
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    width: 1000,
    padding: 2,
    display: "flex",
  },
  img: {
    // maxWidth: 100,
    height: 200,
  },
  fontStyle: {
    color: "#fff",
  },
};
function TasksList({ tasks, setTasks }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToBeDeleted, setTaskToBeDeleted] = useState({});
  const [selectedPriority, setSelectedPriority] = useState(priorityEnums.ALL);
  const [taskToBeEdited, setTaskToBeEdited] = useState({});
  const [showOnlyThisTask, setShowOnlyThisTask] = useState("");

  const handleDeleteButtonClick = (task) => {
    setShowDeleteConfirmation(true);
    setTaskToBeDeleted(task);
  };
  const deleteTask = () => {
    axios
      .delete(`http://localhost:4000/api/tasks?id=${taskToBeDeleted.id}`)
      .then(() => {
        const updatedTasks = tasks.filter(
          (task) => task.id !== taskToBeDeleted.id
        );
        setTasks(updatedTasks);
      })
      .catch(() => console.log("failed to fetch tasks"))
      .finally(() => setShowDeleteConfirmation(false));
  };
  const handleOnChange = (event) => {
    const { value } = event.target;
    setSelectedPriority(value);
    setShowOnlyThisTask({});
  };

  const handleClose = (updatedTask) => {
    if (updatedTask)
      setTasks((prev) =>
        prev.map((prevTask) => {
          if (prevTask.id === updatedTask.id) return updatedTask;
          return prevTask;
        })
      );
    setTaskToBeEdited({});
  };

  return (
    <Box sx={sxStyles.root}>
      <DeleteConfirmation
        open={showDeleteConfirmation}
        handleClose={() => setShowDeleteConfirmation(false)}
        deleteTask={deleteTask}
      />
      <ShowTask
        task={showOnlyThisTask}
        open={!!showOnlyThisTask.id}
        handleClose={() => setShowOnlyThisTask({})}
        deleteTask={deleteTask}
      />

      <Box sx={sxStyles.header}>
        <FormControl>
          Show Tasks of priority:{" "}
          <Select
            sx={sxStyles.selectField}
            value={selectedPriority}
            name={"priority"}
            onChange={handleOnChange}
          >
            {Object.keys(priorityEnums).map((priority, index) => (
              <MenuItem key={index} value={priorityEnums[priority]}>
                {priorityEnums[priority]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        {tasks.map((task, index) => {
          return task.id === taskToBeEdited.id ? (
            <CreateTaskComponent
              taskToBeEdited={taskToBeEdited}
              handleClose={handleClose}
            />
          ) : selectedPriority === priorityEnums.ALL ||
            selectedPriority === task.priority ? (
            <Box key={index} sx={sxStyles.item}>
              <Box sx={{ m: 2 }}>
                <Typography variant={"h5"}>{task.name}</Typography>
                <p>{task.description}</p>
                <p>
                  Date: {DateTime.fromISO(task.date).toFormat("dd/mm/yyyy")}
                </p>
                <p>Time:{DateTime.fromISO(task.time).toFormat("hh:mm a")}</p>
                {task.priority} priority
                <br />
                <br />
                <Link onClick={() => setShowOnlyThisTask(task)}>Show task</Link>
              </Box>
              <Box sx={{ display: "flex", ...sxStyles.img }}>
                {task.image ? <img alt={"No Image"} src={task.image} /> : null}
                <Box>
                  <IconButton onClick={() => setTaskToBeEdited(task)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteButtonClick(task)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ) : null;
        })}
      </Box>
    </Box>
  );
}

export default TasksList;

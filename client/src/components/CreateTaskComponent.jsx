import React, { useState } from "react";
import { priorityEnums } from "../Enums/Task";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

const sxStyles = {
  root: {
    padding: 2,
    backgroundColor: "#90bbd1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputFields: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 1000,
    height: 100,
  },
  textField: {
    display: "flex",
    flexDirection: "column",
    marginRight: 2,
    "& .MuiInputBase-input": {
      height: 10,
    },
  },
  selectField: {
    "& .MuiSelect-select": {
      width: 80,
      padding: "10px 0px 10px 10px",
    },
  },
  btn: {
    backgroundColor: "#1a354a",
  },
  fontStyle: {
    color: "#fff",
  },
};
const initialState = {
  name: "",
  description: "",
  priority: priorityEnums.LOW,
};

function CreateTaskComponent({ updateTasks }) {
  const [task, setTask] = useState(initialState);
  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsCreating(true);
    axios
      .post(`http://localhost:4000/api/tasks`, task)
      .then(({ data: task }) => {
        updateTasks(task);
        setTask(initialState);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsCreating(false));
  };

  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.inputFields}>
        <Box sx={sxStyles.textField}>
          Task Name:
          <TextField
            name={"name"}
            value={task.name}
            onChange={handleChange}
            placeholder={"Task Name"}
          />
        </Box>
        <Box sx={sxStyles.textField}>
          Task description:
          <TextField
            name={"description"}
            value={task.description}
            onChange={handleChange}
            placeholder={"Task description"}
          />
        </Box>
        <FormControl>
          Task priority:{" "}
          <Select
            sx={sxStyles.selectField}
            labelId="Priority"
            value={task.priority}
            name={"priority"}
            onChange={handleChange}
          >
            {Object.keys(priorityEnums).map((priorityEnum) => (
              <MenuItem value={priorityEnums[priorityEnum]}>
                {priorityEnums[priorityEnum]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button
        disabled={isCreating}
        sx={sxStyles.btn}
        variant="contained"
        onClick={handleSubmit}
      >
        Create Task
      </Button>
    </Box>
  );
}

export default CreateTaskComponent;

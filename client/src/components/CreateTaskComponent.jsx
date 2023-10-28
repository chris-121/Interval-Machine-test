import React, { useState } from "react";
import { priorityEnums } from "../Enums/Task";
import axios from "axios";
import { DateTime } from "luxon";
import {
  Box,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

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

function CreateTaskComponent({ updateTasks, taskToBeEdited, handleClose }) {
  const dateVar = taskToBeEdited?.date
    ? new DateTime(taskToBeEdited?.date)
    : DateTime.now();

  const timeVar = taskToBeEdited?.date
    ? new DateTime(taskToBeEdited?.date)
    : DateTime.now();
  const [task, setTask] = useState(taskToBeEdited || initialState);
  const [image, setImage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [date, setDate] = useState(dateVar);
  const [time, setTime] = useState(timeVar);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
  };

  const handleSubmit = async () => {
    setIsCreating(true);
    axios({
      url: `http://localhost:4000/api/tasks?${
        taskToBeEdited ? `id=${taskToBeEdited.id}` : ""
      } `,
      method: taskToBeEdited ? "put" : "post",
      data: { ...task, date, time, image },
    })
      .then(({ data: createdTask }) => {
        if (taskToBeEdited) handleClose({ ...task, date, time, image });
        else {
          updateTasks(createdTask);
          setTask(initialState);
        }
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
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
          <TimePicker
            label="Time"
            value={time}
            onChange={(newValue) => setTime(newValue)}
          />
        </LocalizationProvider>
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
          {Object.keys(priorityEnums)
            .filter(
              (priorityEnum) =>
                priorityEnums[priorityEnum] !== priorityEnums.ALL
            )
            .map((priorityEnum, index) => (
              <MenuItem key={index} value={priorityEnums[priorityEnum]}>
                {priorityEnums[priorityEnum]}
              </MenuItem>
            ))}
        </Select>
        <p>upload image</p>
        <input type="file" onChange={handleChangeImage} />
      </FormControl>
      <Box sx={{ display: "flex", gap: 2 }}>
        {taskToBeEdited ? (
          <Button
            disabled={isCreating}
            sx={sxStyles.btn}
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        ) : null}
        <Button
          disabled={isCreating}
          sx={sxStyles.btn}
          variant="contained"
          onClick={handleSubmit}
        >
          {taskToBeEdited ? "Update Task" : "Create Task"}
        </Button>
      </Box>
    </Box>
  );
}

export default CreateTaskComponent;

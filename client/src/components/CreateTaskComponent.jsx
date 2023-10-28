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
    borderRadius: 4,
    padding: 2,
    backgroundColor: "#DDE6ED",
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
    "&:hover": {
      backgroundColor: "#1a354a",
      opacity: "70%",
    },
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
  const taskDate = taskToBeEdited?.date
    ? new DateTime(taskToBeEdited?.date)
    : DateTime.now();

  const taskTime = taskToBeEdited?.date
    ? new DateTime(taskToBeEdited?.date)
    : DateTime.now();
  const [task, setTask] = useState(taskToBeEdited || initialState);
  const [image, setImage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [date, setDate] = useState(taskDate);
  const [time, setTime] = useState(taskTime);
  const [err, setErr] = useState("");

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
    if (!task.name) {
      setErr("Task Name cannot be empty");
      return;
    }
    if (!task.description) {
      setErr("Task Description cannot be empty");
      return;
    }
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
      .finally(() => {
        setErr("");
        setIsCreating(false);
      });
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
          <Box>
            Date:
            <DatePicker
              sx={sxStyles.textField}
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </Box>

          <Box>
            Time:
            <TimePicker
              sx={sxStyles.textField}
              value={time}
              onChange={(newValue) => setTime(newValue)}
            />
          </Box>
        </LocalizationProvider>
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
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <p style={{ color: "#6fa2f2" }}>
            Click here to Upload Image &nbsp;
            <input
              // style={{ display: "none" }}
              type="file"
              onChange={handleChangeImage}
            />
          </p>
        </Box>
      </Box>
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
      <p style={{ color: "red" }}>{err}</p>
    </Box>
  );
}

export default CreateTaskComponent;

import React, { useEffect, useState } from "react";
import CreateTaskComponent from "../components/CreateTaskComponent";
import TasksList from "../components/TaskList/TasksList";
import { Box } from "@mui/material";
import axios from "axios";

const sxStyles = {
  root: {
    margin: 0,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    width: "100%",
    background: "#1a354a",
  },
};
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    axios
      .get("http://localhost:4000/api/tasks")
      .then(({ data: tasks }) => setTasks(tasks))
      .catch(() => console.log("failed to fetch tasks"))
      .finally(() => setIsFetching(false));
  }, []);

  const updateTasks = (task) => {
    setTasks((prev) => [task, ...prev]);
  };
  return (
    <Box sx={sxStyles.root}>
      {!isFetching ? (
        <>
          <CreateTaskComponent updateTasks={updateTasks} />
          <TasksList tasks={tasks} setTasks={setTasks} />
        </>
      ) : (
        <>Loading</>
      )}
    </Box>
  );
}
